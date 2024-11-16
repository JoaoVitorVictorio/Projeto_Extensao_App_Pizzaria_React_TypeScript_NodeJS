import React, { useState, createContext, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../services/api';

type AuthContextData = {
  user: UserProps;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
  loadingAuth: boolean;
  loading: boolean;
  signOut: () => Promise<void>;
}

type UserProps = {
  id: string;
  name: string;
  email: string;
  token: string;
}

type AuthProviderProps = {
  children: ReactNode;
}

type SignInProps = {
  email: string;
  password: string;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>({
    id: '',
    name: '',
    email: '',
    token: ''
  });

  const [loadingAuth, setLoadingAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!user.token;

  useEffect(() => {
    async function clearStorage() {
      await AsyncStorage.removeItem('@pizzaria');
      setLoading(false);
    }

    clearStorage();
  }, []);

  async function signIn({ email, password }: SignInProps) {
    setLoadingAuth(true);

    try {
      const response = await api.post('/session', {
        email,
        password,
      });

      const { id, name, token } = response.data;

      if (!id || !token) {
        throw new Error('Usuário não encontrado');
      }

      const data = { id, name, email, token };

      await AsyncStorage.setItem('@pizzaria', JSON.stringify(data));
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      setUser(data);
    } catch (err) {
      throw err;
    } finally {
      setLoadingAuth(false);
    }
  }

  async function signOut() {
    await AsyncStorage.removeItem('@pizzaria');
    setUser({
      id: '',
      name: '',
      email: '',
      token: ''
    });
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        signIn,
        loading,
        loadingAuth,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
