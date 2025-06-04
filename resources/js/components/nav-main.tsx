import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { FC } from 'react';

type NavMainProps = {
  items?: NavItem[];
  label?: string;
};
const NavMain: FC<NavMainProps> = ({ items = [], label = 'Platform' }) => {
  const page = usePage();
  return (
    <SidebarGroup className="px-2 py-0">
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild isActive={item.href === page.url} tooltip={{ children: item.title }}>
              <Link href={item.href} prefetch>
                {item.icon && <item.icon />}
                <span>{item.title}</span>
                {item.badge && <SidebarMenuBadge>{item.badge ?? 0}</SidebarMenuBadge>}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default NavMain;
