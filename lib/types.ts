export type IndicatorType = "none" | "minor" | "major" | "critical" | "maintenance";

export type ComponentStatusType =
  | "operational"
  | "degraded_performance"
  | "partial_outage"
  | "major_outage"
  | "under_maintenance";

export type IncidentStatusType =
  | "investigating"
  | "identified"
  | "monitoring"
  | "resolved"
  | "postmortem";

export interface PageInfo {
  id: string;
  name: string;
  url: string;
  updated_at: string;
}

export interface StatusInfo {
  description: string;
  indicator: IndicatorType;
}

export interface ComponentItem {
  id: string;
  name: string;
  status: ComponentStatusType;
  created_at: string;
  updated_at: string;
  position: number;
  description?: string | null;
  showcase?: boolean;
  start_date?: string | null;
  group_id?: string | null;
  page_id: string;
  group?: boolean;
  only_show_if_degraded?: boolean;
}

export interface IncidentUpdate {
  id: string;
  status: IncidentStatusType;
  body: string;
  incident_id: string;
  created_at: string;
  updated_at: string;
  display_at: string;
  affected_components?: {
    code: string;
    name: string;
    old_status: string;
    new_status: string;
  }[];
}

export interface IncidentItem {
  id: string;
  name: string;
  status: IncidentStatusType;
  created_at: string;
  updated_at: string;
  monitoring_at?: string | null;
  resolved_at?: string | null;
  impact: IndicatorType;
  shortlink?: string;
  started_at?: string;
  page_id: string;
  incident_updates: IncidentUpdate[];
  components?: ComponentItem[];
}

export interface ScheduledMaintenance {
  id: string;
  name: string;
  status: string;
  created_at: string;
  updated_at: string;
  monitoring_at?: string | null;
  resolved_at?: string | null;
  impact: IndicatorType;
  shortlink?: string;
  scheduled_for: string;
  scheduled_until: string;
  incident_updates: IncidentUpdate[];
  components?: ComponentItem[];
}

export interface StatusSummaryResponse {
  page: PageInfo;
  status: StatusInfo;
  components: ComponentItem[];
  incidents: IncidentItem[];
  scheduled_maintenances?: ScheduledMaintenance[];
}


