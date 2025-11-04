import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";
import type { ResponseMyInfoDto } from "../types/auth";

const Mypage = () => {
    const [data, setData] = useState<ResponseMyInfoDto | null>(null);

    useEffect(() => {
        const getData = async () => {
            const response = await getMyInfo();
            console.log(response);

            setData(response);
        };

        getData();
    }, []);


    return (
        <div>
            <h1>{data?.data?.name}님 환영합니다.</h1>
            <img src={data?.data?.avatar as string} alt={"구글로고"} />
            <h1>{data?.data?.email}</h1>
        </div>

    );

};


export default Mypage;
