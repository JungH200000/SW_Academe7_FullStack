// PostList.jsx
import { usePostStore } from '../../stores/postStore';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function PostList() {
    const postList = usePostStore((s) => s.postList);
    const totalCount = usePostStore((s) => s.totalCount);
    const fetchPostList = usePostStore((s) => s.fetchPostList);
    const deletePost = usePostStore((s) => s.deletePost);

    useEffect(() => {
        fetchPostList();
    }, []);

    const handleDelete = async (pid) => {
        //alert(pid);
        const yn = confirm(`${pid}번 글을 정말 삭제할까요?`);
        if (!yn) return;
        //
        await deletePost(pid);
        await fetchPostList();
    };

    return (
        <div className="post-list">
            <h3 className="my-3"> 총 게시글 수: {totalCount} 개</h3>

            {postList.length === 0 && <div>데이터가 없습니다</div>}
            {postList.length > 0 &&
                postList.map((post, index) => (
                    <div
                        className="my-3"
                        key={post.id ?? index}
                        style={{ backgroundColor: '#efefef', borderRadius: '10px', display: 'flex' }}
                    >
                        <div style={{ width: '30%' }} className="text-center">
                            {post.file ? (
                                <img
                                    src={`http://localhost:7777/uploads/${post.file}`}
                                    alt={post.file}
                                    style={{ width: '90%' }}
                                    className="img-thumbnail"
                                />
                            ) : (
                                <img
                                    src={`http://localhost:7777/uploads/noimage.png`}
                                    alt={post.file ?? 'noimage'}
                                    style={{ width: '90%' }}
                                    className="img-thumbnail"
                                />
                            )}
                        </div>
                        <div style={{ width: '70%' }} className="p-3">
                            <h5>
                                {post.name} {'   '}
                                <small>
                                    <i className="text-muted">Posted on {post.wdate}</i>
                                </small>
                            </h5>
                            <Link to={`/posts/${post.id}`}>
                                <h2>{post.title}</h2>
                            </Link>

                            <p>{post.content}</p>
                            <div className="d-flex justify-content-center">
                                <button className="btn btn-outline-info mx-1">Edit</button>
                                <button className="btn btn-outline-danger" onClick={() => handleDelete(post.id)}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            {/* 페이지네이션 */}
        </div>
    );
}
