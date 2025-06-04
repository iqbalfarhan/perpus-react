import { NavFooter } from '@/components/nav-footer';
import NavMain from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { SharedData, type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Book, BookOpen, BookOpenText, FileQuestion, Flag, Folder, Gauge, HandCoins, LayoutGrid, User, Users } from 'lucide-react';
import AppLogo from './app-logo';

const settingNavItems: NavItem[] = [
  {
    title: 'Kategori buku',
    href: '/kategori',
    icon: LayoutGrid,
  },
  {
    title: 'List penerbit',
    href: '/penerbit',
    icon: User,
  },
  {
    title: 'Bahasa',
    href: '/bahasa',
    icon: Flag,
  },
  {
    title: 'Rak buku',
    href: '/rak',
    icon: BookOpenText,
  },
  {
    title: 'Akun pengguna',
    href: '/user',
    icon: Users,
  },
];

const footerNavItems: NavItem[] = [
  {
    title: 'Repository',
    href: 'https://github.com/laravel/react-starter-kit',
    icon: Folder,
  },
  {
    title: 'Documentation',
    href: 'https://laravel.com/docs/starter-kits#react',
    icon: BookOpen,
  },
];

const bantuanNavItems: NavItem[] = [
  {
    title: 'Tanya AI',
    href: '/tanyaai',
    icon: FileQuestion,
  },
];

export function AppSidebar() {
  const { pinjaman_count } = usePage<SharedData>().props;
  const mainNavItems: NavItem[] = [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: Gauge,
    },
    {
      title: 'Daftar buku',
      href: '/buku',
      icon: Book,
    },
    {
      title: 'Peminjaman',
      href: '/pinjam',
      badge: pinjaman_count > 0 ? pinjaman_count : undefined,
      icon: HandCoins,
    },
  ];
  return (
    <Sidebar collapsible="icon" variant="floating" className="print:hidden">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard" prefetch>
                <AppLogo />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="space-y-6">
        <NavMain items={mainNavItems} />
        <NavMain items={settingNavItems} label="Pengaturan" />
        <NavMain items={bantuanNavItems} label="Bantuan" />
      </SidebarContent>

      <SidebarFooter>
        <NavFooter items={footerNavItems} className="mt-auto" />
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
