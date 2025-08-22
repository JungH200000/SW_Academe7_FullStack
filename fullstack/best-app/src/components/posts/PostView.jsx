// PostView.jsx
//useParams, useSearchParams
import { useParams, useNavigate, Link } from 'react-router-dom';

export default function PostView() {
    const { id } = useParams(); //type: string
    const navigate = useNavigate();

    //useEffect 훅에서 글번호로 게시글 가져오는 함수 호출 (usePostStore)

    return (
        <div className="post-view">
            <div className="row my-3">
                <div className="col-md-10 offset-md-1 px-3">
                    <h1 className="my-5 text-center">Post View</h1>

                    <div className="text-end my-2">
                        <button className="btn btn-info mx-2">수정</button>
                        <button className="btn btn-danger">삭제</button>
                    </div>

                    <div className="card">
                        <div className="card-body">
                            <h5>[제목 영역]</h5>
                            <hr />
                            <div style={{ marginBottom: '1rem' }} className="text-center">
                                <img
                                    src="http://localhost:7777/uploads/noimage.png"
                                    alt="noimage"
                                    style={{ maxWidth: '100%', borderRadius: '0.5rem' }}
                                />
                            </div>
                            <div className="cArea px-5">
                                [본문 내용 영역]
                                <br />
                                <span>♡</span> <span>👎</span>
                            </div>
                        </div>
                        <div className="card-footer">Created on [날짜] by [작성자]</div>
                    </div>
                </div>
            </div>

            <div className="row my-5">
                <div className="col px-5 text-center">
                    <button className="btn mt-4 btn-secondary" onClick={() => navigate('/posts')}>
                        Post List 전체 출력
                    </button>
                    <h3 className="mt-5">댓글영역</h3>
                </div>
            </div>

            <div className="row my-5">
                <div className="col px-5">
                    <h3 className="mt-4">댓글추가</h3>
                </div>
            </div>

            <div className="row my-5">
                <div className="col px-5">댓글 수정 폼</div>
            </div>
        </div>
    );
}
