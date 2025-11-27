import { NavLink } from 'react-router-dom';
import { useAuthentication } from '../../hooks/useAuthentication';
import { useAuthContext } from '../../context/AuthContext';
import styles from './Navbar.module.css';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const { user } = useAuthContext();
  const { logout } = useAuthentication();
  const [scrolled, setScrolled] = useState<Boolean>(false);
  const [open, setOpen] = useState<Boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}
    >
      <NavLink to="/" className={styles.brand}>
        Mini <span>Blog</span>
      </NavLink>
      <button
        className={styles.menuButton}
        onClick={() => setOpen(!open)}
      >
        ☰
      </button>
      <ul
        className={open ? styles.sidebarOpen : styles.links}
      >
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? styles.active : ''
            }
          >
            Home
          </NavLink>
        </li>
        {!user && (
          <>
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? styles.active : ''
                }
              >
                Login
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive ? styles.active : ''
                }
              >
                Cadastrar
              </NavLink>
            </li>
          </>
        )}
        {user && (
          <>
            <li>
              <NavLink
                to="/posts/create"
                className={({ isActive }) =>
                  isActive ? styles.active : ''
                }
              >
                Novo Post
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive ? styles.active : ''
                }
              >
                Dashboard
              </NavLink>
            </li>
          </>
        )}
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? styles.active : ''
            }
          >
            About
          </NavLink>
        </li>
        {user && (
          <li>
            <button onClick={logout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
