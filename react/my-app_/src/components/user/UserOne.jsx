// UserOne.jsx
import React from 'react';
// React에서 https://reqres.in 에 요청을 보내는 예제(ajax)
// fetch()/ XMLHttpRequest
// axios() ==> npm i axios
//  /rest/1
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
export default function UserOne() {
    // const [user, setUser] = useState({ id: 0, first_name: '', last_name: '', email: '', avatar: '' });
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); //로딩 상태
    const [notFound, setNotFound] = useState(false); //없는 회원 상태

    // 1. id값 받기
    const { id } = useParams();
    // 2. 요청보낼 url만들기 `https://reqres.in/api/users/1`
    // 3. useEffect구현해서 fetch()이용해서 요청 보내기
    const { id: no, first_name, last_name, avatar, email } = user || {};

    const getUserInfo = async () => {
        setLoading(true); //로딩 중...
        setNotFound(false);
        const url = `https://reqres.in/api/users/${id}`;
        //fetch이용해서 회원정보 받아오기
        try {
            const res = await fetch(url, {
                method: 'get',
                headers: {
                    'x-api-key': 'reqres-free-v1',
                },
            });
            //alert(res.ok);
            if (res.ok) {
                const data = await res.json(); //응답 문자열을 json객체로 변환
                console.log('data: ', data);
                setUser(data.data);
                setNotFound(false);
            } else {
                //alert(`${id}번 회원은 없습니다`);
                setNotFound(true);
            }
        } catch (error) {
            alert('error: ' + error.message);
            setNotFound(true);
        } finally {
            //반드시 한 번은 수행되는 블럭
            setLoading(false);
        }
    };

    useEffect(() => {
        getUserInfo();
        //const res = fetch(url).then(res => res.json()).then(data=> setUser(data)).catch(err=>alert(err))
    }, [id]);

    return (
        <div>
            <h1>User Info</h1>
            {loading && (
                <div className="alert alert-info">
                    <h3>로딩 중...</h3>
                </div>
            )}
            {!loading && notFound && (
                <div className="alert alert-danger">
                    <h2>{id}번 회원은 없어요</h2>
                </div>
            )}
            {!loading && !notFound && user && (
                <div className="alert alert-primary">
                    <div>
                        <img alt="이미지" src={avatar} className="img-thumbnail"></img>
                    </div>

                    <h2>Id: {no} </h2>
                    <h2>
                        Name: {first_name} {last_name}
                    </h2>
                    <h2>Email: {email} </h2>
                </div>
            )}
        </div>
    );
}
