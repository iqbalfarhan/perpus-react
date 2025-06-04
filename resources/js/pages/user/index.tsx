import Container from '@/components/container';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Table, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { handleFilter } from '@/lib/utils';
import { BreadcrumbItem, User } from '@/types';
import { Head, router } from '@inertiajs/react';
import { Edit, Key, Plus, Trash2 } from 'lucide-react';
import { FC, useState } from 'react';
import { toast } from 'sonner';
import ConfirmDelete from './components/confirm-delete';
import CreateUser from './components/create-user';
import EditUser from './components/edit-user';
import ResetPassword from './components/reset-password';

type UserIndexProps = {
  users: User[];
};

const UserIndex: FC<UserIndexProps> = ({ users }) => {
  const [search, setSearch] = useState('');

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Pengaturan',
      href: '',
    },
    {
      title: 'Akun pengguna',
      href: route('user.index'),
    },
  ];

  const handleUpdateActive = (value: boolean, user: User) => {
    router.put(
      route('user.update', user.id),
      {
        active: value,
      },
      {
        preserveScroll: true,
        onSuccess: () => {
          toast.success(`User ${user.name} berhasil diupdate`);
        },
      },
    );
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Akun pengguna" />
      <Container title="Akun pengguna" description="Menampilkan akun pengguna yang aktif">
        <div className="flex items-center justify-between gap-4">
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." />
          <CreateUser>
            <Button>
              <Plus />
              Buat user baru
            </Button>
          </CreateUser>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Avatar</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Alamat email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Active</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          {users
            .filter((data) => handleFilter(data, search))
            .map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>
                  <Avatar>
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name}</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Switch
                    defaultChecked={user.active}
                    onCheckedChange={(value) => handleUpdateActive(value, user)}
                    disabled={user.role === 'admin'}
                  />
                </TableCell>
                <TableCell>
                  <ResetPassword user={user}>
                    <Button variant="ghost" size={'icon'}>
                      <Key />
                    </Button>
                  </ResetPassword>
                  <EditUser user={user}>
                    <Button variant="ghost" size={'icon'}>
                      <Edit />
                    </Button>
                  </EditUser>
                  <ConfirmDelete user={user}>
                    <Button variant="ghost" size={'icon'}>
                      <Trash2 />
                    </Button>
                  </ConfirmDelete>
                </TableCell>
              </TableRow>
            ))}
        </Table>
      </Container>
    </AppLayout>
  );
};

export default UserIndex;
