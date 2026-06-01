// components/portfolio/SocialLinks.tsx
'use client';

import React, { useState } from 'react';
import { SocialLink } from '@/types';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface SocialLinksProps {
  links: SocialLink[];
  onAddLink: (title: string, url: string) => void;
}

export const SocialLinks: React.FC<SocialLinksProps> = ({ links, onAddLink }) => {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !url.trim()) return;
    onAddLink(title, url);
    setTitle('');
    setUrl('');
    setShowForm(false);
  };

  const validateUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Social Links</h3>
        <Button variant="secondary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Add Link'}
        </Button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="space-y-3">
            <Input
              label="Platform"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., GitHub, Twitter"
              required
            />
            <Input
              label="URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://..."
              required
            />
            <Button type="submit">Save Link</Button>
          </div>
        </form>
      )}

      <div className="space-y-3">
        {links.map((link) => (
          <a
            key={link.id}
            href={validateUrl(link.url) ? link.url : '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <span className="font-medium">{link.title}</span>
            <span className="text-blue-600 text-sm truncate max-w-md">
              {link.url}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};