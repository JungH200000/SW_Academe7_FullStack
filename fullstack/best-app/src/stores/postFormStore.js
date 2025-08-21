// postFormStore.js
//PostForm 입력 폼과 관련된 스토어
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
/**
 * postFormStore.js : UI 상태 중심 스토어
 * postStore.js : post목록 가져오기, 1건 post조회, post삭제, post수정 (서버 통신 로직-biz logic 중심)
 *
 */

export const usePostFormStore = create(
    devtools((set) => ({
        formData: {
            name: 'dooly@a.b.c',
            title: '',
            content: '',
            file: '',
        },
        setFormData: (data) => set((state) => ({ formData: { ...state.formData, ...data } })),
        resetFormData: () => set({ formData: { name: '', title: '', content: '', file: '' } }), //formData초기화
    }))
);
