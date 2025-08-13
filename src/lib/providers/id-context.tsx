"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface IdContextType {
  id: string | undefined;
  title?: string | null;
  setId: (id: string, title?: string) => void;
}

const LOCAL_STORAGE_KEY_ID = "selectedId";
const LOCAL_STORAGE_KEY_TITLE = "selectedTitle";

const IdContext = createContext<IdContextType | undefined>(undefined);

export const IdProvider = ({ children }: { children: ReactNode }) => {
  const [id, setIdState] = useState<string | undefined>(undefined);
  const [title, setTitle] = useState<string | undefined>(undefined);

  useEffect(() => {
    const savedId = localStorage.getItem(LOCAL_STORAGE_KEY_ID);
    const savedTitle = localStorage.getItem(LOCAL_STORAGE_KEY_TITLE);
    if (savedId) setIdState(savedId);
    if (savedTitle) setTitle(savedTitle);
  }, []);

  const setId = (newId: string, newTitle?: string) => {
    if (newTitle) {
      setTitle(newTitle);
      localStorage.setItem(LOCAL_STORAGE_KEY_TITLE, newTitle);
    }
    setIdState(newId);
    localStorage.setItem(LOCAL_STORAGE_KEY_ID, newId);
  };

  return (
    <IdContext.Provider value={{ id, setId, title }}>
      {children}
    </IdContext.Provider>
  );
};

export const useId = () => {
  const context = useContext(IdContext);
  if (!context) {
    throw new Error("useId must be used within an IdProvider");
  }
  return context;
};
