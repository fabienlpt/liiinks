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
  facebook: { label: string; url: string };
  instagram: { label: string; url: string };
  twitter: { label: string; url: string };
  behance: { label: string; url: string };
  linkedIn: { label: string; url: string };
  firstLink: { label: string; url: string };
  secondLink: { label: string; url: string };
  thirdLink: { label: string; url: string };
  fourthLink: { label: string; url: string };
  fifthLink: { label: string; url: string };
}
