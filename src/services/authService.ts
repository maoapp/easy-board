import { post } from '@/lib/api';
import { AuthData, SignUpResponse } from '@/types';

export const signUp = async ({email, password}: AuthData): Promise<void> => {
  try {
    const response = await post<SignUpResponse>(
      'https://board-service.onrender.com/auth/signup',
      {
        email,
        password
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    sessionStorage.setItem("token", response.token);
  } catch (error: any) {
    console.error('Sign up failed:', error.response.data);
    throw new Error('Sign up failed'); // Throw an error
  }
};

export const login = async ({email, password}: AuthData): Promise<void> => {
  try {
    const response = await post<SignUpResponse>(
      'https://board-service.onrender.com/auth/login',
      {
        email,
        password
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    sessionStorage.setItem("token", response.token);
  } catch (error: any) {
    console.error('Login failed:', error.response.data);
    throw new Error('Login failed:'); // Throw an error
  }
};
