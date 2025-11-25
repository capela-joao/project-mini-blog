import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';

import styles from './Home.module.css';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import PostDetail from '../../components/PostDetail/PostDetail';

const Home = () => {
  const [query, setQuery] = useState('');
  const Navigate = useNavigate();
  const { documents: posts, loading } =
    useFetchDocuments('posts');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (query) {
      return Navigate(`/search?q=${query}`);
    }
  };

  return (
    <div className={styles.home}>
      <h1>Veja os posts mais recentes</h1>
      <form
        onSubmit={handleSubmit}
        className={styles.searchForm}
      >
        <input
          type="text"
          placeholder="Ou busque por tags..."
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn_outline">Pesquisar</button>
      </form>
      <div>
        {loading && <p>Carregando...</p>}
        {posts &&
          posts?.map((post) => (
            <PostDetail key={post.id} post={post} />
          ))}
        {posts && posts.length === 0 && (
          <div className={styles.noposts}>
            <p>Não foram encontrados posts</p>
            <Link to="/createpost" className="btn">
              Criar primeiro post
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
