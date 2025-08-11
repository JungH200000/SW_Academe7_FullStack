import './App.css';
import { Container, Row, Col } from 'react-bootstrap';
import Header from './components/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import MyComp1 from './components/MyComp1';
import MyComp2 from './components/MyComp2';
import PageNotFound from './components/PageNotFound';
import Side from './components/Side';
import UseEffectHook from './components/UseEffectHook';

function App() {
    return (
        <div>
            <BrowserRouter>
                {/* BrowserRouter로 앱 전체를 감싸야 라우팅 기능을 사용할 수 있다
                  SPA에서 URL경로에 따라 다른 컴포넌트를 보여주는 기능을 함
                */}
                <Container>
                    <Row>
                        <Col>
                            <Header />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} sm={3} md={4} lg={4} className="d-none d-sm-block">
                            {/* d-none: 모두 안보이게 한 뒤 d-sm-block=> small사이즈부터 보여준다 */}
                            <Side />
                        </Col>
                        <Col xs={12} sm={9} md={8} lg={8}>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                {/* Route: 특정 url에 대해 렌더링할 컴포넌트를 정의(매핑) */}
                                <Route path="/comp1" element={<MyComp1 />} />
                                <Route path="/comp2" element={<MyComp2 />} />
                                <Route path="/hook1" element={<UseEffectHook />} />
                                <Route path="/*" element={<PageNotFound />} />
                            </Routes>
                        </Col>
                    </Row>
                </Container>
            </BrowserRouter>
        </div>
    );
}

export default App;
