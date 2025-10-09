import axios from "axios";
import { useEffect, useState } from "react";

// 데이터를 호출하고, 로딩 에러 로직을 담은 커스텀 훅
// 타입을 모르므로 제너럴 타입으로 작성
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
        // 의존성 배열에 url를 넣어 주소가 바뀔때마다 실행
    }, [url]);

    return { data, isPending, isError };
}