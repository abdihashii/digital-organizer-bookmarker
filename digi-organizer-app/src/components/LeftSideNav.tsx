'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FolderLock,
  LayoutDashboard,
  Loader2,
  LogOut,
  Settings,
  Shapes,
  User as UserIcon,
} from 'lucide-react';
import {
  User,
  createClientComponentClient,
} from '@supabase/auth-helpers-nextjs';
import ToolTip from './Tooltip';

const LeftSideNav = ({ user }: { user: User }) => {
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
      <ToolTip
        triggerContent={
          <Link href="/dashboard">
            <LayoutDashboard
              className="h-8 w-8 text-white transition-colors duration-200 hover:text-gray-400"
              aria-label="Dashboard"
            />
          </Link>
        }
        side="right"
        sideOffset={16}
      >
        Dashboard
      </ToolTip>

      <Shapes
        className="h-8 w-8 text-white transition-colors duration-200 hover:text-gray-400"
        aria-label="Folders"
      />

      <FolderLock
        className="h-8 w-8 text-white transition-colors duration-200 hover:text-gray-400"
        aria-label="Private Bookmarks"
      />

      <Settings
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
            <UserIcon
              className="h-8 w-8 text-white transition-colors duration-200 hover:text-gray-400"
              aria-label="Profile"
            />
          }
        >
          {user.email}
        </ToolTip>
        <ToolTip
          triggerContent={
            isLoading ? (
              <Loader2 className="mr-2 h-8 w-8 animate-spin text-white" />
            ) : (
              <LogOut
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
