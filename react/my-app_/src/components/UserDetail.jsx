// UserDetail.jsx
import { useParams } from 'react-router-dom';
import { members } from '../data/users';
import { useEffect, useState } from 'react';

export default function UserDetail() {
    // /users/:id ==> :id 동적 파라미터로 간주된다 => useParams훅을 사용하여 이 값을 받아보자
    const { id } = useParams();
    console.log('id: ', id, typeof id); //id는 string타입
    const [user, setUser] = useState(null);

    // useEffect훅 작성해서 콜백함수 안에서 해당 번호의 회원정보 검색하여 state값 설정
    useEffect(() => {
        /*
        members.forEach((obj, i) => {
            if (obj.id === Number(id)) {
                console.log(obj.name);
                setUser(obj);
            }
        });
        */
        //배열.find(callback)
        const findUser = members.find((obj, _) => obj.id === Number(id));
        setUser(findUser);
    }, [id]);

    return (
        <div>
            <h2>User Detail</h2>
            <h3 className="text-info"> {id} 번 회원 정보</h3>
            {user ? (
                <div className="alert alert-success">
                    <h3>Id: {user.id} </h3>
                    <h3>Name: {user.name} </h3>
                    <h3>Email: {user.email} </h3>
                    <h3>Role: {user.role} </h3>
                </div>
            ) : (
                <div className="alert alert-danger">
                    <h3> {id} 번 회원정보는 없습니다 </h3>
                </div>
            )}
        </div>
    );
}
