import { useState, useEffect, useReducer } from 'react';
import { db } from '../firebase/config';
import { doc, deleteDoc } from 'firebase/firestore';

const initialState = {
  loading: false,
  error: null,
};

const deleteReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'LOADING':
      return { loading: true, error: null };
    case 'DELETED_DOC':
      return { loading: false, error: null };
    case 'ERROR':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const useDeletedDocument = (
  docCollection: string
) => {
  const [response, dispatch] = useReducer(
    deleteReducer,
    initialState
  );

  const [cancelled, setCancelled] = useState(false);

  const checkCancelledBeforeDispatch = (action: any) => {
    if (!cancelled) {
      dispatch(action);
    }
  };

  const deleteDocument = async (id: string) => {
    checkCancelledBeforeDispatch({
      type: 'LOADING',
    });
    try {
      const deletedDocument = await deleteDoc(
        doc(db, docCollection, id)
      );
      checkCancelledBeforeDispatch({
        type: 'DELETED_DOC',
        payload: deletedDocument,
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
    deleteDocument,
    response,
  };
};
