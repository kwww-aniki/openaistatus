import { NextResponse } from "next/server";
import { StatusSummaryResponse, ComponentItem } from "@/lib/types";
import { translateIncidentText } from "@/lib/translations";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const summaryRes = await fetch("https://status.openai.com/api/v2/summary.json", {
      headers: {
        "User-Agent": "OpenAI-Status-KR/1.0",
        "Accept": "application/json",
      },
      cache: "no-store",
    });

    if (!summaryRes.ok) {
      throw new Error(`OpenAI Statuspage returned ${summaryRes.status}`);
    }

    const data: StatusSummaryResponse = await summaryRes.json();

    // Fetch ALL 34 components from components.json
    let allComponents: ComponentItem[] = data.components || [];
    try {
      const compRes = await fetch("https://status.openai.com/api/v2/components.json", {
        headers: { "Accept": "application/json" },
        cache: "no-store",
      });
      if (compRes.ok) {
        const compJson = await compRes.json();
        if (Array.isArray(compJson.components) && compJson.components.length > 0) {
          allComponents = compJson.components;
        }
      }
    } catch (e) {
      console.warn("Components.json fetch fallback to summary.json components:", e);
    }

    // Fetch full incidents list for complete 90-day history
    let pastIncidents = data.incidents || [];
    try {
      const incidentsRes = await fetch("https://status.openai.com/api/v2/incidents.json", {
        headers: { "Accept": "application/json" },
        cache: "no-store",
      });
      if (incidentsRes.ok) {
        const incData = await incidentsRes.json();
        if (Array.isArray(incData.incidents) && incData.incidents.length > 0) {
          pastIncidents = incData.incidents;
        }
      }
    } catch {
      // fallback to summary incidents
    }

    // Apply 100% translations on incidents and incident updates
    const translatedIncidents = (pastIncidents || []).map((incident) => {
      const translatedUpdates = (incident.incident_updates || []).map((update) => ({
        ...update,
        koreanBody: translateIncidentText(update.body),
      }));

      return {
        ...incident,
        koreanName: translateIncidentText(incident.name),
        incident_updates: translatedUpdates,
      };
    });

    return NextResponse.json({
      ...data,
      components: allComponents,
      incidents: translatedIncidents,
      fetchedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error fetching OpenAI status:", error);
    return NextResponse.json(
      {
        error: "OpenAI 상태 정보를 불러오지 못했습니다.",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

