// userApi.js
import axiosInstance from './axiosInstance';
import axiosAuthInstance from './axiosAuthInstance';

export const apiSignIn = async (loginUser) => {
    const response = await axiosInstance.post(`/auth/login`, loginUser); // `/api/auth/login`
    return response.data;
};
// /api/admin/users ==> 관리자 페이지 (전체 회원목록)
// /api/users ==> 일반 회원 관련
export const apiLogout = async ({ email }) => {
    const response = await axiosAuthInstance.post(`/auth/logout`, { email: email });
    return response.data;
};
