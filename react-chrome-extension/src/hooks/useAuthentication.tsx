import { useState, useEffect } from 'react';
import supabase from '../utils/supabaseClient';
import { User } from '@supabase/supabase-js';

const useAuthentication = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error('Error getting session:', error.message);
        alert(`Error getting session: ${error.message}`);
      }

      setUser(session?.user ?? null);
    };

    // Execute the getSession function to get the user when the component mounts
    getSession();

    // Subscribe to authentication state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Authentication event:', event);
      setUser(session ? session.user : null);
    });

    // Cleanup function
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error.message);
    }
    setUser(null);
  };

  return { user, handleSignOut };
};

export default useAuthentication;
