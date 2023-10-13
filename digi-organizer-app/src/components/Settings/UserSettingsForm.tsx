'use client';

import { ProfileType } from '@/types/BookmarkType';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import ToolTip from '../Tooltip';
import { blobToBase64 } from '@/lib/utils';

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

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files) {
      const file = files[0];

      // check if file is an image
      if (!file.type.includes('image')) {
        alert('File must be an image');
        return;
      }

      // check if file upload is greater than 5MB
      if (file.size >= 5000000) {
        alert('File size must be less than 5MB');
        return;
      }

      // convert from blob to base64
      const base64 = await blobToBase64(file);

      const res = await fetch(`/api/upload-image`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image_base64: base64 }),
      });

      const { cloudinary_image_secure_url, error } = await res.json();

      if (error) {
        console.error(error);
        return;
      }

      alert(cloudinary_image_secure_url);
    }
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

      {/* User Avatar stuff */}
      <div className="flex flex-row items-center gap-4">
        <div className="w-fit">
          {updatedProfile.avatar_src ? (
            <Image
              src={updatedProfile.avatar_src || ''}
              alt="User Avatar"
              width={100}
              height={100}
              className="rounded-full transition-opacity duration-200 group-hover:opacity-75"
            />
          ) : (
            <div className="h-20 w-20 rounded-full border-4 border-gray-800">
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
          <Input type="file" className="text-xs" onChange={handleImageChange} />

          <ToolTip
            triggerContent={
              <div>
                <Button
                  type="button"
                  className="text-xs"
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
