import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { FetchState } from "@/src/types";

export function useFetch<T>(url: string) {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const { data } = await axios.get<T>(url);

        if (isMounted) {
          setState({ data, loading: false, error: null });
        }
      } catch (err: unknown) {
        if (isMounted) {
          let errorMessage = "Unknown error";

          if (err instanceof AxiosError) {
            errorMessage = err.response?.data?.message || err.message;
          } else if (err instanceof Error) {
            errorMessage = err.message;
          }

          setState({ data: null, loading: false, error: errorMessage });
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [url]);

  return state;
}
