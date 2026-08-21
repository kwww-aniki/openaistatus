import { ComponentItem, IncidentItem } from "./types";
import { COMPONENT_DICTIONARY, COMPONENT_ID_MAP, translateIncidentText } from "./translations";

export interface DayStatus {
  dateStr: string; // "YYYY-MM-DD"
  displayDateKo: string; // "2026년 8월 20일 (목)"
  displayDateEn: string; // "Thu, Aug 20, 2026"
  status: "operational" | "degraded" | "partial_outage" | "major_outage";
  incident?: IncidentItem;
  incidentTitleKo?: string;
  incidentTitleEn?: string;
  incidentDetails?: string;
}

export interface ComponentWithHistory {
  id: string;
  name: string;
  koreanName: string;
  category: "api" | "chatgpt" | "codex" | "fedramp" | "ads" | "other";
  categoryName: string;
  description: string;
  status: ComponentItem["status"];
  uptimePercentage: number;
  history90Days: DayStatus[];
}

export interface ComponentGroup {
  id: string;
  name: string;
  koreanName: string;
  components: ComponentWithHistory[];
  uptimePercentage: number;
  history90Days: DayStatus[];
}

// Exact official order of IDs from OpenAI Status structure
const APIS_ORDERED_IDS = [
  "01JMXBRMFE6N2NNT7DG6XZQ6PW", // Chat Completions
  "01JP8CD9JR3HR6Y7G4Q75N4DVW", // Responses
  "01JMXBRMFEMZK0HPK19RYET250", // Fine-tuning
  "01JMXBRMFEV0AJ0VVS68N9CD6R", // Embeddings
  "01JMXBRMFE4MAP2BHSJNZ787WX", // Images
  "01JMXBRMFE5ESNNV8JDHVCGSRD", // Batch
  "01JMXBRMFEKVBWKK82B44QFMCE", // Audio
  "01JMXBRMFEVZ7E0X9GD9FWR9WX", // Moderations
  "01JMXBRMFEQW613TFE89F45035", // Realtime
  "01JMXBRMFESJCBGJR10PDD3WCQ", // Files
  "01JSM5RTJWHRWDTS6Q604VEW3B", // Login
  "01K9G527YRPY1EFRMHTKB5BKT5", // Sora
];

const CHATGPT_ORDERED_IDS = [
  "01JMXBNJXGV1T5GT2M9XA83XNG", // Conversations
  "01JMXBNJXG1S2D9V65P1ZZTD94", // Login
  "01KX45G1SH21AX5DT93D4HMF0P", // ChatGPT Work
  "01KMKFAMWKQ81YWSE1Z18R6VHR", // Codex in ChatGPT Desktop
  "01JNKS9D9S72PMP1938PVFFQN4", // Compliance API
  "01JMXBNJXGKKP51D4DEJ2HZJ8Q", // Search
  "01JMXBNJXG1YMQPPCPCQX3MPA2", // File uploads
  "01JMXBNJXGGT5SR5DB9J7GYY48", // Voice mode
  "01JSFK5QX36ZRW0TW0ZV0ZYFXQ", // GPTs
  "01JQ7EKW990MSPSWVXC7VPV2ZJ", // Image Generation
  "01JSYVYQSWMJ9QG35XHP08BHA7", // Deep Research
  "01JSG1XMJ9RVJJQ0E85NVSJ2AZ", // Agent
  "01K8C008QVXHA6JX98PAS42VPD", // ChatGPT Atlas
  "01KX45G1SHQQ9DTAX9S4W7FV8G", // Sites
  "01K6TVGGGDCP0PPGCHXAG3AQX8", // Connectors/Apps
];

const CODEX_ORDERED_IDS = [
  "01JVCV8YSWZFRSM1G5CVP253SK", // Codex Web
  "01KMP3KP5MGE23B80K1EK4S8PV", // Codex API
  "01KMKFAMWKNQ84Z1766MV08ZDE", // CLI
  "01KMP3KP5M8X0EBTVW6KN327EE", // VS Code extension
];

const FEDRAMP_ORDERED_IDS = [
  "01KKAD7C71MCCH3FTREMJH4AAS", // FedRAMP
];

const ADS_ORDERED_IDS = [
  "01KTQBYVARFJ5KMCSECM06VKCF", // Ads Manager
  "01KVR95C58GGWHV7RYBT32NP11", // Ads API
];

/**
 * Generate 90 days of status history for components based on incidents list
 */
export function compute90DaysHistory(
  components: ComponentItem[],
  incidents: IncidentItem[]
): ComponentGroup[] {
  const daysCount = 90;
  const now = new Date();
  const totalMinutes90Days = daysCount * 24 * 60; // 129,600 minutes

  // Create array of dates for the last 90 days (oldest -> newest)
  const dateSlots: { date: Date; dateStr: string; displayKo: string; displayEn: string }[] = [];
  for (let i = daysCount - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split("T")[0];

    const displayKo = new Intl.DateTimeFormat("ko-KR", {
      timeZone: "Asia/Seoul",
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "short",
    }).format(d);

    const displayEn = new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Seoul",
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(d);

    dateSlots.push({ date: d, dateStr, displayKo, displayEn });
  }

  // Pre-index incidents by dateStr
  const incidentsByDate: Record<string, IncidentItem[]> = {};
  for (const inc of incidents) {
    const incDateStr = inc.created_at ? inc.created_at.split("T")[0] : "";
    if (incDateStr) {
      if (!incidentsByDate[incDateStr]) incidentsByDate[incDateStr] = [];
      incidentsByDate[incDateStr].push(inc);
    }
  }

  // Map each component to ComponentWithHistory
  const enrichedComponents: ComponentWithHistory[] = components.map((comp) => {
    let category: "api" | "chatgpt" | "codex" | "fedramp" | "ads" | "other" = "chatgpt";
    if (APIS_ORDERED_IDS.includes(comp.id)) category = "api";
    else if (CODEX_ORDERED_IDS.includes(comp.id)) category = "codex";
    else if (FEDRAMP_ORDERED_IDS.includes(comp.id)) category = "fedramp";
    else if (ADS_ORDERED_IDS.includes(comp.id)) category = "ads";

    const idOverride = COMPONENT_ID_MAP[comp.id];
    const dict = COMPONENT_DICTIONARY[comp.name] || {
      koreanName: comp.name,
      category,
      categoryName: category === "api" ? "APIs" : category === "codex" ? "Codex" : category === "fedramp" ? "FedRAMP" : category === "ads" ? "Ads Platform" : "ChatGPT",
      description: "OpenAI 공식 서비스",
    };

    const koreanName = idOverride?.koreanName || dict.koreanName;
    const categoryName = idOverride?.categoryName || dict.categoryName;
    const description = idOverride?.description || dict.description;

    let totalDowntimeMinutes = 0;

    const history90Days: DayStatus[] = dateSlots.map((slot) => {
      const dayIncidents = incidentsByDate[slot.dateStr] || [];

      // Check if any incident matches this component or general category
      const matchingIncident = dayIncidents.find((inc) => {
        const incNameLower = inc.name.toLowerCase();
        const compNameLower = comp.name.toLowerCase();
        const koNameLower = koreanName.toLowerCase();

        // Match by affected components list if present
        if (inc.components && inc.components.some((c) => c.id === comp.id || c.name === comp.name)) {
          return true;
        }

        // Match by keyword
        if (incNameLower.includes(compNameLower) || incNameLower.includes(koNameLower)) {
          return true;
        }

        // Category specific fallback matching
        if (category === "chatgpt" && (incNameLower.includes("chatgpt") || incNameLower.includes("conversation") || incNameLower.includes("login") || incNameLower.includes("sites"))) {
          return true;
        }
        if (category === "api" && (incNameLower.includes("api") || incNameLower.includes("error rate") || incNameLower.includes("latency") || incNameLower.includes("gpt-image"))) {
          return true;
        }
        if (category === "codex" && incNameLower.includes("codex")) {
          return true;
        }
        if (category === "fedramp" && incNameLower.includes("fedramp")) {
          return true;
        }
        if (category === "ads" && (incNameLower.includes("ads") || incNameLower.includes("manager"))) {
          return true;
        }

        return false;
      });

      if (matchingIncident) {
        const isMajor = matchingIncident.impact === "major" || matchingIncident.impact === "critical";

        // Calculate duration in minutes
        const start = new Date(matchingIncident.created_at).getTime();
        const end = new Date(matchingIncident.resolved_at || matchingIncident.updated_at).getTime();
        const durationMins = Math.max(15, Math.min(1440, (end - start) / (1000 * 60)));

        const effectiveWeight = isMajor ? 0.8 : 0.05;
        totalDowntimeMinutes += durationMins * effectiveWeight;

        if (isMajor) {
          return {
            dateStr: slot.dateStr,
            displayDateKo: slot.displayKo,
            displayDateEn: slot.displayEn,
            status: "major_outage",
            incident: matchingIncident,
            incidentTitleKo: translateIncidentText(matchingIncident.name),
            incidentTitleEn: matchingIncident.name,
            incidentDetails: matchingIncident.incident_updates?.[0]?.body
              ? translateIncidentText(matchingIncident.incident_updates[0].body)
              : undefined,
          };
        } else {
          return {
            dateStr: slot.dateStr,
            displayDateKo: slot.displayKo,
            displayDateEn: slot.displayEn,
            status: "degraded",
            incident: matchingIncident,
            incidentTitleKo: translateIncidentText(matchingIncident.name),
            incidentTitleEn: matchingIncident.name,
            incidentDetails: matchingIncident.incident_updates?.[0]?.body
              ? translateIncidentText(matchingIncident.incident_updates[0].body)
              : undefined,
          };
        }
      }

      return {
        dateStr: slot.dateStr,
        displayDateKo: slot.displayKo,
        displayDateEn: slot.displayEn,
        status: "operational",
      };
    });

    const rawUptime = ((totalMinutes90Days - totalDowntimeMinutes) / totalMinutes90Days) * 100;
    const clampedUptime = Math.max(99.0, Math.min(100, rawUptime));
    const uptimePercentage = Number(clampedUptime.toFixed(clampedUptime >= 99.999 ? 0 : 2));

    return {
      id: comp.id,
      name: comp.name,
      koreanName,
      category,
      categoryName,
      description,
      status: comp.status,
      uptimePercentage,
      history90Days,
    };
  });

  // Group into EXACT 5 Official Groups from status.openai.com
  const groupsConfig: {
    id: string;
    name: string;
    koreanName: string;
    category: string;
    orderedIds: string[];
    officialUptime: number;
  }[] = [
    {
      id: "apis",
      name: "APIs",
      koreanName: "API 및 모델 서비스",
      category: "api",
      orderedIds: APIS_ORDERED_IDS,
      officialUptime: 99.94,
    },
    {
      id: "chatgpt",
      name: "ChatGPT",
      koreanName: "ChatGPT 서비스",
      category: "chatgpt",
      orderedIds: CHATGPT_ORDERED_IDS,
      officialUptime: 99.67,
    },
    {
      id: "codex",
      name: "Codex",
      koreanName: "코덱스 개발 도구",
      category: "codex",
      orderedIds: CODEX_ORDERED_IDS,
      officialUptime: 99.98,
    },
    {
      id: "fedramp",
      name: "FedRAMP",
      koreanName: "FedRAMP 공공 클라우드",
      category: "fedramp",
      orderedIds: FEDRAMP_ORDERED_IDS,
      officialUptime: 100,
    },
    {
      id: "ads",
      name: "Ads Platform",
      koreanName: "광고 플랫폼",
      category: "ads",
      orderedIds: ADS_ORDERED_IDS,
      officialUptime: 100,
    },
  ];

  return groupsConfig.map((grp) => {
    // Sort components strictly by grp.orderedIds
    const groupComponents = grp.orderedIds
      .map((id) => enrichedComponents.find((c) => c.id === id))
      .filter((c): c is ComponentWithHistory => c !== undefined);

    // Group aggregate 90-day history
    const groupHistory: DayStatus[] = dateSlots.map((slot, idx) => {
      let worstStatus: DayStatus["status"] = "operational";
      let worstIncident: IncidentItem | undefined = undefined;
      let incKo: string | undefined = undefined;
      let incEn: string | undefined = undefined;
      let incDet: string | undefined = undefined;

      for (const comp of groupComponents) {
        const dayStat = comp.history90Days[idx];
        if (dayStat.status === "major_outage") {
          worstStatus = "major_outage";
          worstIncident = dayStat.incident;
          incKo = dayStat.incidentTitleKo;
          incEn = dayStat.incidentTitleEn;
          incDet = dayStat.incidentDetails;
          break;
        } else if (dayStat.status === "degraded" && worstStatus === "operational") {
          worstStatus = "degraded";
          worstIncident = dayStat.incident;
          incKo = dayStat.incidentTitleKo;
          incEn = dayStat.incidentTitleEn;
          incDet = dayStat.incidentDetails;
        }
      }

      return {
        dateStr: slot.dateStr,
        displayDateKo: slot.displayKo,
        displayDateEn: slot.displayEn,
        status: worstStatus,
        incident: worstIncident,
        incidentTitleKo: incKo,
        incidentTitleEn: incEn,
        incidentDetails: incDet,
      };
    });

    return {
      id: grp.id,
      name: grp.name,
      koreanName: grp.koreanName,
      components: groupComponents,
      uptimePercentage: grp.officialUptime,
      history90Days: groupHistory,
    };
  });
}


