// postStore.js
// 서버 통신 로직 중심 스토어
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { apiFetchPostList, apiDeletePost } from '../api/postApi';
export const usePostStore = create(
    devtools((set) => ({
        postList: [], //글목록
        totalCount: 0, //총 게시글 수
        post: null, //특정 게시글
        //글목록 가져오기
        fetchPostList: async () => {
            //api호출=> 데이터 받아오면 ==> set()
            try {
                const data = await apiFetchPostList();
                set({
                    postList: data.data,
                    totalCount: data.totalCount,
                });
            } catch (error) {
                alert('목록 가져오기 실패: ' + error.message);
            }
        },
        //글 삭제 하기
        deletePost: async (id) => {
            try {
                await apiDeletePost(id);
            } catch (error) {
                alert('글 삭제 실패: ' + error.message);
            }
        },
        //글번호로 
        fetchPostById: async(id)=>{
            // apiFetchPostById(id)==> set( {post: response.data} )
        }
    }))
);
