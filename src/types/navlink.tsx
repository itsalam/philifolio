import { LucideProps } from "lucide-react";

export type Navlink = {
  href: string;
  label: string;
  icon?: React.ReactNode | LucideProps | any;
};
