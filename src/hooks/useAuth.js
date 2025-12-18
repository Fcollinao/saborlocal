import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export const useAuth = () => {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useAuth debe usarse dentro de AppProvider');
  }
  return ctx.auth;
};

export const useAuthActions = () => {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useAuthActions debe usarse dentro de AppProvider');
  }
  const { login, logout } = ctx;
  return { login, logout };
};
