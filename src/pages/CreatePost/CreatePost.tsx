import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { useInsertDocuments } from '../../hooks/useInsertDocuments';
import styles from './CreatePost.module.css';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState('');
  const [formError, setFormError] = useState('');
  const Navigate = useNavigate();
  const { insertDocument, response } =
    useInsertDocuments('posts');
  const { user } = useAuthContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    try {
      new URL(image);
    } catch (error: any) {
      setFormError('A URL da imagem é inválida.');
      return;
    }

    const tagsArray = tags
      .split(',')
      .map((tag) => tag.trim().toLowerCase());

    if (!title || !image || !body || !tags) {
      setFormError('Por favor, preencha todos os campos.');
      return;
    }

    if (formError) {
      return;
    }

    insertDocument({
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    });

    Navigate('/');
  };

  return (
    <div className={styles.createPost}>
      <h2>Criar Post</h2>
      <p>Escreva sobre o que quiser e compartilhe!</p>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label>
          <span>Título:</span>
          <input
            type="text"
            name="title"
            required
            placeholder="Pense em um bom título..."
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </label>
        <label>
          <span>URL da imagem:</span>
          <input
            type="text"
            name="image"
            required
            placeholder="Pense em um bom título..."
            onChange={(e) => setImage(e.target.value)}
            value={image}
          />
        </label>
        <label>
          <span>Conteúdo:</span>
          <textarea
            name="body"
            required
            placeholder="Pense em um bom título..."
            onChange={(e) => setBody(e.target.value)}
            value={body}
          />
        </label>
        <label>
          <span>Tags:</span>
          <input
            type="text"
            name="tags"
            required
            placeholder="Insira as tags separadas por vírgula"
            onChange={(e) => setTags(e.target.value)}
            value={tags}
          />
        </label>
        {!response.loading && (
          <button className="btn" type="submit">
            Criar Post
          </button>
        )}
        {response.loading && (
          <button className="btn" type="submit" disabled>
            Aguarde...
          </button>
        )}
        {response.error && (
          <p className="error">{response.error}</p>
        )}
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};

export default CreatePost;
