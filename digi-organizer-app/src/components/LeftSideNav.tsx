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
import ToolTip from './Tooltip';
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
      <ToolTip
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
      </ToolTip>

      <ToolTip
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
      </ToolTip>

      <ToolTip
        triggerContent={
          <Link href="/dashboard/private-bookmarks">
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
      </ToolTip>

      {theme === 'light' ? (
        <ToolTip
          triggerContent={
            <Sun
              className="h-8 w-8 rotate-0 scale-100 cursor-pointer text-white transition-all dark:-rotate-90 dark:scale-0"
              onClick={() => setTheme('dark')}
            />
          }
          side="right"
          sideOffset={16}
        >
          Switch to Dark Mode
        </ToolTip>
      ) : (
        <ToolTip
          triggerContent={
            <Moon
              className="h-8 w-8 rotate-90 scale-0 cursor-pointer text-white transition-all dark:rotate-0 dark:scale-100"
              onClick={() => setTheme('light')}
            />
          }
          side="right"
          sideOffset={16}
        >
          Switch to Light Mode
        </ToolTip>
      )}

      {/* Flex items that should be at the bottom of the nav */}
      <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-8 border border-t-2 border-t-gray-500 px-6 py-8">
        <div className="group flex flex-row items-center gap-4 transition-colors duration-200">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={profile.avatar_src || 'https://github.com/shadcn.png'}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div className="flex flex-col gap-1">
            <p className="text-xs font-semibold text-white transition-colors duration-200 group-hover:text-gray-400">
              {profile.first_name}
            </p>
            <p className="text-xs text-gray-300 transition-colors duration-200 group-hover:text-gray-400">
              {profile.email}
            </p>
          </div>
        </div>

        <Link
          href="/settings"
          className="group flex flex-row items-center gap-4 cursor-pointer"
        >
          <Settings
            className="h-8 w-8 text-white group-hover:text-gray-400 transition-colors duration-200"
            aria-label="Settings"
          />
          <p className="group-hover:text-gray-400 transition-colors duration-200">
            Settings
          </p>
        </Link>

        <div
          className="group flex cursor-pointer flex-row items-center gap-4"
          onClick={handleSignOut}
        >
          <LogOut
            className="h-8 w-8 text-white transition-colors duration-200 group-hover:text-gray-400"
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
