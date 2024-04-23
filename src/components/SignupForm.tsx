import { isValidEmail } from '@/lib/utils';
import React, { useMemo, useState } from 'react';

interface FormState {
  email: string;
  password: string;
}

interface SignUpFormProps {
  formData: FormState;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>, isSignUp: boolean) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ formData, handleSubmit, handleChange }) => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const handleFocus = (fieldName: string) => {
    setFocusedInput(fieldName);
  };

  const handleBlur = () => {
    setFocusedInput(null);
  };

  const isEmailValid = useMemo(() => isValidEmail(formData.email), [formData.email]);
  const isPasswordValid = useMemo(() => formData.password.length >= 6, [formData.password]);
  const disableSubmit = useMemo(() => !(isEmailValid && isPasswordValid), [isEmailValid, isPasswordValid]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="py-12 px-12 bg-white rounded-2xl shadow-xl">
        <form onSubmit={(e) => handleSubmit(e, isSignUp)}>
          <div>
            <h1 className="text-3xl font-bold text-center mb-4 cursor-pointer">
              {isSignUp ? 'Create An Account' : 'Log In'}
            </h1>
            <p
              className="w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer">
                {isSignUp ? 'Create an account to manage your daily tasks!' : 'Log in to access your account.'}
            </p>
          </div>
          <div className="space-y-4">
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onFocus={() => handleFocus('email')}
              onBlur={handleBlur}
              placeholder="Email Address"
              className={`block text-sm py-3 px-4 rounded-lg w-full border outline-purple-500 ${focusedInput === 'email' && !isEmailValid ? 'border-red-500' : ''}`}
            />
            {focusedInput === 'email' && !isEmailValid && (
              <p className="text-sm text-red-500">Please enter a valid email address.</p>
            )}
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onFocus={() => handleFocus('password')}
              onBlur={handleBlur}
              placeholder="Password"
              className={`block text-sm py-3 px-4 rounded-lg w-full border outline-purple-500 ${focusedInput === 'password' && !isPasswordValid ? 'border-red-500' : ''}`}
            />
            {focusedInput === 'password' && !isPasswordValid && (
              <p className="text-sm text-red-500">Password must be at least 6 characters long.</p>
            )}
          </div>
          <div className="text-center mt-6">
            <button
              disabled={disableSubmit}
              type="submit"
              className={`w-full py-2 text-xl text-white rounded-lg transition-all 
              ${disableSubmit ? 'bg-gray-400' : 'bg-purple-400 hover:bg-purple-500'}`}
            >
              {isSignUp ? 'Create Account' : 'Log In'}
            </button>
            <p className="mt-4 text-sm">
              {isSignUp ? 'Already Have An Account ? ' : 'Don\'t Have An Account ? '}
              <span 
                className="underline cursor-pointer"
                onClick={() => setIsSignUp((prevIsSignUp) => !prevIsSignUp)}
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </span>
            </p>
          </div>
        </form>
      </div>
      <div className="w-40 h-40 absolute bg-purple-300 rounded-full top-0 right-12 hidden md:block"></div>
      <div className="w-20 h-40 absolute bg-purple-300 rounded-full bottom-20 left-10 transform rotate-45 hidden md:block"></div>
    </div>
  );
};

export default SignUpForm;
