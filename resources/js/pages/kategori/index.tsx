import Container from '@/components/container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { handleFilter } from '@/lib/utils';
import { BreadcrumbItem, Kategori } from '@/types';
import { Head } from '@inertiajs/react';
import { Edit, Plus, Trash2 } from 'lucide-react';
import { FC, useState } from 'react';
import ConfirmDelete from './components/confirm-delete';
import CreateKategori from './components/create-kategori';
import EditKategori from './components/edit-kategori';

type KategoriIndexProps = {
  kategoris: Kategori[];
};

const KategoriIndex: FC<KategoriIndexProps> = ({ kategoris }) => {
  const [search, setSearch] = useState('');

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Pengaturan',
      href: '',
    },
    {
      title: 'Kategori buku',
      href: route('kategori.index'),
    },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Kategori buku" />
      <Container title="Kategori buku" description="Menampilkan semua kategori buku">
        <div className="flex items-center justify-between gap-4">
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." />
          <CreateKategori>
            <Button>
              <Plus />
              Buat kategori baru
            </Button>
          </CreateKategori>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nama kategori</TableHead>
              <TableHead>Descripsi kategori</TableHead>
              <TableHead>Total buku</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          {kategoris
            .filter((data) => handleFilter(data, search))
            .map((kategori) => (
              <TableRow key={kategori.id}>
                <TableCell>{kategori.id}</TableCell>
                <TableCell>{kategori.name}</TableCell>
                <TableCell>{kategori.description}</TableCell>
                <TableCell>{kategori.bukus_count} buku</TableCell>
                <TableCell>
                  <EditKategori kategori={kategori}>
                    <Button variant="ghost" size={'icon'}>
                      <Edit />
                    </Button>
                  </EditKategori>
                  <ConfirmDelete kategori={kategori}>
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

export default KategoriIndex;
