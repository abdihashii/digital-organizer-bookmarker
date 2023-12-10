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
import { Loader2 } from 'lucide-react';

const UserSettingsForm = ({ profile }: { profile: ProfileType }) => {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [updatedProfile, setUpdatedProfile] = useState<ProfileType>(profile);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUpdatedProfile((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsImageUploading(true);

    const { files } = e.target;

    if (files) {
      const file = files[0];

      // check if file is an image
      if (!file.type.includes('image')) {
        alert('File must be an image');
        setIsImageUploading(false);
        return;
      }

      // check if file upload is greater than 5MB
      if (file.size >= 5000000) {
        alert('File size must be less than 5MB');
        setIsImageUploading(false);
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
        setIsImageUploading(false);
        return;
      }

      alert(cloudinary_image_secure_url);

      setUpdatedProfile((prevState) => ({
        ...prevState,
        avatar_src: cloudinary_image_secure_url,
      }));

      setIsImageUploading(false);
    }
  };

  const handleDeleteImage = async () => {
    setIsImageUploading(true);

    setUpdatedProfile((prevState) => ({
      ...prevState,
      avatar_src: null,
    }));

    setIsImageUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true);

    e.preventDefault();

    const updated_at = new Date().toISOString();

    const { error } = await supabase
      .from('profiles')
      .update({
        first_name: updatedProfile.first_name,
        last_name: updatedProfile.last_name,
        username: updatedProfile.username,
        email: updatedProfile.email,
        avatar_src: updatedProfile.avatar_src,
        updated_at,
      })
      .eq('id', updatedProfile.id);

    if (error) {
      alert(JSON.stringify(error, null, 2));
    }

    setIsSubmitting(false);

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
        {/* Avatar Image */}
        <div className="w-fit">
          {!isImageUploading ? (
            updatedProfile.avatar_src ? (
              <Image
                src={updatedProfile.avatar_src || ''}
                alt="User Avatar"
                width={100}
                height={100}
                className="rounded-full transition-opacity duration-200 group-hover:opacity-75"
              />
            ) : (
              <Image
                src={'/user.png'}
                alt="User Avatar"
                width={100}
                height={100}
                className="rounded-full transition-opacity duration-200 group-hover:opacity-75"
              />
            )
          ) : (
            <div className="h-20 w-20 rounded-full border-4 border-gray-800">
              <div className="flex h-full items-center justify-center text-center font-medium text-white">
                <Loader2 size={28} className="animate-spin text-white" />
              </div>
            </div>
          )}
        </div>

        {/* Avatar info */}
        <div className="flex flex-col gap-0.5">
          <p className="font-semibold">Profile picture</p>
          <p className="text-xs">PNG, JPEG under 15MB</p>
        </div>

        {/* Avatar actions */}
        <div className="ml-auto flex flex-row gap-2">
          <Input type="file" className="text-xs" onChange={handleImageChange} />

          <ToolTip
            triggerContent={
              <div>
                <Button
                  type="button"
                  className="text-xs"
                  variant="secondary"
                  onClick={handleDeleteImage}
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

      {/* User Info stuff */}
      <div className="flex w-full flex-row gap-4">
        <div className="flex w-1/2 flex-col gap-1">
          <label htmlFor="first_name">First Name</label>
          <Input
            id="first_name"
            type="text"
            name="first_name"
            value={updatedProfile.first_name || ''}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex w-1/2 flex-col gap-1">
          <label htmlFor="last_name">Last Name</label>
          <Input
            id="last_name"
            type="text"
            name="last_name"
            value={updatedProfile.last_name || ''}
            onChange={handleInputChange}
          />
        </div>
      </div>

      {/* Username */}
      <div className="flex flex-col gap-1">
        <label htmlFor="username">Username</label>
        <Input
          id="username"
          type="text"
          name="username"
          value={updatedProfile.username || ''}
          onChange={handleInputChange}
        />
      </div>

      {/* Email */}
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

      {/* <pre className="text-xs overflow-auto">
        <code className="rounded-md p-4">
          {JSON.stringify(updatedProfile, null, 2)}
        </code>
      </pre> */}

      {/* Submit button */}
      <Button type="submit" className="btn btn-primary">
        {isSubmitting ? (
          <Loader2 size={20} className="animate-spin text-black" />
        ) : (
          'Save Changes'
        )}
      </Button>
    </form>
  );
};

export default UserSettingsForm;
