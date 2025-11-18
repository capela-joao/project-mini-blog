import styles from './Register.module.css';

import { useState, useEffect } from 'react';

import { useAuthentication } from '../../hooks/useAuthentication';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const { createUser, error: authError, loading } = useAuthentication();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError('');

    const user = {
      username,
      email,
      password,
    };

    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    const res = await createUser(user);

    console.log('Usuário cadastrado:', user);
  };

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  return (
    <div className={styles.register}>
      <h1>Efetue o seu cadastro!</h1>
      <p>Crie seu usuário e compartilhe suas histórias.</p>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="username">
          <span>Nome:</span>
          <input
            type="text"
            name="username"
            placeholder="Nome do usuário"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label htmlFor="email">
          <span>E-mail:</span>
          <input
            type="email"
            name="email"
            placeholder="E-mail do usuário"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor="password">
          <span>Senha:</span>
          <input
            type="password"
            name="password"
            placeholder="Insira sua senha"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label htmlFor="confirmPassword">
          <span>Confirmação de Senha:</span>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirme a sua senha"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        {!loading && (
          <button className={styles.btn} type="submit">
            Cadastrar
          </button>
        )}
        {loading && (
          <button className={styles.btn} type="submit" disabled>
            Aguarde...
          </button>
        )}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Register;
