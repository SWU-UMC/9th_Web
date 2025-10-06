import axios from "axios";
import { useEffect, useState } from "react";

export function useCustomFetch<T>(url: string | null) {
    const [data, setData] = useState<T | null>(null);
    const [isPending, setIsPending] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        // url이 없는 경우를 추가해 줘야함.
        if (!url) return;
        const fetchData = async () => {
            setIsPending(true);
            setIsError(false);
            try {
                const response = await axios.get<T>(
                    url,
                    {
                        headers: {
                            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
                        },
                    }
                );
                setData(response.data);
            } catch (err) {
                setIsError(true);
            } finally {
                setIsPending(false);
            }
        };

        fetchData();
    }, [url]);

    return { data, isPending, isError };
}