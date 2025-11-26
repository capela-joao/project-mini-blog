import styles from './Post.module.css';

import { useParams } from 'react-router-dom';
import { useFetchDocument } from '../../hooks/useFetchDocument';

const Post = () => {
  const { id } = useParams();

  if (!id) return <p>Post não encontrado</p>;

  const { document: post, loading } = useFetchDocument(
    'posts',
    id
  );

  return (
    <div className={styles.post}>
      {loading && <p>Carregando post...</p>}
      {post && (
        <div className={styles.detail_post}>
          <h1>{post.title}</h1>
          <img src={post.image} alt={post.title} />
          <p>{post.body}</p>
          <h3>Este post trata sobre:</h3>
          <div className={styles.tags}>
            {post.tagsArray.map((tag: string) => (
              <p key={tag}>
                <span>#</span>
                {tag}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
