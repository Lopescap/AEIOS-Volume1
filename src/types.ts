export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
  description?: string;
  icon?: string;
}

export enum ButtonVariant {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  GHOST = 'ghost',
  DARK = 'dark'
}

export interface Metric {
  label: string;
  value: string;
  description: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: React.ElementType;
}