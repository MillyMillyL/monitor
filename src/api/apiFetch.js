export function apiFetch(requestBody, { endpoint, method = "get" }) {
  const url = `${import.meta.env.VITE_MONITOR_BASE_URL}${
    import.meta.env.VITE_MONITOR_ENDPOINT_PREFIX
  }/${endpoint}`;

  console.log("requesting url: ", url);

  const controller = new AbortController();

  let fetchPromise = fetch(url, {
    method: method,
    mode: "cors",
    signal: controller.signal,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  return [fetchPromise, controller];
}
