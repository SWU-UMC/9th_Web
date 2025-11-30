// 한 개의 상품 정보를 정의한 타입
export type Lp = {
    id: string;
    title: string;
    singer: string;
    // 왜 string이지
    price: string;
    img: string;
    amount: number;
};

// Lp 타입 객체들의 배열 타입
export type CartItems = Lp[];