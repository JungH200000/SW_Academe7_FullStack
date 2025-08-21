import { Table, Pagination, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
//npm i axios

export default function UserAll() {
    const [userList, setUserList] = useState([]);
    const [totalCount, setTotalCount] = useState(0); //총 회원수
    const [totalPages, setTotalPages] = useState(1); //총 페이지 수
    const [currentPage, setCurrentPage] = useState(1); //현재 페이지 번호
    const [loading, setLoading] = useState(false); //로딩 상태
    const size = 3; //한 페이지 당 보여줄 회원수(목록 개수)

    useEffect(() => {
        getAllUser(currentPage, size);
    }, [currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    //api 요청 보내는 함수
    const getAllUser = async (cpage = 1, perPage = 3) => {
        try {
            setLoading(true); //로딩중
            const url = `https://reqres.in/api/users`;
            const response = await axios.get(url, {
                headers: {
                    'x-api-key': 'reqres-free-v1',
                },
                params: {
                    page: cpage,
                    per_page: perPage,
                    delay: 5,
                },
            });

            //alert(JSON.stringify(response));
            const tmpArr = [...response.data.data]; //user정보가 배열로 반환
            //  total, total_pages, page
            const { total, total_pages, page } = response.data;
            setUserList(tmpArr);
            setTotalCount(total);
            setTotalPages(total_pages);
            setCurrentPage(page);
            setLoading(false);
        } catch (error) {
            alert('error: ' + error.message);
            setLoading(false);
        }
    };
    /* 
        axios.get(url,{
            headers:{ //헤더값
                key:value,
            },
            params:{//get query string 파라미터
                page:1,
                per_page:10
            }
        }).then().catch()
        axios.post(url, data,{})
    */

    return (
        <div>
            <h1 className="text-center my-4">모든 User List</h1>
            {loading && (
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            )}
            {!loading && (
                <>
                    <p>
                        <h4>총 회원 수: {totalCount} 명</h4>
                    </p>

                    <Table bordered striped hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Photo</th>
                                <th>Name</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* map() */}
                            {(!userList || userList.length == 0) && (
                                <tr>
                                    <td colSpan={4}>데이터가 없습니다</td>
                                </tr>
                            )}

                            {userList.length > 0 &&
                                userList.map((user) => (
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td style={{ width: '25%' }}>
                                            <Link to={`/rest/${user.id}`}>
                                                <img src={user.avatar} className="img-fluid" alt={user.first_name} />
                                            </Link>
                                        </td>
                                        <td>
                                            {user.first_name} {user.last_name}
                                        </td>
                                        <td>{user.email}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </Table>
                    {/* 페이징 처리 */}
                    <div>
                        {/* {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <p key={page}>{page}</p>
                ))} */}
                        {/* Array.from({legnth:4})==>[undefined, undefined, undefined, undefined] */}
                        {/* [1,2,3,4] */}
                        <Pagination className="justify-content-center">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <Pagination.Item
                                    key={page}
                                    active={page === currentPage}
                                    onClick={() => handlePageChange(page)}
                                >
                                    {page}
                                </Pagination.Item>
                            ))}
                        </Pagination>
                    </div>
                </>
            )}
        </div>
    );
}
