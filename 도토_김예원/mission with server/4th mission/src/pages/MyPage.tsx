import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";
import type { ResponseMyInfoDto } from "../types/auth";
// 뒤로 가기 아이콘
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Mypage = () => {
    const navigate = useNavigate();
    // 화면에 보여주고 싶으면
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
        <div className="flex flex-col items-center justify-center h-full gap-4">
            <div className="flex flex-col gap-3 w-[300px]">
                <div className="relative flex items-center justify-center py-2">
                    <button
                        onClick={() => navigate("/")}
                        className="absolute left-1 flex items-center text-gray-500 hover:text-gray-900"
                    >
                        <IoIosArrowBack className="w-5 h-6" />
                    </button>
                    <h1 className="text-lg font-bold text-gray-500">사용자 정보</h1>
                </div>
                <div
                    className="relative flex items-center justify-center text-lg font-semibold text-gray-900 ">
                    {data?.data.name}</div>
                </div>
        </div>
    );

};


export default Mypage;