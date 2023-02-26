import React, { useEffect, useState } from "react";
import { fetchLogging } from "@/api/loggingApi";

export default function useFectch(requestBody) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(true);

  requestBody &&
    useEffect(() => {
      setIsLoading(true);
      let isMounted = true;

      const [fetchPromise, controller] = fetchLogging(requestBody);
      fetchPromise
        .then((res) => res.json())
        .then((json) => {
          if (isMounted) {
            setData(json.data);
            setIsSuccess(true);
          }
        })
        .catch((err) => {
          if (isMounted) {
            setError(err);
            setIsSuccess(false);
          }
        })
        .finally(() => {
          if (isMounted) setIsLoading(false);
        });

      return () => {
        isMounted = false;
        controller.abort();
      };
    }, [requestBody]);

  return [isLoading, isSuccess, data, error];
}
