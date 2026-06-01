// components/portfolio/ProjectsGrid.tsx
'use client';

import React from 'react';
import { Project } from '@/types';
import { ProjectCard } from './ProjectCard';

interface ProjectsGridProps {
  projects: Project[];
  onDeleteProject?: (id: string) => void;
}

export const ProjectsGrid: React.FC<ProjectsGridProps> = ({ projects, onDeleteProject }) => {
  if (projects.length === 0) {
    return (
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-12 text-center border-2 border-dashed border-blue-200">
        <div className="text-6xl mb-4">🎨</div>
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">
          You haven't added any projects to your portfolio yet!
        </h3>
        <p className="text-gray-600">
          Get started by adding your first project using the form above.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectCard 
          key={project.id} 
          project={project} 
          onDelete={onDeleteProject}
        />
      ))}
    </div>
  );
};