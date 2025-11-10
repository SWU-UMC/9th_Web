import LoadingError from "../components/LoadingError";
import { LoadingSpinner } from "../components/LoadingSpinner";
import LpComment from "../components/LpCard/LpComment";
import useGetLpDetail from "../hooks/queries/useGetLpDetail"
import { Heart } from "lucide-react";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";
import { useNavigate, useParams } from "react-router-dom";
import usePostLike from "../hooks/mutations/usePostLike";
import useDeleteLike from "../hooks/mutations/useDeleteLike";
import useUpdateLp from "../hooks/mutations/useUpdateLp";
import useDeleteLP from "../hooks/mutations/useDeleteLp";
import { useState } from "react";

const LpDetailPage = () => {
    const { lpid } = useParams();
    const navigate = useNavigate();

    const { data: lp, isPending, isError, refetch, isFetching } = useGetLpDetail({ lpid: Number(lpid) });

    const { data: me } = useGetMyInfo();

    // mutate -> 비동기 요청을 실행하고, 콜백 함수를 이용해서 후속 작업 처리함
    // mutateAsync -> Promise를 반환해서 await 사용 가능
    const { mutate: likeMutate } = usePostLike();
    const { mutate: disLikeMutate } = useDeleteLike();

    const { mutate: updateLp } = useUpdateLp();
    const { mutate: deleteLp } = useDeleteLP();

    //편집용 state
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState("");
    const [editContent, setEditContent] = useState("");

    // const isLiked = lp?.data.likes.map((like) => like.userId).includes(me?.data.id as number);
    // some: 배열 안의 어떤 요솨도 주어진 판별 함수를 적어도 하나라도 통과하는지 테스트 => 속도 빠름
    const isLiked = lp?.data.likes.some((like) => like.userId === me?.data.id);

    // 현재 로그인한 유저가 작성자인지 확인
    const isAuthor = me?.data.id === lp?.data.author.id;

    const handleLikeUp = () => {
        likeMutate({ lpid: Number(lpid) });
    };

    const handleDisLikeUp = () => {
        disLikeMutate({ lpid: Number(lpid) });
    };

    // 편집
    const handleStartEdit = () => {
        if (!lp) return;
        setIsEditing(true);
        setEditTitle(lp.data.title);
        setEditContent(lp.data.content);
    };

    // 편집 취소
    const handleCancelEdit = () => {
        setIsEditing(false);
    };

    const handleSaveUpdate = () => {
        if (!lp) return;

        // UpdateLpsDto에 맞춰서 전송할 데이터 구성
        const updateDto = {
            title: editTitle,
            content: editContent,
            thumbnail: lp.data.thumbnail,
            tags: lp.data.tags.map((tag) => tag.name),
            published: lp.data.published,
        };

        updateLp(
            { lpid: Number(lpid), updateDto },
            {
                onSuccess: () => {
                    alert("수정이 완료되었습니다.");
                    setIsEditing(false);
                },
                onError: (error) => {
                    console.error("수정 실패:", error);
                    alert("수정에 실패했습니다.");
                },
            },
        );
    };

    const handleDeleteLp = () => {
        if (window.confirm("정말로 이 LP를 삭제하시겠습니까?")) {
            deleteLp(Number(lpid), {
                onSuccess: () => {
                    alert("삭제가 완료되었습니다.");
                    navigate("/");
                },
                onError: (error) => {
                    console.error("삭제 실패:", error);
                    alert("삭제에 실패했습니다. 다시 시도해주세요.");
                },
            });
        }
    };

    return (
        <LoadingError
            isPending={isPending}
            isError={isError}
            isFetching={isFetching}
            refetch={refetch}
            skeleton={<LoadingSpinner />}>
            {lp &&
                <div className="min-h-screen bg-gray-700 text-white max-w-3xl mx-auto my-6 p-6 sm:p-10 md:p-12 rounded-lg">
                    {/* 작성자, 날짜 */}
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-start gap-2">
                            <img src={lp.data.author.avatar} alt={lp.data.author.name}
                                className="w-4 h-4 rounded-full" />
                            <p className="text-lg">{lp.data.author.name}</p>
                        </div>
                        <div>
                        </div>
                        <p className="text-sm">{new Date(lp.data.createdAt).toLocaleDateString('ko-KR')}</p>
                    </div>

                    <div className="flex justify-between items-center mb-4">
                        {/* 제목 */}
                        {isEditing ?
                            (<input type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)}
                                className="text-lg bg-gray-600 border border-gray-500 rounded-sm p-1 w-[70%] text-white" />
                            ) : (<p className="text-lg max-w-[70%]">{lp.data.title}</p>)}

                        {/* 수정, 삭제 버튼 */}
                        {isAuthor && (
                            <div className="flex gap-2 flex-shrink-0">
                                {isEditing ? (
                                    <>
                                        <button
                                            onClick={handleSaveUpdate}
                                            className="cursor-pointer text-green-400">
                                            저장
                                        </button>
                                        <button
                                            onClick={handleCancelEdit}
                                            className="cursor-pointer text-gray-400">
                                            취소
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            onClick={handleStartEdit}
                                            className="cursor-pointer">
                                            수정
                                        </button>
                                        <button
                                            onClick={handleDeleteLp}
                                            className="cursor-pointer">
                                            삭제
                                        </button>
                                    </>
                                )}
                            </div>
                        )}
                    </div>

                    {/* 썸네일 이미지 */}
                    <div className="flex flex-col items-center">
                        <div className="relative flex justify-center items-center w-80 h-80 bg-gray-700 rounded-md mb-6 overflow-hidden shadow-lg shadow-black">
                            <img src={lp.data.thumbnail}
                                alt={`${lp.data.title} LP 이미지`}
                                className="w-64 h-64 object-cover rounded-full border-2 border-black" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-12 h-12 bg-white rounded-full border-1 border-black"></div>
                            </div>
                        </div>
                    </div>

                    {/* 본문 */}
                    {isEditing ? (<textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className="whitespace-pre-wrap bg-gray-600 border border-gray-500 
                        rounded-sm p-2 w-full min-h-[200px] text-white resize-none" />
                    ) : (<p className="whitespace-pre-wrap">{lp.data.content}</p>)}

                    {/* 태그, 좋아요, 댓글 */}
                    <div className="flex flex-wrap gap-2 mb-6 mt-4">
                        {lp.data.tags.map((tag) =>
                        (<span key={tag.id} className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">
                            # {tag.name}</span>))}
                    </div>
                    <button className="flex flex-col items-center gap-2 cursor-pointer mb-4 mx-auto"
                        onClick={isLiked ? handleDisLikeUp : handleLikeUp}>
                        <Heart
                            color={isLiked ? "red" : "black"}
                            fill={isLiked ? "red" : "transparent"}
                        />
                    </button>
                    <div className="pt-20">
                        <LpComment lpid={lp.data.id} />
                    </div>
                </div>
            }

        </LoadingError>
    )
}

export default LpDetailPage;
