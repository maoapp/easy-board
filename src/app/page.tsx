'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import SignUpForm from '@/components/SignupForm';

import { login, signUp } from '@/services/authService';

import { ToastType, useToast } from '@/hooks/useToast';
import ModalLoader from '@/components/ModalLoader';
import Toast from '@/components/Toast';
import { APIStates } from '@/types';

const Home = () => {
  const [signUpRequest, setSignUpRequest] = useState<APIStates>({
    loading: false,
    success: false,
    error: false,
  });
  const [loginRequest, setLoginRequest] = useState<APIStates>({
    loading: false,
    success: false,
    error: false,
  });

  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const router = useRouter();
  const { addToast, toasts } = useToast();

  const [formData, setFormData] = useState<any>({
    email: '',
    password: ''
  });

  const getSession = async () => {
    const token= await sessionStorage.getItem("token") as string;

    if (token) {
      router.push('/board');
    }

    setInitialLoading(false);
  }

  useEffect(() => {
    getSession();
  }, [getSession])


  const onHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevState: any) => ({
      ...prevState,
      [name]: value
    }));
  };

  const onHandleSubmit = async (e: React.FormEvent<HTMLFormElement>, isSignUp: boolean) => {
    e.preventDefault();

    if (isSignUp) {
      setSignUpRequest({...signUpRequest, loading: true});
    } else {
      setLoginRequest({...loginRequest, loading: true});
    }

    try {

      if (isSignUp) {
        await signUp(formData);
      } else {
        await login(formData);
      }

      addToast('Welcome to your board', ToastType.Success);
    } catch {
      addToast('Account creation failure, try later...', ToastType.Error);
    }
  };

  return (
    <div>
      <ModalLoader isVisible={initialLoading || signUpRequest.loading || loginRequest.loading} />
      <Toast toasts={toasts} />
      <SignUpForm
        formData={formData}
        handleChange={onHandleChange}
        handleSubmit={onHandleSubmit}
      />
    </div>
  )
}

export default Home;
