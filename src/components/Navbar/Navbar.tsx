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

  const closeSideBar = () => setOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
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
          className={
            open ? styles.sidebarOpen : styles.links
          }
        >
          <li>
            <NavLink
              onClick={closeSideBar}
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
                  onClick={closeSideBar}
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
                  onClick={closeSideBar}
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
                  onClick={closeSideBar}
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
                  onClick={closeSideBar}
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
              onClick={closeSideBar}
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
      <div
        className={`${styles.overlay} ${open ? styles.overlayVisible : ''}`}
        onClick={closeSideBar}
      />
    </>
  );
};

export default Navbar;
