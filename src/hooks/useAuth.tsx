import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const useAuthentication = () => {
  const [token, setToken] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    getSession();
  }, []);
  
  const getSession = async () => {
    const storedToken = sessionStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }

  const logout = () => {
    sessionStorage.removeItem('token');
    setToken('');

    router.push('/');
  };

  return { token, logout };
};

export default useAuthentication;
