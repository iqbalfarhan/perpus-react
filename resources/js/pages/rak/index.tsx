import Container from '@/components/container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { handleFilter } from '@/lib/utils';
import { BreadcrumbItem, Kategori, Rak } from '@/types';
import { Head } from '@inertiajs/react';
import { Edit, Plus, Trash2 } from 'lucide-react';
import { FC, useState } from 'react';
import ConfirmDelete from './components/confirm-delete';
import CreateRak from './components/create-rak';
import EditRak from './components/edit-rak';

type RakIndexProps = {
  raks: Rak[];
  kategoris: Kategori[];
};

const RakIndex: FC<RakIndexProps> = ({ raks, kategoris }) => {
  const [search, setSearch] = useState('');

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Pengaturan',
      href: '',
    },
    {
      title: 'Rak buku',
      href: route('rak.index'),
    },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Rak buku" />
      <Container title="Rak buku" description="Menampilkan semua rak">
        <div className="flex items-center justify-between gap-4">
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." />
          <CreateRak kategoris={kategoris}>
            <Button>
              <Plus />
              Buat rak baru
            </Button>
          </CreateRak>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nama Rak</TableHead>
              <TableHead>Lokasi Rak</TableHead>
              <TableHead>Kapasitas buku</TableHead>
              <TableHead>Kategori buku</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {raks
              .filter((data) => handleFilter(data, search))
              .map((rak) => (
                <TableRow key={rak.id}>
                  <TableCell>{rak.id}</TableCell>
                  <TableCell>{rak.name}</TableCell>
                  <TableCell>{rak.location}</TableCell>
                  <TableCell>{rak.capacity}</TableCell>
                  <TableCell>{rak.kategori?.name}</TableCell>
                  <TableCell>
                    <EditRak rak={rak} kategoris={kategoris}>
                      <Button variant="ghost" size={'icon'}>
                        <Edit />
                      </Button>
                    </EditRak>
                    <ConfirmDelete rak={rak}>
                      <Button variant="ghost" size={'icon'}>
                        <Trash2 />
                      </Button>
                    </ConfirmDelete>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Container>
    </AppLayout>
  );
};

export default RakIndex;
