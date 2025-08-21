//postApi.js
import axios from 'axios';
let baseUrl = `http://localhost:7777/api`;
export const apiCreatePost = async (data) => {
    // 백엔드 /api/posts 로 post방식으로 요청 보내서 응답 받기
    const response = await axios.post(`${baseUrl}/posts`, data, {
        headers: {
            'Content-Type': 'application/json', //파일업로드시 multipart/form-data로 전송해야 함
        },
    });
    return response.data;
};
