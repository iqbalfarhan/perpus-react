import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
  user: User;
}

export interface BreadcrumbItem {
  title: string;
  href: string;
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

export interface NavItem {
  title: string;
  href: string;
  badge?: string | number;
  icon?: LucideIcon | null;
  isActive?: boolean;
}

export interface SharedData {
  name: string;
  pinjaman_count: number;
  quote: { message: string; author: string };
  auth: Auth;
  ziggy: Config & { location: string };
  sidebarOpen: boolean;
  [key: string]: unknown;
}

export type User = {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  email_verified_at: string | null;
  role: string;
  created_at: string;
  updated_at: string;
  active: boolean;
  [key: string]: unknown; // This allows for additional properties...
};

export type Kategori = {
  id: number;
  name: string;
  description: string;
  bukus_count: number;
  books: Book[];
};

export type Bahasa = {
  id: number;
  name: string;
  flag: string;
};

export type Penerbit = {
  id: number;
  name: string;
  address: string;
  logo: string;
  image?: string;
};

export type Rak = {
  id: number;
  name: string;
  location: string;
  capacity: number;
  kategori?: Kategori;
};

export type Buku = {
  id: number;
  title: string;
  cover: string;
  synopsis: sting;
  author: string;
  isbn: string;
  page: number;
  stock: number;
  penerbit?: Penerbit | null;
  kategori?: Kategori | null;
  rak?: Rak | null;
  bahasa?: Bahasa | null;
  inputer?: User | null;
  thumbnail: string;
};

export type Pinjam = {
  id: number;
  code: string;
  user: User;
  pic: User;
  loan_date: string;
  due_date: string;
  late: boolean;
  fine: number;
  note: string;
  returned: boolean;
  returned_at: string;
  status: string;
  bukus?: (Buku & {
    pivot: PinjamItem;
  })[];
};

export type PinjamItem = {
  id: number;
  buku: Buku;
  qty: number;
  checked: boolean;
};
