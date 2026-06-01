// lib/apollo-client.ts
import { ApolloClient, InMemoryCache, gql, makeVar } from '@apollo/client';
import { storage } from './storage';

// Reactive variables for local state management
export const projectsVar = makeVar(storage.getProjects());
export const profileVar = makeVar(storage.getProfile());
export const socialLinksVar = makeVar(storage.getSocialLinks());

export const client = new ApolloClient({
  uri: 'http://localhost:3000/api/graphql', // For real API, but we'll use local state
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          projects: {
            read() {
              return projectsVar();
            }
          },
          profile: {
            read() {
              return profileVar();
            }
          },
          socialLinks: {
            read() {
              return socialLinksVar();
            }
          }
        }
      }
    }
  })
});

// GraphQL Queries and Mutations
export const GET_PROJECTS = gql`
  query GetProjects {
    projects @client
  }
`;

export const GET_PROFILE = gql`
  query GetProfile {
    profile @client {
      name
      bio
    }
  }
`;

export const GET_SOCIAL_LINKS = gql`
  query GetSocialLinks {
    socialLinks @client {
      id
      title
      url
    }
  }
`;

export const UPDATE_PROFILE = gql`
  mutation UpdateProfile($name: String!, $bio: String!) {
    updateProfile(name: $name, bio: $bio) @client
  }
`;

export const ADD_PROJECT = gql`
  mutation AddProject($id: ID!, $title: String!, $description: String!, $year: Int!) {
    addProject(id: $id, title: $title, description: $description, year: $year) @client
  }
`;

export const DELETE_PROJECT = gql`
  mutation DeleteProject($id: ID!) {
    deleteProject(id: $id) @client
  }
`;

export const ADD_SOCIAL_LINK = gql`
  mutation AddSocialLink($id: ID!, $title: String!, $url: String!) {
    addSocialLink(id: $id, title: $title, url: $url) @client
  }
`;