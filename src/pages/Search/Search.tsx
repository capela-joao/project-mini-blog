import styles from './Search.module.css';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import { useQuery } from '../../hooks/useQuery';
import PostDetail from '../../components/PostDetail/PostDetail';
import { Link } from 'react-router-dom';

const Search = () => {
  const query = useQuery();
  const search = query.get('q');

  const { documents: posts } = useFetchDocuments('posts');

  return (
    <div className={styles.search}>
      <h2>Search</h2>
      <div>
        {posts && posts.length === 0 && (
          <>
            <p>
              Não foram encontrados posts na sua busca...
            </p>
            <Link to="/" className="btn">
              Voltar
            </Link>
          </>
        )}
        {posts &&
          posts.map((post) => (
            <PostDetail key={post.id} post={post} />
          ))}
      </div>
      <p>{search}</p>
    </div>
  );
};

export default Search;
