import { useState } from "react";
import type { CommentResponseDto } from "../../types/comment";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";

interface LpCommentItemProps {
    comment: CommentResponseDto; // 댓글 데이터
    currentUserId: number; // 작성자 확인
    onUpdate: (commentId: number, newContent: string) => void; // 수정 요청 함수
    onDelete: (commentId: number) => void; // 삭제 요청 함수
}


const LpCommentItem = ({
    comment, currentUserId, onUpdate, onDelete }: LpCommentItemProps) => {

    const [isMenuOpen, setIsMenuOpen] = useState(false); // 댓글의 메뉴
    const [isEditing, setIsEditing] = useState(false); // 수정 모드
    const [editContent, setEditContent] = useState(comment.content); // 수정 중인 댓글
    const isAuthor = currentUserId === comment.author.id; // 작성자 확인

    // 수정, 저장
    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        if (editContent.trim().length === 0)
            return;

        onUpdate(comment.id, editContent);
        setIsEditing(false);
        setIsMenuOpen(false);
    };

    // 삭제
    const handleDelete = () => {
        onDelete(comment.id);
        setIsMenuOpen(false);
    };

    return (
        // 댓글 작성자 아바타와 이름
        <div className="flex items-start gap-3 p-4 pt-5 relative">
            <img src={comment.author.avatar || undefined} alt={comment.author.name}
                className="w-10 h-10 rounded-full flex-shrink-0 bg-gray-400" />
            <div className="flex-grow">
                <p className="font-bold text-white text-md">{comment.author.name}</p>

                {/* 댓글 보여주거나 수정  */}
                {isEditing ? (
                    // 수정 
                    <form onSubmit={handleSave}>
                        <textarea
                            className="w-full rounded-sm bg-gray-600 border border-white 
                      text-white placeholder-gray-500 h-9 resize-none mt-1"
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)} />

                        <div className="flex gap-2 mt-2">
                            <button
                                type="submit"
                                className="text-sm text-green-400 cursor-pointer">
                                저장</button>
                            <button
                                type="button"
                                onClick={() => setIsEditing(false)}
                                className="text-sm text-gray-400 cursor-pointer">취소</button>
                        </div>
                    </form>
                ) : (
                    // 일반
                    <p className="text-white text-sm mt-1 whitespace-pre-wrap">{comment.content}</p>
                )}
            </div>

            {/* "..." 메뉴 */}
            {isAuthor && !isEditing && (
                <div className="absolute top-4 right-4">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <MoreVertical size={16} className="text-gray-400 cursor-pointer" />
                    </button>

                    {/* 팝업 메뉴 */}
                    {isMenuOpen && (
                        <div className="absolute top-6 right-0 bg-gray-800 rounded-md shadow-lg z-10 w-20 border border-gray-700 p-1 flex gap-1">
                            <button
                                onClick={() => {
                                    setIsEditing(true);
                                    setIsMenuOpen(false);
                                }}
                                className="p-2 text-sm cursor-pointer">
                                <Pencil size={14} />
                            </button>

                            <button
                                onClick={() => handleDelete()}
                                className="p-2 text-sm cursor-pointer">
                                <Trash2 size={14} />
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default LpCommentItem;
