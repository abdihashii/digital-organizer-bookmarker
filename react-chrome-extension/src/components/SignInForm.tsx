import { useState } from 'react';
import supabase from '../utils/supabaseClient';
import { handleError } from '../utils/errorHandler';

const SignInForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loginCredentials, setLoginCredentials] = useState({
    email: '',
    password: '',
  });

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true); // Start loading

    const {
      data: { user },
      error,
    } = await supabase.auth.signInWithPassword({
      email: loginCredentials.email,
      password: loginCredentials.password,
    });

    if (error) {
      handleError(error, 'Error signing in');
    } else {
      console.log('Signed in as:', user?.id);
    }

    setIsLoading(false); // End loading
  };

  return (
    <form
      className="flex flex-col items-center justify-center gap-4"
      onSubmit={handleSignIn}
    >
      <section className="flex flex-col justify-center gap-2">
        <label htmlFor="email">Email</label>
        <input
          className="border border-gray-400 rounded p-2"
          id="email"
          name="email"
          type="email"
          value={loginCredentials.email}
          onChange={(e) =>
            setLoginCredentials({
              ...loginCredentials,
              email: e.target.value,
            })
          }
          autoFocus
          required
        />
      </section>

      <section className="flex flex-col justify-center gap-2">
        <label htmlFor="password">Password</label>
        <input
          className="border border-gray-400 rounded p-2"
          id="password"
          name="password"
          type="password"
          value={loginCredentials.password}
          onChange={(e) =>
            setLoginCredentials({
              ...loginCredentials,
              password: e.target.value,
            })
          }
          required
        />
      </section>

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 w-full"
        disabled={isLoading}
      >
        {isLoading ? 'Signing In...' : 'Sign In'}
      </button>
    </form>
  );
};

export default SignInForm;
