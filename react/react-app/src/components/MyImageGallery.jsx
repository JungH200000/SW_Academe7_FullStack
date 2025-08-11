// MyImageGallery.jsx
//src/data/idolData.js ==> 배열 데이터
import { data } from '../data/idolData';
import { useState } from 'react';
//npm i react-bootstrap
//부트스트랩 컴포넌트들을 리액트 컴포넌트로 제공하는 라이브러리

import { Container, Row, Col, Card, Button } from 'react-bootstrap';

export default function MyImageGallery() {
    const [idols, setIdols] = useState(data);
    //C: Create
    const addIdol = () => {
        const newIdol = window.prompt('새로 추가할 아이돌 이름을 입력하세요');
        const newImg = window.prompt('새로 추가할 이미지명을 입력하세요');
        const newAlbum = prompt('새로 추가할 앨범명을 입력하세요');

        // idols.push({ name: newIdol, image: newImg, desc: newAlbum }); //==> 원본 데이터를 수정
        // console.log('idols: ', idols);

        //배열 사본을 이용해서 변경. 원본은 불변성을 유지. 
        // const tmpIdols = [...idols];
        // tmpIdols.push({ name: newIdol, image: newImg, desc: newAlbum }); //==> 원본 데이터를 수정

        const tmpIdols = [...idols, { name: newIdol, image: newImg, desc: newAlbum }];
        console.log('idols: ', idols);
        console.log('tmpIdols: ', tmpIdols);
        setIdols(tmpIdols);
    };

    //D: Delete
    const deleteIdol = (i) => {
        //alert('hi ' + i); 배열사본.splice(시작인덱스,count)  or 원본배열.filter()
        // const tmpIdols = [...idols];
        // tmpIdols.splice(i, 1);

        const tmpIdols = idols.filter((_, idx) => idx !== i);
        setIdols(tmpIdols);
    };

    //U: Update
    const updateIdol = (i) => {
        //수정할 아이돌 이름/앨범명/이미지 => prompt  입력 받아 수청 처리하세요
        const newName = prompt('수정할 아이돌 이름 입력하세요');
        const newImg = prompt('수정할 아이돌 이미지명 입력하세요');
        const newDesc = prompt('수정할 앨범명 입력하세요');

        const tmpIdols = [...idols];
        tmpIdols[i] = { name: newName, image: newImg, desc: newDesc };
        setIdols(tmpIdols);
    };

    return (
        <>
            <Container className="py-5">
                <Row>
                    <Col md={12}>
                        <Button variant="primary" className="mx-1">
                            All Idols
                        </Button>
                        <Button variant="success" onClick={addIdol}>
                            Add Idol
                        </Button>
                    </Col>
                </Row>
                <Row className="mt-5">
                    {/* R: Read => map() */}
                    {idols.map((obj, i) => (
                        <Col md={3} sm={6} xs={12} key={i} className="my-2">
                            <Card style={{ width: '16rem' }}>
                                <Card.Img variant="top" src={obj.image} alt={obj.name} />
                                <Card.Body>
                                    <Card.Title>{obj.name}</Card.Title>
                                    <Card.Text>{obj.desc}</Card.Text>
                                    <Button
                                        variant="info"
                                        onClick={() => {
                                            updateIdol(i);
                                        }}
                                    >
                                        Update
                                    </Button>
                                    <Button
                                        variant="danger"
                                        onClick={() => {
                                            deleteIdol(i);
                                        }}
                                    >
                                        Delete
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
}
