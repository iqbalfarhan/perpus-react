import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleFilter = <T extends Record<string, unknown>>(data: T, search: string): boolean => {
  const lowerSearch = search.toLowerCase();
  return Object.values(data).some((value) => typeof value === 'string' && value.toLowerCase().includes(lowerSearch));
};

export const getInitial = (text: string, limit: number = 2): string => {
  return text
    .split(' ')
    .filter((word) => word.length > 0)
    .map((word) => word[0].toUpperCase())
    .slice(0, limit)
    .join('');
};

export function generatePassword(length: number = 8): string {
  const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lower = 'abcdefghijklmnopqrstuvwxyz';
  const number = '0123456789';
  const symbol = '!@#$%^&';

  const allChars = upper + lower + number + symbol;

  let password = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * allChars.length);
    password += allChars[randomIndex];
  }

  return password;
}

export function copyToClipboard(text: string): Promise<void> {
  return navigator.clipboard.writeText(text);
}

export function flattenErrorMessages(obj: Record<string, string>): string {
  return Object.values(obj).join(' ');
}

export function strLimit(text: string, limit: number = 40, end: string = '...'): string {
  if (text.length <= limit) return text;
  return text.slice(0, limit - end.length) + end;
}
