// components/portfolio/ProjectCard.tsx
import React from 'react';
import { Project } from '@/types';
import { Button } from '../ui/Button';

interface ProjectCardProps {
  project: Project;
  onDelete?: (id: string) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onDelete }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-100">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-semibold text-gray-800">{project.title}</h3>
        <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
          {project.year}
        </span>
      </div>
      <p className="text-gray-600 leading-relaxed">{project.description}</p>
      {onDelete && (
        <Button 
          variant="danger" 
          onClick={() => onDelete(project.id)}
          className="mt-4 text-sm"
        >
          Delete
        </Button>
      )}
    </div>
  );
};