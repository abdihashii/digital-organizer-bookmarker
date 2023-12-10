'use client';

import { signInSchema } from '@/schemas/';
import { zodResolver } from '@hookform/resolvers/zod';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Eye, EyeOff, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BsGithub } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import Image from 'next/image';

type FormData = {
  email: string;
  password: string;
};

const SignIn = () => {
  const supabase = createClientComponentClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(signInSchema),
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState({
    password: false,
    google: false,
    github: false,
  });

  const handleSignInWithGitHub = async () => {
    setIsLoading({
      ...isLoading,
      github: true,
    });

    try {
      const { data } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `/settings`,
        },
      });
      alert(JSON.stringify(data, null, 2));
    } catch (error: any) {
      alert(error.message);
    } finally {
      setIsLoading({
        ...isLoading,
        github: false,
      });
    }
  };

  const handleSignIn = async (formData: FormData) => {
    // loading spinner for sign in button. This is a local state
    setIsLoading({
      ...isLoading,
      password: true,
    });

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      alert(JSON.stringify(data, null, 2));
    } catch (error: any) {
      alert(JSON.stringify(error.message, null, 2));
      // TODO: Show a user-friendly error message on the UI
    } finally {
      setIsLoading({
        ...isLoading,
        password: false,
      });
    }
  };

  const onSubmit = handleSubmit((data) => {
    const formData = {
      email: data.email,
      password: data.password,
    };

    handleSignIn(formData);
  });

  return (
    <main className="h-screen w-full md:flex md:flex-row md:items-center lg:p-20 xl:p-28">
      <article className="relative hidden h-full w-2/3 items-center justify-center bg-gray-100 px-10 dark:bg-gray-500 md:flex md:flex-col">
        {/* <p className="text-3xl font-bold text-gray-900">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p> */}

        <Image
          // src="/ben-kim-HeSAWmZ_tqw-unsplash.jpg"
          src="https://images.unsplash.com/photo-1696339434901-cf4728e1223e?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          fill={true}
          objectFit="cover"
          alt="a snow covered mountain with a sky background"
        />
      </article>

      <article className="flex h-full flex-col justify-center gap-8 px-10 md:w-1/2">
        <section className="flex flex-col gap-2">
          <h1 className="text-center text-4xl font-bold text-gray-900 dark:text-white">
            Welcome Back!
          </h1>

          <h2 className="text-center text-gray-500 dark:text-gray-400">
            Sign in to your account below
          </h2>
        </section>

        <form className="flex flex-col gap-8" onSubmit={onSubmit}>
          <section>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...register('email')} />
            <p className="text-red-500">{errors.email?.message}</p>
          </section>

          <section>
            <Label htmlFor="password">Password</Label>
            <div className="relative flex flex-row items-center justify-between">
              <Input
                className="w-full"
                id="password"
                type={showPassword ? 'text' : 'password'}
                {...register('password')}
              />
              <button
                className="absolute right-4 text-blue-500 hover:text-blue-600"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <p className="text-red-500">{errors.password?.message}</p>
          </section>

          <section>
            <Button
              className="w-full"
              type="submit"
              disabled={isLoading.password}
            >
              {isLoading.password ? (
                <>
                  <RefreshCw className="mr-2 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </section>
        </form>

        <section className="flex flex-row items-center justify-center gap-2">
          <hr className="w-full border-gray-300 dark:border-gray-400" />
          or
          <hr className="w-full border-gray-300 dark:border-gray-400" />
        </section>

        <section className="flex flex-col gap-8">
          <Button disabled={isLoading.google}>
            {isLoading.google ? (
              <>
                <RefreshCw className="mr-2 animate-spin" />
                Signing in...
              </>
            ) : (
              <>
                <FcGoogle className="mr-2 text-2xl" />
                Continue with Google
              </>
            )}
          </Button>

          <Button disabled={isLoading.github} onClick={handleSignInWithGitHub}>
            {isLoading.github ? (
              <>
                <RefreshCw className="mr-2 animate-spin" />
                Signing in...
              </>
            ) : (
              <>
                <BsGithub className="mr-2 text-2xl" />
                Continue with GitHub
              </>
            )}
          </Button>
        </section>

        <section className="flex flex-row justify-center gap-2">
          <p className="text-center text-gray-500 dark:text-gray-400">
            First time here?
          </p>

          <Link
            className="text-center text-blue-500 hover:underline"
            href="/sign-up"
          >
            Sign up for free
          </Link>
        </section>
      </article>
    </main>
  );
};

export default SignIn;
