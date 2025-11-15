// LP(레슨/글 등) 목록 타입 정의
export interface LpItem {
  id: number;
  title: string;
  thumbnail?: string | null;
  likeCount?: number;
  createdAt: string;
}

export interface LpListResponse {
  data: {
    data: LpItem[];
    hasNext?: boolean;
    nextCursor?: number;
  };
}