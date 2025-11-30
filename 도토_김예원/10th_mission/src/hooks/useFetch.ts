import type { AxiosRequestConfig } from "axios"
import { useEffect, useState } from "react"
import { axiosClient } from "../apis/axiosClients";

// api를 통해 데이터를 가져오는 hook
export const useFetch = <T>(url: string, options: AxiosRequestConfig) => {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                // 구조 분해 할당
                const { data } = await axiosClient.get(url, {
                    ...options,
                });
                setData(data);
            } catch {
                setError("데이터를 가져오는데 에러가 발생했습니다");
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [url, options]);

    return {
        data,
        error,
        isLoading,
    };
};