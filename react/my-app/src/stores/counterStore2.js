//counterStore2.js
//persist미들웨어를 사용해보는 예제
import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
//devtools => redux devtools를 사용하도록 하는 미들웨어
//persist => 브라우저 localStorage에 state값을 저장하도록 하는 미들웨어(새로고침시 state데이터 초기화되는 것을 막는다)
export const useCountStore = create(
    devtools(
        persist(
            (set) => ({
                count: 0,
                increase: () => set((state) => ({ count: state.count + 1 }), false, 'INCREASE'),
                //set함수( partial, replace?,actionName)

                decrease: () => set((state) => ({ count: state.count - 1 }), false, 'DECREASE'),
            }),
            { name: 'counter-storage' } //localStorage에 저장할 때 사용할 key값: counter-storage
        )
    )
);
