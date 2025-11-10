import { useState } from 'react';
import usePostLp from '../../hooks/mutations/usePostLp'
import type { CreateLpsDto } from '../../types/lp';

interface LpAddProps {
    isOpen: boolean;
    onClose: () => void;
}

const LpAdd = ({ isOpen, onClose }: LpAddProps) => {

    const { mutate: postMutate, isPending } = usePostLp();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    // add 버튼 누르기 전 태그 입력란의 현재 값
    const [currentTagInput, setCurrentTagInput] = useState('')
    // add 버튼 눌러 확정된 태그 목록 
    const [tagsList, setTagsList] = useState<string[]>([]);

    // 사용자가 선택한 실제 파일 저장할 상태 
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    if (!isOpen) {
        return null;
    }

    // add 버튼 누르면 실행될 함수
    const handleAddTag = () => {
        const newTag = currentTagInput.trim(); // 입력값 양쪽 공백 제거? 

        // 태그 비어있지 않고  목록에 없는지 확인
        if (newTag !== "" && !tagsList.includes(newTag)) {
            setTagsList([...tagsList, newTag]);

            setCurrentTagInput('');
        }
    };

    // 태그 옆 x 누르면 실행될 함수 
    const handleRemoveTag = (tagToRemove: string) => {
        //setTaglist 호출해 현재 taglist에서 tagToRemove와 일치하지 않는 
        // 태그들만 필터링하여 새로운 배열 만듦
        setTagsList((prevTags) => prevTags.filter(tag => tag !== tagToRemove));
    };

    // 이미지 파일 input에서 파일이 변경되었을 때 실행될 함수
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        } else {
            setSelectedFile(null);
        }
    };

    // 폼 제출 이벤트
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // 폼 제출 시 페이지 새로고침되는 것 방지

        const newData: CreateLpsDto = {
            title: title,
            content: content,
            tags: tagsList,
            published: true,
            thumbnail: null // 이미지 파일을 url로 서버에 넘기는 것 구현 못해서 일단 null
        };

        console.log("서버로 데이터 전송 시도:", newData);

        postMutate(newData, {
            onSuccess: () => {
                onClose();
            },
        });

    };

    return (

        // 뒷배경 클릭 시 닫기
        <div className="fixed inset-0 bg-black/70 z-40 flex justify-center items-center"
            onClick={onClose}>

            {/* 모달창 클릭 시에는 안 닫히게 */}
            <div className="bg-white p-6 rounded-lg shadow-lg z-50 w-full max-w-sm"
                onClick={(e) => e.stopPropagation()} >

                <button onClick={onClose} className="float-right text-2xl cursor-pointer">x</button>

                <form onSubmit={handleSubmit} className='space-y-2'>

                    {/* lp thumbnail */}
                    <div>
                        <input type='file' id='thumbnail' onChange={handleFileChange} accept='image/*'
                            placeholder='LP Thumbnail'
                            className='border border-gray-600 text-gray-600 w-full p-2 rounded-sm cursor-pointer' />
                    </div>
                    {/* lp name */}
                    <div>
                        <input type='text' id='title' value={title} onChange={(e) => setTitle(e.target.value)} required
                            placeholder='LP Name'
                            className='border border-gray-600 text-gray-600 w-full p-2 rounded-sm' />
                    </div>
                    {/* lp content */}
                    <div>
                        <textarea id='content' rows={1}
                            value={content} onChange={(e) => setContent(e.target.value)} required placeholder='LP Content'
                            className='border border-gray-600 text-gray-600 w-full p-2 rounded-sm resize-none' />
                    </div>
                    {/* lp tag */}
                    <div className='flex items-center gap-2'>
                        <input type='text' id='tags' value={currentTagInput}
                            onChange={(e) => setCurrentTagInput(e.target.value)} placeholder='Lp Tag'
                            className='border border-gray-600 text-gray-600 w-full p-2 rounded-sm' />
                        <button type='button' onClick={handleAddTag}
                            className='px-4 py-2 w-auto rounded-sm text-white bg-gray-500 cursor-pointer'> Add </button>
                    </div>
                    {/* lp taglist */}
                    <div className='flex flex-wrap gap-2'>
                        {tagsList.map((tag) => (
                            <span key={tag}
                                className='inline-flex items-center border border-gray-600 text-gray-600 p-2 rounded-sm'>
                                {tag}
                                <button type='button' onClick={() => handleRemoveTag(tag)} className='cursor-pointer px-2'
                                >x</button></span>
                        ))}
                    </div>

                    {/* lp add */}
                    <button type='submit'
                        disabled={isPending}
                        className='p-2 cursor-pointer text-white bg-green-600 w-full rounded-sm hover:bg-green-700'>
                        Add LP</button>
                </form>
            </div>
        </div>
    )
}

export default LpAdd;
