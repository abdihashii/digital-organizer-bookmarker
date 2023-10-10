'use client';

import { ProfileType } from '@/types/BookmarkType';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import ToolTip from '../Tooltip';

const UserSettingsForm = ({ profile }: { profile: ProfileType }) => {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [updatedProfile, setUpdatedProfile] = useState<ProfileType>(profile);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUpdatedProfile((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updated_at = new Date().toISOString();

    const { data, error } = await supabase
      .from('profiles')
      .update({
        first_name: updatedProfile.first_name,
        last_name: updatedProfile.last_name,
        username: updatedProfile.username,
        email: updatedProfile.email,
        updated_at,
      })
      .eq('id', updatedProfile.id)
      .select();

    if (error) {
      alert(JSON.stringify(error, null, 2));
    }

    router.refresh();
  };

  return (
    <form
      className="flex flex-col gap-8"
      aria-labelledby="user-settings-heading"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-bold">User Settings</h2>

      <div className="flex flex-col gap-2">
        <div className="group w-fit cursor-pointer">
          {updatedProfile.avatar_src ? (
            <Image
              src={updatedProfile.avatar_src || ''}
              alt="User Avatar"
              width={100}
              height={100}
              className="rounded-full transition-opacity duration-200 group-hover:opacity-75"
            />
          ) : (
            <div className="h-20 w-20 rounded-full border-4 border-gray-800 transition-opacity duration-200 group-hover:border-gray-600">
              <div className="flex h-full items-center justify-center text-center font-medium text-white">
                {updatedProfile.first_name[0]}
                {updatedProfile.last_name[0]}
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-0.5">
          <p className="font-semibold">Profile picture</p>
          <p className="text-xs">PNG, JPEG under 15MB</p>
        </div>

        <div className="ml-auto flex flex-row gap-2">
          <ToolTip
            triggerContent={
              <div>
                <Button type="button" className="h-8 text-xs" disabled>
                  Upload new picture
                </Button>
              </div>
            }
          >
            Not implemented yet.
          </ToolTip>

          <ToolTip
            triggerContent={
              <div>
                <Button
                  type="button"
                  className="h-8 text-xs"
                  variant="secondary"
                  disabled
                >
                  Delete
                </Button>
              </div>
            }
          >
            Not implemented yet.
          </ToolTip>
        </div>
      </div>

      <div className="flex w-full flex-row gap-4">
        <div className="flex w-1/2 flex-col gap-1">
          <label htmlFor="first_name">First Name</label>
          <Input
            id="first_name"
            type="text"
            name="first_name"
            value={updatedProfile.first_name}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex w-1/2 flex-col gap-1">
          <label htmlFor="last_name">Last Name</label>
          <Input
            id="last_name"
            type="text"
            name="last_name"
            value={updatedProfile.last_name}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="email">Email</label>
        <Input
          id="email"
          type="text"
          name="email"
          value={updatedProfile.email}
          onChange={handleInputChange}
        />
      </div>

      <pre className="text-sm text-white">
        {JSON.stringify(updatedProfile, null, 2)}
      </pre>

      <Button type="submit" className="btn btn-primary">
        Save Changes
      </Button>
    </form>
  );
};

export default UserSettingsForm;
