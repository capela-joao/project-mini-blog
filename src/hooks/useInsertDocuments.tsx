import { useState, useEffect, useReducer } from 'react';
import { db } from '../firebase/config';
import {
  collection,
  addDoc,
  Timestamp,
} from 'firebase/firestore';

const initialState = {
  loading: false,
  error: null,
};

const insertReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'LOADING':
      return { loading: true, error: null };
    case 'INSERTED_DOC':
      return { loading: false, error: null };
    case 'ERROR':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const useInsertDocuments = (
  docCollection: string
) => {
  const [response, dispatch] = useReducer(
    insertReducer,
    initialState
  );

  const [cancelled, setCancelled] = useState(false);

  const checkCancelledBeforeDispatch = (action: any) => {
    if (!cancelled) {
      dispatch(action);
    }
  };

  const insertDocument = async (document: any) => {
    checkCancelledBeforeDispatch({
      type: 'LOADING',
    });
    try {
      const newDocument = {
        ...document,
        createdAt: Timestamp.now(),
      };
      const insertDocument = await addDoc(
        collection(db, docCollection),
        newDocument
      );
      checkCancelledBeforeDispatch({
        type: 'INSERTED_DOC',
        payload: insertDocument,
      });
    } catch (error: any) {
      checkCancelledBeforeDispatch({
        type: 'ERROR',
        payload: error.message,
      });
    }
  };

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return {
    insertDocument,
    response,
  };
};
