import React from 'react';
import { Navbar } from '../navbar/navbar';

interface Post {
  id: number;
  title: string;
  content: string;
}

interface PostShowProps {
  post: Post;
}

export function PostShow(props: PostShowProps) {
  const { post } = props;

  const navigateToEdit = () => {
    window.location.href = `/posts/${post.id}/edit`;
  };

  const navigateToIndex = () => {
    window.location.href = '/posts';
  };

  const handleDelete = async () => {
    if (confirm('¿Estás seguro de que quieres eliminar este post?')) {
      try {
        const response = await fetch(`/posts/${post.id}`, {
          method: 'DELETE',
          headers: {
            'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
          },
        });
        
        if (response.ok) {
          window.location.href = '/posts';
        } else {
          alert('Error al eliminar el post');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error al eliminar el post');
      }
    }
  };

  return (
    <>
    <Navbar isLoggedIn={false} />
    <div className="post-show">
      <div className="post-header">
        <h1>{post.title}</h1>
        <div className="post-actions">
          <button onClick={navigateToEdit} className="btn btn-primary">
            Editar
          </button>
          <button onClick={handleDelete} className="btn btn-danger">
            Eliminar
          </button>
          <button onClick={navigateToIndex} className="btn btn-secondary">
            Volver a Posts
          </button>
        </div>
      </div>
      
      <div className="post-content">
        <p>{post.content}</p>
      </div>
    </div>
    </>
  );
} 