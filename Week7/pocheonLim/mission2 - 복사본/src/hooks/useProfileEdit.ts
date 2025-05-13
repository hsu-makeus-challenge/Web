import { useState } from 'react';
import { User } from '../types/user';

type UserWithOptionalFields = Omit<User, 'bio' | 'avatar' | 'createdAt' | 'updatedAt'> & {
  bio?: string | null;
  avatar?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

export const useProfileEdit = (user: UserWithOptionalFields | null) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user?.name || '');
  const [editedBio, setEditedBio] = useState(user?.bio || '');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const resetEditForm = () => {
    setIsEditing(false);
    setEditedName(user?.name || '');
    setEditedBio(user?.bio || '');
    setPreviewUrl(null);
  };

  return {
    isEditing,
    setIsEditing,
    editedName,
    setEditedName,
    editedBio,
    setEditedBio,
    previewUrl,
    setPreviewUrl,
    handleImageChange,
    resetEditForm
  };
}; 