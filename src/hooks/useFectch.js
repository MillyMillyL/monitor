import React, { useEffect, useState } from "react";
import { fetchDataFactory } from "../api/fetchDataFactory";

export default function useFectch(requestBody, requestPage) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    let isMounted = true;

    const [fetchPromise, controller] = fetchDataFactory(
      requestBody,
      requestPage
    );
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
