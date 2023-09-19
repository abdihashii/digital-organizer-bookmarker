'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  LockClosedIcon,
  ExitIcon,
  BackpackIcon,
  PersonIcon,
  GearIcon,
  DashboardIcon,
  ReloadIcon,
} from '@radix-ui/react-icons';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import ToolTip from './Tooltip';

const LeftSideNav = () => {
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
    <nav className="relative flex h-screen w-40 flex-col items-center gap-8 overflow-y-hidden bg-gray-800 px-4 py-6">
      <Link href="/dashboard">
        <DashboardIcon
          className="h-8 w-8 text-white transition-colors duration-200 hover:text-gray-400"
          aria-label="Dashboard"
        />
      </Link>

      <BackpackIcon
        className="h-8 w-8 text-white transition-colors duration-200 hover:text-gray-400"
        aria-label="Folders"
      />

      <LockClosedIcon
        className="h-8 w-8 text-white transition-colors duration-200 hover:text-gray-400"
        aria-label="Private Bookmarks"
      />

      <GearIcon
        className="h-8 w-8 text-white transition-colors duration-200 hover:text-gray-400"
        aria-label="Settings"
      />

      {/* Flex items that should be at the bottom of the nav */}
      <div
        className="absolute bottom-0 left-0 
    right-0 flex flex-row items-center justify-around px-6 py-8
  "
      >
        <ToolTip
          triggerContent={
            <PersonIcon
              className="h-8 w-8 text-white transition-colors duration-200 hover:text-gray-400"
              aria-label="Profile"
            />
          }
        >
          <p>Hello</p>
        </ToolTip>
        <ToolTip
          triggerContent={
            isLoading ? (
              <ReloadIcon className="mr-2 h-8 w-8 animate-spin text-white" />
            ) : (
              <ExitIcon
                className="h-8 w-8 cursor-pointer text-white transition-colors duration-200 hover:text-gray-400"
                aria-label="Log out"
                onClick={handleSignOut}
              />
            )
          }
        >
          Sign Out
        </ToolTip>
      </div>
    </nav>
  );
};

export default LeftSideNav;
