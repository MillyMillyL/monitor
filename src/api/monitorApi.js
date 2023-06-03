import { apiFetch } from "@/api/apiFetch";

export function fetchMonitorData(requestBody) {
  const endpoint = "monitor";
  const method = "put";

  return apiFetch(requestBody, { method, endpoint });
}
