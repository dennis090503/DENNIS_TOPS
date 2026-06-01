// lib/storage.ts
export const storage = {
  getProjects: (): Project[] => {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem('portfolio-projects');
    return stored ? JSON.parse(stored) : [];
  },
  
  saveProjects: (projects: Project[]) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('portfolio-projects', JSON.stringify(projects));
  },
  
  getProfile: () => {
    if (typeof window === 'undefined') return { name: '', bio: '' };
    const stored = localStorage.getItem('portfolio-profile');
    return stored ? JSON.parse(stored) : { name: 'Creative Creator', bio: 'Building amazing digital experiences' };
  },
  
  saveProfile: (profile: Profile) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('portfolio-profile', JSON.stringify(profile));
  },
  
  getSocialLinks: (): SocialLink[] => {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem('portfolio-links');
    return stored ? JSON.parse(stored) : [
      { id: '1', title: 'GitHub', url: 'https://github.com' },
      { id: '2', title: 'Twitter', url: 'https://twitter.com' }
    ];
  },
  
  saveSocialLinks: (links: SocialLink[]) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('portfolio-links', JSON.stringify(links));
  }
};