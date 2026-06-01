// app/page.tsx
'use client';

import React, { useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { 
  GET_PROJECTS, 
  GET_PROFILE, 
  GET_SOCIAL_LINKS,
  UPDATE_PROFILE,
  ADD_PROJECT,
  DELETE_PROJECT,
  ADD_SOCIAL_LINK,
  projectsVar,
  profileVar,
  socialLinksVar
} from '@/lib/apollo-client';
import { storage } from '@/lib/storage';
import { Layout } from '@/components/layout/Layout';
import { ProfileEditor } from '@/components/portfolio/ProfileEditor';
import { ProjectsGrid } from '@/components/portfolio/ProjectsGrid';
import { AddProjectForm } from '@/components/portfolio/AddProjectForm';
import { SocialLinks } from '@/components/portfolio/SocialLinks';
import { Button } from '@/components/ui/Button';
import { Project, Profile, SocialLink } from '@/types';

export default function Home() {
  // Queries
  const { data: projectsData } = useQuery(GET_PROJECTS);
  const { data: profileData } = useQuery(GET_PROFILE);
  const { data: socialLinksData } = useQuery(GET_SOCIAL_LINKS);

  // Mutations
  const [updateProfileMutation] = useMutation(UPDATE_PROFILE);
  const [addProjectMutation] = useMutation(ADD_PROJECT);
  const [deleteProjectMutation] = useMutation(DELETE_PROJECT);
  const [addSocialLinkMutation] = useMutation(ADD_SOCIAL_LINK);

  const projects = projectsData?.projects || [];
  const profile = profileData?.profile || { name: '', bio: '' };
  const socialLinks = socialLinksData?.socialLinks || [];

  // Sync with localStorage whenever data changes
  useEffect(() => {
    storage.saveProjects(projects);
  }, [projects]);

  useEffect(() => {
    storage.saveProfile(profile);
  }, [profile]);

  useEffect(() => {
    storage.saveSocialLinks(socialLinks);
  }, [socialLinks]);

  // Event Handlers
  const handleUpdateProfile = (name: string, bio: string) => {
    updateProfileMutation({ variables: { name, bio } });
    profileVar({ name, bio });
  };

  const handleAddProject = (projectData: { title: string; description: string; year: number }) => {
    const newProject: Project = {
      id: Date.now().toString(),
      ...projectData
    };
    addProjectMutation({ variables: newProject });
    projectsVar([...projects, newProject]);
  };

  const handleDeleteProject = (id: string) => {
    deleteProjectMutation({ variables: { id } });
    projectsVar(projects.filter((p: Project) => p.id !== id));
  };

  const handleClearPortfolio = () => {
    if (confirm('Are you sure you want to clear all projects? This action cannot be undone.')) {
      projectsVar([]);
      storage.saveProjects([]);
    }
  };

  const handleAddSocialLink = (title: string, url: string) => {
    const newLink: SocialLink = {
      id: Date.now().toString(),
      title,
      url
    };
    addSocialLinkMutation({ variables: newLink });
    socialLinksVar([...socialLinks, newLink]);
  };

  return (
    <Layout>
      <ProfileEditor 
        name={profile.name} 
        bio={profile.bio} 
        onUpdate={handleUpdateProfile}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Projects</h2>
            {projects.length > 0 && (
              <Button variant="danger" onClick={handleClearPortfolio}>
                Clear Portfolio
              </Button>
            )}
          </div>
          <AddProjectForm onAddProject={handleAddProject} />
          <ProjectsGrid projects={projects} onDeleteProject={handleDeleteProject} />
        </div>
        
        <div>
          <SocialLinks links={socialLinks} onAddLink={handleAddSocialLink} />
        </div>
      </div>
    </Layout>
  );
}