import { apiFetch } from "@/api/apiFetch";

export function fetchLoggingData(requestBody) {
  const endpoint = "logging";
  const method = "put";

  return apiFetch(requestBody, { method, endpoint });
}
