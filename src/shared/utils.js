export function throttle(callback, delay = 1000) {
  let shouldWait = false;

  return (...args) => {
    if (shouldWait) return;

    callback(...args);
    shouldWait = true;
    setTimeout(() => {
      shouldWait = false;
    }, delay);
  };
}

export function toLocalDateTime(utcDateTime) {
  return utcDateTime && new Date(utcDateTime).toLocaleString();
}
