import type { CommonResponse } from "./common";

// 댓글 작성자 타입
export interface CommentAuthor {
  id: number;
  name: string;
  email: string;
  bio: string | null;
  avatar: string | null;
  createdAt: string;
  updatedAt: string;
}

// 댓글 각 아이템 타입
export interface LpCommentItem {
  id: number;
  content: string;
  lpId: number;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  author: CommentAuthor;
}

// 댓글 리스트 응답 내부 구조
export interface LpCommentData {
  data: LpCommentItem[];
  nextCursor: number;
  hasNext: boolean;
}

export type LpCommentListResponse = CommonResponse<LpCommentData>;