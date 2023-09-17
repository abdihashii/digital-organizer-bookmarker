'use client';

import React, { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Button } from '@/components/ui/button';
import { ReloadIcon } from '@radix-ui/react-icons';

const SignOut = () => {
  const supabase = createClientComponentClient();

  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    setIsLoading(true);
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error(`Error signing out: ${error.message}`);
    }

    setIsLoading(false);
  };

  return (
    <Button
      className="bg-blue-500 text-white hover:bg-blue-600"
      type="button"
      onClick={handleSignOut}
    >
      {isLoading ? <ReloadIcon className="animate-spin" /> : 'Sign Out'}
    </Button>
  );
};

export default SignOut;
