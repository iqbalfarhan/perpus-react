import Container from '@/components/container';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { getInitial, handleFilter } from '@/lib/utils';
import { BreadcrumbItem, Penerbit } from '@/types';
import { Head } from '@inertiajs/react';
import { Edit, Plus, Trash2 } from 'lucide-react';
import { FC, useState } from 'react';
import ConfirmDelete from './components/confirm-delete';
import CreatePenerbit from './components/create-penerbit';
import EditPenerbit from './components/edit-penerbit';

type PenerbitIndexProps = {
  penerbits: Penerbit[];
};

const PenerbitIndex: FC<PenerbitIndexProps> = ({ penerbits }) => {
  const [search, setSearch] = useState('');

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Pengaturan',
      href: '',
    },
    {
      title: 'List penerbit',
      href: route('penerbit.index'),
    },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="List penerbit" />
      <Container title="Penerbit" description="Menampilkan data penerbit buku">
        <div className="flex items-center justify-between gap-4">
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." />
          <CreatePenerbit>
            <Button>
              <Plus />
              Buat penerbit baru
            </Button>
          </CreatePenerbit>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Logo</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Alamat</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {penerbits
              .filter((data) => handleFilter(data, search))
              .map((penerbit) => (
                <TableRow key={penerbit.id}>
                  <TableCell>{penerbit.id}</TableCell>
                  <TableCell>
                    <Avatar>
                      <AvatarImage src={penerbit.image} alt={penerbit.name} />
                      <AvatarFallback>{getInitial(penerbit.name)}</AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell>{penerbit.name}</TableCell>
                  <TableCell>{penerbit.address}</TableCell>
                  <TableCell>
                    <EditPenerbit penerbit={penerbit}>
                      <Button variant="ghost" size={'icon'}>
                        <Edit />
                      </Button>
                    </EditPenerbit>
                    <ConfirmDelete penerbit={penerbit}>
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

export default PenerbitIndex;
