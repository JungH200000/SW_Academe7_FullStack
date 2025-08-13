import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
//npm i axios

export default function UserAll() {
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        getAllUser();
    }, []);

    //api 요청 보내는 함수
    const getAllUser = async () => {
        try {
            const url = `https://reqres.in/api/users`;
            const response = await axios.get(url, {
                headers: {
                    'x-api-key': 'reqres-free-v1',
                },
                params: {
                    page: 1,
                    per_page: 12,
                },
            });

            //alert(JSON.stringify(response));
            const tmpArr = [...response.data.data];
            setUserList(tmpArr);
        } catch (error) {
            alert('error: ' + error.message);
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

            <Table bordered striped hover>
                <tr>
                    <th>ID</th>
                    <th>Photo</th>
                    <th>Name</th>
                    <th>Email</th>
                </tr>
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
            </Table>
        </div>
    );
}
