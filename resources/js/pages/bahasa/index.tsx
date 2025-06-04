import Container from '@/components/container';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { handleFilter } from '@/lib/utils';
import { Bahasa, BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Edit, Plus, Trash2 } from 'lucide-react';
import { FC, useState } from 'react';
import ConfirmDelete from './components/confirm-delete';
import CreateBahasa from './components/create-bahasa';
import EditBahasa from './components/edit-bahasa';

type BahasaIndexProps = {
  bahasas: Bahasa[];
};

const BahasaIndex: FC<BahasaIndexProps> = ({ bahasas }) => {
  const [search, setSearch] = useState('');

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Pengaturan',
      href: '',
    },
    {
      title: 'Bahasa',
      href: route('bahasa.index'),
    },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Bahasa" />
      <Container title="Bahasa" description="Menampilkan semua bahasa">
        <div className="flex items-center justify-between gap-4">
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." />
          <CreateBahasa>
            <Button>
              <Plus />
              Buat bahasa baru
            </Button>
          </CreateBahasa>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Bendera</TableHead>
              <TableHead>Bahasa negara</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          {bahasas
            .filter((data) => handleFilter(data, search))
            .map((bahasa) => (
              <TableRow key={bahasa.id}>
                <TableCell>{bahasa.id}</TableCell>
                <TableCell>
                  <Avatar>
                    <AvatarFallback>{bahasa.flag}</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell>{bahasa.name}</TableCell>
                <TableCell>
                  <EditBahasa bahasa={bahasa}>
                    <Button variant="ghost" size={'icon'}>
                      <Edit />
                    </Button>
                  </EditBahasa>
                  <ConfirmDelete bahasa={bahasa}>
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

export default BahasaIndex;
