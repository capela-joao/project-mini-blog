import { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import type { DocumentData } from '../types/FetchTypes';

export const useFetchDocument = (
  docCollection: string,
  id: string | undefined
) => {
  const [document, setDocument] =
    useState<DocumentData | null>(null);
  const [error, setError] = useState<object | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [cancelled, setCancelled] =
    useState<boolean>(false);

  useEffect(() => {
    async function loadDocument() {
      if (!id) return;

      if (cancelled) return;

      setLoading(true);

      try {
        const docRef = await doc(db, docCollection, id);
        const docSnap = await getDoc(docRef);

        setDocument({
          id: docSnap.id,
          ...docSnap.data(),
        });

        setLoading(false);
      } catch (error: any) {
        console.log(error);
        setError(error.message);

        setLoading(true);
      }
    }

    loadDocument();
  }, [docCollection, id, cancelled]);

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return {
    document,
    error,
    loading,
  };
};
