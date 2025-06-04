import { Kategori, User } from '.';

export type Optional<T> = {
  [K in keyof T]?: T[K];
};
export type StoreUserPayload = Optional<User> & {
  password: string;
};

export type StoreRakPayload = {
  name: string;
  location: string;
  capacity: number;
  kategori_id?: Kategori['id'] | null;
};

export type UpdateRakPayload = {
  name: string;
  location: string;
  capacity: number;
  kategori_id?: Kategori['id'] | null;
};

export type StoreBukuPayload = {
  title: string;
  synopsis: string;
  author: string;
  isbn: string;
  page: number;
  stock: number;
  penerbit_id?: number | null;
  kategori_id?: number | null;
  rak_id?: number | null;
  bahasa_id?: number | null;
  created_by?: number | null;
};

export type UpdateBukuPayload = {
  title: string;
  synopsis: string;
  author: string;
  isbn: string;
  page: number;
  stock: number;
  penerbit_id?: number | null;
  kategori_id?: number | null;
  rak_id?: number | null;
  bahasa_id?: number | null;
  created_by?: number | null;
};
