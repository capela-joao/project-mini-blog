import styles from './Dashboard.module.css';

import { Link } from 'react-router-dom';

import { useAuthContext } from '../../context/AuthContext';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import { useFetchDocument } from '../../hooks/useFetchDocument';
import { useDeletedDocument } from '../../hooks/useDeleteDocument';

const Dashboard = () => {
  const { user } = useAuthContext();
  const uid = user.uid;
  const {
    documents: posts,
    loading,
    error,
  } = useFetchDocuments('posts', null, uid);
  const { deleteDocument } = useDeletedDocument('posts');

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className={styles.dashboard}>
      <h2>Dashboard</h2>
      <p>Gerencie os seus posts!</p>
      {posts && posts.length === 0 ? (
        <div className={styles.noposts}>
          <p>Não foram encontrados posts.</p>
          <Link to="/posts/create" className="btn_outline">
            Criar primeiro post
          </Link>
        </div>
      ) : (
        <>
          <div className={styles.post_header}>
            <span>Título</span>
            <span>Ações</span>
          </div>
          {posts &&
            posts.map((post) => (
              <div
                key={post.id}
                className={styles.post_row}
              >
                <div className={styles.post_content}>
                  <p>{post.title}</p>
                  <img src={post.image} alt={post.title} />
                </div>
                <div className={styles.post_actions}>
                  <Link
                    to={`/posts/${post.id}`}
                    className="btn_outline"
                  >
                    Ver
                  </Link>
                  <Link
                    to={`/posts/edit/${post.id}`}
                    className="btn_outline"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => deleteDocument(post.id)}
                    className="btn btn_warn"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default Dashboard;
