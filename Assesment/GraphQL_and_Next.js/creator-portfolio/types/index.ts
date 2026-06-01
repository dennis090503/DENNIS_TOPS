// types/index.ts
export interface Project {
  id: string;
  title: string;
  description: string;
  year: number;
}

export interface SocialLink {
  id: string;
  title: string;
  url: string;
}

export interface Profile {
  name: string;
  bio: string;
}