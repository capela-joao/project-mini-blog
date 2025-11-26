import { Link } from 'react-router-dom';
import styles from './About.module.css';

const About = () => {
  return (
    <div className={styles.about}>
      <h2>
        Sobre o Mini <span>Blog</span>
      </h2>
      <p>
        Este projeto consite em um blog feito com React +
        Typescript no front-end e Firebase no back-end.
      </p>
      <Link to="/posts/create" className="btn_outline">
        Criar Post
      </Link>
    </div>
  );
};

export default About;
