'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, RefreshCw } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { BsGithub } from 'react-icons/bs';
import Image from 'next/image';
import { signUpSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';

type FormData = {
  email: string;
  password: string;
  confirmPassword: string;
};

export default function SignUpPage() {
  const supabase = createClientComponentClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(signUpSchema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState({
    password: false,
    google: false,
    github: false,
  });

  // const handleSignUpWithGitHub = async () => {
  //   try {
  //     await supabase.auth.signInWithOAuth({
  //       provider: 'github',
  //     });
  //   } catch (error: any) {
  //     alert(error.message);
  //   }
  // };

  const handleSignUp = async (formData: FormData) => {
    // loading spinner for sign up button. This is a local state
    setIsLoading({
      ...isLoading,
      password: true,
    });

    try {
      const { data } = await supabase.auth.signUp({
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
    // Check if the password and confirm password fields match
    if (data.password !== data.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const formData = {
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
    };

    handleSignUp(formData);
  });

  return (
    <main className="h-screen w-full md:flex md:flex-row md:items-center lg:p-20 xl:p-28">
      <article className="relative hidden h-full w-2/3 items-center bg-gray-100 px-10 dark:bg-gray-500 md:flex">
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
        <h1 className="text-center text-3xl font-bold text-gray-900 dark:text-white">
          Sign Up
        </h1>

        <form className="flex flex-col gap-8" onSubmit={onSubmit}>
          <section>
            <Label htmlFor="email">Email</Label>
            <Input required id="email" type="email" {...register('email')} />
            <p className="text-red-500">{errors.email?.message}</p>
          </section>

          <section>
            <Label htmlFor="password">Password</Label>
            <div className="relative flex flex-row items-center justify-between">
              <Input
                required
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
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative flex flex-row items-center justify-between">
              <Input
                className="w-full"
                required
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                {...register('confirmPassword')}
              />
              <button
                className="absolute right-4 text-blue-500 hover:text-blue-600"
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <p className="text-red-500">{errors.confirmPassword?.message}</p>
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
                  Signing up...
                </>
              ) : (
                'Create and account'
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
                Signing up...
              </>
            ) : (
              <>
                <FcGoogle className="mr-2 text-2xl" />
                Sign up with Google
              </>
            )}
          </Button>

          <Button
            disabled={isLoading.github}
            // onClick={handleSignUpWithGitHub}
          >
            {isLoading.github ? (
              <>
                <RefreshCw className="mr-2 animate-spin" />
                Signing up...
              </>
            ) : (
              <>
                <BsGithub className="mr-2 text-2xl" />
                Sign up with GitHub
              </>
            )}
          </Button>
        </section>

        <section className="flex flex-row justify-center gap-2">
          <p className="text-center text-gray-500 dark:text-gray-400">
            Already have an account?
          </p>

          <Link
            className="text-center text-blue-500 hover:underline"
            href="/sign-in"
          >
            Sign In
          </Link>
        </section>
      </article>
    </main>
  );
}
