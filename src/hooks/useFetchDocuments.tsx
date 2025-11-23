import { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
  QuerySnapshot,
} from 'firebase/firestore';
import type { DocumentData } from '../types/FetchTypes';

export const useFetchDocuments = (
  docCollection: string,
  search: string | null = null,
  uid: string | null = null
) => {
  const [documents, setDocuments] = useState<
    DocumentData[] | null
  >(null);
  const [error, setError] = useState<object | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [cancelled, setCancelled] =
    useState<boolean>(false);

  useEffect(() => {
    async function loadData() {
      if (cancelled) return;

      setLoading(true);

      const collectionRef = await collection(
        db,
        docCollection
      );

      try {
        let q;

        if (search) {
          q = await query(
            collectionRef,
            where('tagsArray', 'array-contains', search),
            orderBy('createdAt', 'desc')
          );
        } else {
          q = await query(
            collectionRef,
            orderBy('createdAt', 'desc')
          );
        }

        await onSnapshot(q, (QuerySnapshot) => {
          setDocuments(
            QuerySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          );
        });

        setLoading(false);
      } catch (error: any) {
        console.log(error);
        setError(error.message);
      }
    }

    loadData();
  }, [docCollection, search, uid, cancelled]);

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return {
    documents,
    error,
    loading,
  };
};
