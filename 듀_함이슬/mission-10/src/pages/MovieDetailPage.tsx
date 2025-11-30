import { useParams } from "react-router-dom";

const MovieDetailPage = () => {
    const { movieId } = useParams<{ movieId: string }>();
    console.log(movieId);

    return (
        <div>
            영화 상세 페이지
            <h1>상세 페이지</h1>
            <h1>{movieId}번 영화 상세 페이지를 페칭해옵니다.</h1>
        </div>
    );
};

export default MovieDetailPage;
