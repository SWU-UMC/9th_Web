import { memo, useState } from "react";
import { type Movielanguage, type MovieFilters } from "../types/movie";
import { Input } from '../components/Input';
import { SelectBox } from "./SelectBox";
import LanguageSelector from "./LanguageSelector";
import { LANGUAGE_OPTIONS } from "../constrants/movie";


interface MovieListProps {
    onchange: (filter: MovieFilters) => void;
}

const MovieFilter = ({ onchange }: MovieListProps) => {
    console.log("리렌더링");
    // 필터를 위한 값 초기화
    const [query, setQuery] = useState<string>("");
    const [includeAdult, setIncludeAudlt] = useState<boolean>(false);
    const [language, setLanguage] = useState<Movielanguage>("ko-KR");

    // 저장된 필터 값을 제출하는..
    const handleSubmit = () => {
        const filter: MovieFilters = {
            query,
            include_adult: includeAdult,
            language,
        };
        console.log(filter);
        onchange(filter);
    };



    return (
        // 폼 태그로 감싸 엔터 입력 시에도 검색이 되도록
        <form
            onSubmit={(e) => {
                e.preventDefault(); // 새로고침 방지
                handleSubmit();     // 검색 실행
            }}
            className="transform space-y-6 rounded-2xl border-gray-300 bg-white p-6 shadow-xl transition-all hover:shadow-2xl"
        >
            <div className="flex flex-wrap gap-6">

                {/* 영화 제목 입력 필터 - query */}
                <div className="min-w-[450px] flex-1">
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        영화 제목
                    </label>
                    <Input value={query} onChange={setQuery} />
                </div>

                {/* 성인 옵션 선택 필터 - includeAdult*/}
                <div className="min-w-[250px] flex-1">
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        옵션
                    </label>
                    <SelectBox checked={includeAdult} onChange={setIncludeAudlt} label="성인 콘텐츠 표시"
                        id="include_adult" className="w-full rounded-lg border border-gray-300 px-4 px-2
                    shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500
                    "/>
                </div>

                {/* 언어 선택 필터 - language*/}
                <div className="min-w-[250px] flex-1">
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        언어
                    </label>
                    <LanguageSelector value={language} onChange={(value) => setLanguage(value as Movielanguage)} options={LANGUAGE_OPTIONS}
                        className="w-full rounded-lg border border-gray-300 px-4 px-2
                    shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>

                <div className="pt-4">
                    <button onClick={handleSubmit}> 영화 검색</button>
                </div>
            </div>
        </form>

    );
};

export default memo(MovieFilter);