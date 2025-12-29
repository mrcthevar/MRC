export interface Project {
  videoUrl: string; // URL for the video (YouTube embed)
}

export interface Stat {
  id: number;
  value: number;
  suffix: string;
  label: string;
}

export interface NavItem {
  label: string;
  href: string;
}