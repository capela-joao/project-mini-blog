import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { useFetchDocument } from '../../hooks/useFetchDocument';
import { useUpdateDocument } from '../../hooks/useUpdateDocument';
import styles from './EditPost.module.css';

const EditPost = () => {
  const { id } = useParams();
  const { document: post } = useFetchDocument('posts', id);

  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState('');
  const [formError, setFormError] = useState('');

  const { updateDocument, response } =
    useUpdateDocument('posts');

  const Navigate = useNavigate();

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setImage(post.image);
      setBody(post.body);

      const textTags = post.tagsArray.join(', ');

      setTags(textTags);
    }
  }, [post]);

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

    const data = {
      title,
      image,
      body,
      tagsArray,
    };

    updateDocument(id!, data);

    Navigate('/dashboard');
  };

  return (
    <div className={styles.editPost}>
      {post && (
        <>
          <h2>Editar Post</h2>
          <p>Altere os dados do post como desejar!</p>
          <form
            className={styles.form}
            onSubmit={handleSubmit}
          >
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
            <p className={styles.preview}>
              Preview da imagem atual:
            </p>
            <img
              src={post.image}
              alt={post.title}
              className={styles.preview_image}
            />
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
                Editar Post
              </button>
            )}
            {response.loading && (
              <button
                className="btn"
                type="submit"
                disabled
              >
                Aguarde...
              </button>
            )}
            {response.error && (
              <p className="error">{response.error}</p>
            )}
            {formError && (
              <p className="error">{formError}</p>
            )}
          </form>
        </>
      )}
    </div>
  );
};

export default EditPost;
