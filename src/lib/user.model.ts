export interface User {
  id: string;
  username: string;
  email: string;
  bio: string;
  mainColor: string;
  backgroundGradient: string;
  fontChoice: string;
  avatar: string;
  socialMedias: Array<{ label: string; url: string }>;
  links: Array<{ label: string; url: string }>;
}
