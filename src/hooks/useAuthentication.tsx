import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';

import { auth, db } from '../firebase/config';

import { useState, useEffect, use } from 'react';

import { type RegisterCredentials } from '../types/AuthTypes/AuthTypes';

export const useAuthentication = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [cancelled, setCancelled] = useState<boolean>(false);

  const checkIfIsCancelled = () => {
    if (cancelled) {
      return;
    }
  };

  const createUser = async (data: RegisterCredentials) => {
    checkIfIsCancelled();
    setLoading(true);
    setError(null);

    try {
      const { user } = await createUserWithEmailAndPassword(auth, data.email, data.password);

      await updateProfile(user, { displayName: data.username });
    } catch (error: any) {
      let systemErrorMessage;
      if (error.message.includes('Password')) {
        systemErrorMessage = 'A senha deve ter pelo menos 6 caracteres.';
      } else if (error.message.includes('email-already')) {
        systemErrorMessage = 'E-mail já cadastrado.';
      } else {
        systemErrorMessage = 'Ocorreu um erro, por favor tente mais tarde.';
      }

      setError(systemErrorMessage);
    }

    setLoading(false);
  };

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return {
    auth,
    createUser,
    error,
    loading,
    setError,
  };
};
