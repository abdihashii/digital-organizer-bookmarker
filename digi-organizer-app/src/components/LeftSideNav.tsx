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
  Moon,
  Sun,
} from 'lucide-react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
// import ToolTip from './Tooltip';
import { useTheme } from 'next-themes';
import type { ProfileType } from '@/types/BookmarkType';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const LeftSideNav = ({ profile }: { profile: ProfileType }) => {
  const supabase = createClientComponentClient();
  const { theme, setTheme } = useTheme();
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
    <nav className="relative flex h-screen w-48 flex-col items-center gap-8 overflow-y-hidden bg-gray-800 px-4 py-6 pt-12">
      {/* <ToolTip
        triggerContent={
          <Link href="/bookmarks">
            <LayoutDashboard
              className="h-8 w-8 text-white transition-colors duration-200 hover:text-gray-400"
              aria-label="Bookmarks Dashboard"
            />
          </Link>
        }
        side="right"
        sideOffset={16}
      >
        Dashboard
      </ToolTip> */}

      <Link
        href="/bookmarks"
        className="group flex w-full cursor-pointer flex-row items-center gap-4 px-2 text-white"
      >
        <LayoutDashboard
          className="h-8 w-8 text-white transition-colors duration-200 group-hover:text-gray-400"
          aria-label="Bookmarks Dashboard"
        />
        <p className="transition-colors duration-200 group-hover:text-gray-400">
          Bookmarks
        </p>
      </Link>

      {/* <ToolTip
        triggerContent={
          <Shapes
            className="h-8 w-8 text-white transition-colors duration-200 hover:text-gray-400"
            aria-label="Bookmark Collections"
          />
        }
        side="right"
        sideOffset={16}
      >
        Bookmark Collections
      </ToolTip> */}

      <Link
        href="/folders"
        className="group flex w-full cursor-pointer flex-row items-center gap-4 px-2 text-white"
      >
        <Shapes
          className="h-8 w-8 text-white transition-colors duration-200 group-hover:text-gray-400"
          aria-label="Bookmark Collections"
        />
        <p className="transition-colors duration-200 group-hover:text-gray-400">
          Collections
        </p>
      </Link>

      {/* <ToolTip
        triggerContent={
          <Link href="/bookmarks/private-bookmarks">
            <FolderLock
              className="h-8 w-8 text-white transition-colors duration-200 hover:text-gray-400"
              aria-label="Private Bookmarks"
            />
          </Link>
        }
        side="right"
        sideOffset={16}
      >
        Private Bookmarks
      </ToolTip> */}

      <Link
        href="#"
        className="group flex w-full cursor-pointer flex-row items-center gap-4 px-2 text-white"
      >
        <FolderLock
          className="h-8 w-8 text-white transition-colors duration-200 group-hover:text-gray-400"
          aria-label="Private Bookmarks"
        />

        <p className="transition-colors duration-200 group-hover:text-gray-400">
          Private
        </p>
      </Link>

      {theme === 'light' ? (
        // <ToolTip
        //   triggerContent={
        //     <Sun
        //       className="h-8 w-8 rotate-0 scale-100 cursor-pointer text-white transition-all dark:-rotate-90 dark:scale-0"
        //       onClick={() => setTheme('dark')}
        //     />
        //   }
        //   side="right"
        //   sideOffset={16}
        // >
        //   Switch to Dark Mode
        // </ToolTip>
        <div
          className="group flex w-full cursor-pointer flex-row items-center gap-4 px-2 text-white"
          onClick={() => setTheme('dark')}
        >
          <Sun className="h-8 w-8 rotate-0 scale-100 cursor-pointer text-white transition-all dark:-rotate-90 dark:scale-0" />
          <p>Light Mode</p>
        </div>
      ) : (
        // <ToolTip
        //   triggerContent={
        //     <Moon
        //       className="h-8 w-8 rotate-90 scale-0 cursor-pointer text-white transition-all dark:rotate-0 dark:scale-100"
        //       onClick={() => setTheme('light')}
        //     />
        //   }
        //   side="right"
        //   sideOffset={16}
        // >
        //   Switch to Light Mode
        // </ToolTip>
        <div
          className="group flex w-full cursor-pointer flex-row items-center gap-4 px-2 text-white"
          onClick={() => setTheme('light')}
        >
          <Moon className="h-8 w-8 rotate-90 scale-0 cursor-pointer text-white transition-all group-hover:text-gray-400 dark:rotate-0 dark:scale-100" />
          <p className="transition-colors duration-200 group-hover:text-gray-400">
            Dark Mode
          </p>
        </div>
      )}

      {/* Flex items that should be at the bottom of the nav */}
      <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-8 border-t-2 border-t-gray-500 px-6 py-8">
        {/* User Info */}
        <div className="group flex flex-row items-center gap-4 transition-colors duration-200">
          <Avatar className="h-8 w-8">
            <AvatarImage src={profile.avatar_src || ''} />
            <AvatarFallback>
              {(profile.first_name?.charAt(0).toUpperCase() || '') +
                (profile.last_name?.charAt(0).toUpperCase() || '')}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col gap-1 overflow-auto">
            <p className="text-xs font-semibold text-white transition-colors duration-200 group-hover:text-gray-400">
              {profile.username}
            </p>
            <p className="text-xs text-gray-300 transition-colors duration-200 group-hover:text-gray-400">
              {profile.email}
            </p>
          </div>
        </div>

        {/* Settings */}
        <Link
          href="/settings"
          className="group flex cursor-pointer flex-row items-center gap-4 text-white"
        >
          <Settings
            className="h-8 w-8 transition-colors duration-200 group-hover:text-gray-400"
            aria-label="Settings"
          />
          <p className="transition-colors duration-200 group-hover:text-gray-400">
            Settings
          </p>
        </Link>

        {/* Log Out */}
        <div
          className="group flex cursor-pointer flex-row items-center gap-4 text-white "
          onClick={handleSignOut}
        >
          <LogOut
            className="h-8 w-8 transition-colors duration-200 group-hover:text-gray-400"
            aria-label="Log out"
          />
          <p className="transition-colors duration-200 group-hover:text-gray-400">
            {isLoading ? <Loader2 className="h-4 w-4" /> : 'Log out'}
          </p>
        </div>
      </div>
    </nav>
  );
};

export default LeftSideNav;
