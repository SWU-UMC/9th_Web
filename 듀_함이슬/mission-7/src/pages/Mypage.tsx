import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";
import type { UpdateUserDto } from "../types/auth";
import useUpdateUser from "../hooks/mutations/useUpdateUser";
import { Settings } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../constants/key";

const Mypage = () => {
    const [isEditing, setIsEditing] = useState(false);

    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [avatar, setAvatar] = useState("");

    const { mutate, isPending } = useUpdateUser();

    const handleUpdateUser = () => {
        const updateUser: UpdateUserDto = {
            name,
            bio,
            avatar,
        };
        mutate(updateUser);
    };

    const handleEditToggle = () => {
        if (isEditing) {
            handleUpdateUser();
            setIsEditing(false);
        } else {
            setIsEditing(true);
        }
    };

    const { data } = useQuery({
        queryKey: [QUERY_KEY.myInfo],
        queryFn: getMyInfo,
    });

    useEffect(() => {
        if (data) {
            setName(data.data.name);
            setBio(data.data.bio || "");
            setAvatar(data.data.avatar || "");
        }
    }, [data]);


    return (
        <div className="w-full flex justify-center gap-4">
            <div className="flex items-center gap-4 mt-10">
                {isEditing ? (
                    <input type="text" value={avatar} onChange={(e) => setAvatar(e.target.value)}
                        placeholder="아바타"
                        className="border rounded-sm" />
                ) : (<img src={data?.data?.avatar as string} alt={"구글로고"}
                    className="w-16 h-16 rounded-full" />)}

                <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                        {isEditing ? (<input type="text" value={name} onChange={(e) => setName(e.target.value)}
                            placeholder="이름"
                            className="border rounded-sm" />
                        ) : (<h1 className="font-bold text-lg">{data?.data?.name}</h1>)}

                        <button className="cursor-pointer"
                            onClick={handleEditToggle}
                            disabled={isPending}><Settings size={14} /></button>
                    </div>
                    {isEditing ? (<input type="text" value={bio} onChange={(e) => setBio(e.target.value)}
                        placeholder="바이오"
                        className="border rounded-sm" />
                    ) : (<p className="text-md">{data?.data?.bio}</p>)}
                    {!isEditing && <p className="text-md">{data?.data?.email}</p>}
                </div>

            </div>
        </div>

    );

};


export default Mypage;
