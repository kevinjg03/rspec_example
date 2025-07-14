import React, { useState } from 'react';

interface Post {
  id?: number;
  title: string;
  content: string;
}

interface PostFormProps {
  post?: Post;
  isEdit?: boolean;
}

export function PostForm(props: PostFormProps) {
  const { post, isEdit = false } = props;
  
  const [formData, setFormData] = useState<Post>({
    title: post?.title || '',
    content: post?.content || '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const newErrors: { [key: string]: string } = {};
    if (!formData.title.trim()) {
      newErrors.title = 'El título es requerido';
    }
    if (!formData.content.trim()) {
      newErrors.content = 'El contenido es requerido';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const url = isEdit ? `/posts/${post?.id}` : '/posts';
      const method = isEdit ? 'PATCH' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
        },
        body: JSON.stringify({
          post: formData
        }),
      });

      if (response.ok) {
        window.location.href = '/posts';
      } else {
        const errorData = await response.json();
        setErrors(errorData.errors || {});
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al guardar el post');
    }
  };

  const navigateToIndex = () => {
    window.location.href = '/posts';
  };

  return (
    <div className="post-form w-1/2 mx-auto">
      <h1 className="text-2xl font-bold">{isEdit ? 'Editar Post' : 'Nuevo Post'}</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group flex flex-col gap-2">
          <label htmlFor="title">Título:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className={errors.title ? 'error' : 'border-2 border-gray-300 rounded-md p-2'}
          />
          {errors.title && <span className="error-message">{errors.title}</span>}
        </div>

        <div className="form-group flex flex-col gap-2">
          <label htmlFor="content">Contenido:</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            rows={10}
            className={errors.content ? 'error' : 'border-2 border-gray-300 rounded-md p-2'}
          />
          {errors.content && <span className="error-message">{errors.content}</span>}
        </div>

        <div className="form-actions flex justify-end gap-2 mt-4">
          <button type="button" onClick={navigateToIndex} className="bg-gray-500 text-white px-4 py-2 rounded-md">
            Cancelar
          </button>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
            {isEdit ? 'Actualizar' : 'Crear'} Post
          </button>
        </div>
      </form>
    </div>
  );
} 