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
      const fetchPromise = fetchLogging(requestBody);
      fetchPromise
        .then((res) => res.json())
        .then((json) => {
          setData(json.data);
          setIsSuccess(true);
        })
        .catch((err) => {
          setError(err);
          setIsSuccess(false);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, [requestBody.pageIndex, requestBody.pageSize]);

  return [isLoading, isSuccess, data, error];
}
