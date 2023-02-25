const loggingEndPoint = "/api/v1/logging";

export function fetchLogging(requestBody) {
  const url = `${import.meta.env.VITE_MONITOR_BASE_URL}${loggingEndPoint}`;

  return fetch(url, {
    method: "PUT", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });
}

export async function fetchLoggingToJson(requestBody) {
  const data = null;
  const error = null;
  const isSuccess = true;

  try {
    const res = await fetchLogging(requestBody);
    const json = await res.json();
    data = json?.data;
  } catch (_error) {
    isSuccess = false;
    error = _error;
  }

  return [isSuccess, data, error];
}
