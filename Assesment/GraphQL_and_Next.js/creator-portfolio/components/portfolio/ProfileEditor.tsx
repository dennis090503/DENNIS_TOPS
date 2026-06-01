// components/portfolio/ProfileEditor.tsx
'use client';

import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { TextArea } from '../ui/TextArea';

interface ProfileEditorProps {
  name: string;
  bio: string;
  onUpdate: (name: string, bio: string) => void;
}

export const ProfileEditor: React.FC<ProfileEditorProps> = ({ name, bio, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editedBio, setEditedBio] = useState(bio);

  const handleSave = () => {
    onUpdate(editedName, editedBio);
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold mb-2">{name}</h1>
            <p className="text-purple-100">{bio}</p>
          </div>
          <Button variant="secondary" onClick={() => setIsEditing(true)}>
            Edit Profile
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg mb-8 border border-gray-200">
      <h3 className="text-xl font-semibold mb-4">Edit Profile</h3>
      <div className="space-y-4">
        <Input
          label="Name"
          value={editedName}
          onChange={(e) => setEditedName(e.target.value)}
        />
        <TextArea
          label="Bio"
          value={editedBio}
          onChange={(e) => setEditedBio(e.target.value)}
        />
        <div className="flex gap-3">
          <Button onClick={handleSave}>Save Changes</Button>
          <Button variant="secondary" onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};