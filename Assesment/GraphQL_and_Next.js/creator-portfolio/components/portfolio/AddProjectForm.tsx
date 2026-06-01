// components/portfolio/AddProjectForm.tsx
'use client';

import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { TextArea } from '../ui/TextArea';

interface AddProjectFormProps {
  onAddProject: (project: { title: string; description: string; year: number }) => void;
}

export const AddProjectForm: React.FC<AddProjectFormProps> = ({ onAddProject }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [year, setYear] = useState(new Date().getFullYear());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;
    
    onAddProject({ title, description, year });
    setTitle('');
    setDescription('');
    setYear(new Date().getFullYear());
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 rounded-xl p-6 mb-8">
      <h3 className="text-lg font-semibold mb-4">Add New Project</h3>
      <div className="space-y-4">
        <Input
          label="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter project title"
          required
        />
        <TextArea
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your project..."
          required
        />
        <Input
          label="Year"
          type="number"
          value={year}
          onChange={(e) => setYear(parseInt(e.target.value))}
          placeholder="2024"
          required
        />
        <Button type="submit" variant="primary">Add Project</Button>
      </div>
    </form>
  );
};