// counterStore.js
//npm i zustand
import { create } from 'zustand';
//zustand : 전역적인 상태관리 라이브러리
export const useStore = create((set) => ({
    count: 0, //전역적으로 관리할 state 데이터
    increase: () =>
        set((state) => ({
            count: state.count + 1,
        })), //액션 함수
    decrease: () =>
        set((state) => ({
            count: state.count - 1,
        })),
}));
