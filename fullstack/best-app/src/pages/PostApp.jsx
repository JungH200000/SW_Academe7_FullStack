//PostApp.jsx
import React from 'react';
import PostForm from '../components/posts/PostForm';

export default function PostApp() {
    return (
        <div className="container">
            <div className="row my-4">
                <div className="col-md-8 offset-md-2 col-sm-10 offset-sm-1">
                    <h1 className="text-center">Posts</h1>

                    <PostForm />
                </div>
            </div>

            <div className="row my-4">
                <div className="col-md-8 offset-md-2 col-sm-10 offset-sm-1">
                    <h1 className="text-center">Posts List</h1>
                </div>
            </div>
        </div>
    );
}
