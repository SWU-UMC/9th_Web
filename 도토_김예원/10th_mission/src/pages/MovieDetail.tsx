import { useParams } from "react-router-dom";

export default function MovieDetail() {
    const { movieId } = useParams<{ movieId: string }>();

    return (
        <div style={{ padding: "2rem" }}>
            <h2>🎬 영화 상세 페이지</h2>
            <p>현재 선택한 영화 ID: {movieId}</p>
        </div>
    );
}