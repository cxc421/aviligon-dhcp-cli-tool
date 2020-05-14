export type DchpStatus = "Enable" | "Disable";

export interface DhcpInfo {
  ipStartFrom: string;
  status: DchpStatus;
}
