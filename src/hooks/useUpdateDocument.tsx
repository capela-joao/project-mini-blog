import { useState, useEffect, useReducer } from 'react';
import { db } from '../firebase/config';
import { updateDoc, doc } from 'firebase/firestore';
import type { UpdatePostData } from '../types/FetchTypes';

const initialState = {
  loading: false,
  error: null,
};

const updateReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'LOADING':
      return { loading: true, error: null };
    case 'UPDATED_DOC':
      return { loading: false, error: null };
    case 'ERROR':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const useUpdateDocument = (
  docCollection: string
) => {
  const [response, dispatch] = useReducer(
    updateReducer,
    initialState
  );

  const [cancelled, setCancelled] = useState(false);

  const checkCancelledBeforeDispatch = (action: any) => {
    if (!cancelled) {
      dispatch(action);
    }
  };

  const updateDocument = async (
    id: string,
    data: UpdatePostData
  ) => {
    checkCancelledBeforeDispatch({
      type: 'LOADING',
    });
    try {
      const docRef = await doc(db, docCollection, id);

      const updateDocument = await updateDoc(docRef, data);

      checkCancelledBeforeDispatch({
        type: 'UPDATED_DOC',
        payload: updateDocument,
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
    updateDocument,
    response,
  };
};
