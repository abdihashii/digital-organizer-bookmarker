'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Link from 'next/link';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Eye, EyeOff, RefreshCw } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { BsGithub } from 'react-icons/bs';

type FormData = {
  email: string;
  password: string;
};

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required();

const SignIn = () => {
  const supabase = createClientComponentClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // const handleSignInWithGitHub = async () => {
  //   setIsLoading(true);

  //   try {
  //     const { data } = await supabase.auth.signInWithOAuth({
  //       provider: 'github',
  //       options: {
  //         redirectTo: `/settings`,
  //       },
  //     });
  //     alert(JSON.stringify(data, null, 2));
  //   } catch (error: any) {
  //     alert(error.message);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleSignIn = async (formData: FormData) => {
    // loading spinner for sign in button. This is a local state
    setIsLoading(true);

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
      setIsLoading(false);
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
      <article className="hidden h-full w-2/3 items-center justify-center bg-gray-100 px-10 dark:bg-gray-500 md:flex md:flex-col">
        <p className="text-3xl font-bold text-gray-900">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>

        {/* <Image
					src="/ben-kim-HeSAWmZ_tqw-unsplash.jpg"
					width={'100%'}
					height={'100%'}
					alt="a snow covered mountain with a sky background"
				/> */}
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
            <Input required id="email" type="email" {...register('email')} />
            <p className="text-red-500">{errors.email?.message}</p>
          </section>

          <section>
            <Label htmlFor="password">Password</Label>
            <div className="relative flex flex-row items-center justify-between">
              <Input
                className="w-full"
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
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? (
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
          <Button disabled={isLoading}>
            {isLoading ? (
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

          <Button
            disabled={isLoading}
            // onClick={handleSignInWithGitHub}
          >
            {isLoading ? (
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
