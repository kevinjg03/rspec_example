import React from 'react';
import { visit } from '@hotwired/turbo';
import { Navbar } from '../navbar/navbar';

interface Post {
  id: number;
  title: string;
  content: string;
}

interface PostProps {
  posts: Post[];
  isLoggedIn: boolean;
}

export function PostsIndex(props: PostProps) {
  const navigateToNewPost = () => {
    visit('/posts/new', { action: 'replace' });
  };

  const navigateToPost = (postId: number) => {
    visit(`/posts/${postId}`, { action: 'replace' });
  };

  const navigateToEditPost = (postId: number) => {
    visit(`/posts/${postId}/edit`, { action: 'replace' });
  };
  
  return (
    <>
    <Navbar isLoggedIn={props.isLoggedIn} />
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 gap-4 flex flex-col">
      <div className="posts-header flex justify-between items-center">
        <h1 className="text-4xl font-bold">Posts</h1>
        <button 
          onClick={navigateToNewPost}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Crear Nuevo Post
        </button>
      </div>
      
      <div className="posts-list flex flex-col gap-4 ">
        {props.posts.length === 0 ? (
          <p>No hay posts disponibles.</p>
        ) : (
          props.posts.map((post: Post) => (
            <div key={post.id} className="card p-4 flex flex-col gap-2 bg-white p-4  rounded-md">
              <h2 className="text-2xl font-bold" onClick={() => navigateToPost(post.id)}>
                {post.title}
              </h2>
              <p className="text-gray-600">{post.content}</p>
              <div className="post-actions flex gap-2">
                <button 
                  onClick={() => navigateToPost(post.id)}
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md"
                >
                  Ver
                </button>
                <button 
                  onClick={() => navigateToEditPost(post.id)}
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md"
                >
                  Editar
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
    </>
  );
}