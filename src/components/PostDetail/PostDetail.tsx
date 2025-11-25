import styles from './PostDetail.module.css';

import { Link } from 'react-router-dom';

const PostDetail = ({ post }: any) => {
  return (
    <div className={styles.post}>
      <img src={post.image} alt={post.title} />
      <h2>{post.title}</h2>
      <p className={styles.createdBy}>{post.createdBy}</p>
      <div className={styles.tags}>
        {post.tagsArray.map((tag: any) => (
          <p key={tag}>
            <span>#</span>
            {tag}
          </p>
        ))}
      </div>
      <Link
        to={`/posts/${post.id}`}
        className="btn_outline"
      >
        Ler
      </Link>
    </div>
  );
};

export default PostDetail;
