import Container from '@/components/container';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import { getInitial, handleFilter } from '@/lib/utils';
import { BreadcrumbItem, Pinjam, User } from '@/types';
import { Head, Link } from '@inertiajs/react';
import dayjs from 'dayjs';
import { CheckCheck, Edit, Plus, Trash2 } from 'lucide-react';
import { FC, useState } from 'react';
import DeletePinjam from './components/delete-pinjam';
import EditPinjam from './components/edit-pinjam';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Peminjaman',
    href: '/pinjam',
  },
  {
    title: 'List peminjaman',
    href: '/pinjam',
  },
];

type PinjamIndexProps = {
  pinjams: Pinjam[];
  users: User[];
};

const PinjamIndex: FC<PinjamIndexProps> = ({ pinjams, users }) => {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<string>('false');

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Peminjaman" />
      <Container title="Peminjaman" description="List peminjaman">
        <div className="flex items-center justify-between gap-4">
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." />
          <Button asChild>
            <Link href={route('pinjam.create')}>
              <Plus />
              Buat peminjaman
            </Link>
          </Button>
        </div>

        <Tabs defaultValue="false" onValueChange={(value) => setStatus(value)}>
          <TabsList>
            <TabsTrigger value="false">Masih dipinjam</TabsTrigger>
            <TabsTrigger value="true">Sudah dikembalikan</TabsTrigger>
          </TabsList>
        </Tabs>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Kode Pinjam</TableHead>
              <TableHead>Peminjam</TableHead>
              <TableHead>Tanggal pinjam</TableHead>
              <TableHead>Tanggal pengembalian</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pinjams
              .filter((data) => handleFilter(data, search))
              .filter((data) => (status == 'false' ? !data.returned : data.returned))
              .map((pinjam) => (
                <TableRow key={pinjam.id}>
                  <TableCell className="font-mono">
                    <Badge variant={'secondary'} asChild>
                      <Link href={route('pinjam.show', pinjam.id)}>{pinjam.code}</Link>
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="size-6">
                        <AvatarImage src={pinjam.user.avatar} alt={pinjam.user.name} />
                        <AvatarFallback>{getInitial(pinjam.user.name)}</AvatarFallback>
                      </Avatar>
                      <span>{pinjam.user.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {pinjam.loan_date && dayjs(pinjam.loan_date).format('DD MMM YYYY')}
                    {' - '}
                    {pinjam.due_date && dayjs(pinjam.due_date).format('DD MMM YYYY')}
                  </TableCell>
                  <TableCell>{pinjam.returned_at && dayjs(pinjam.returned_at).format('DD MMM YYYY HH:mm:ss')}</TableCell>
                  <TableCell>
                    <Badge variant={'outline'}>{pinjam.status}</Badge>
                  </TableCell>
                  <TableCell>
                    {!pinjam.returned && (
                      <Button variant={'ghost'} size={'icon'}>
                        <Link href={route('pinjam.pengembalian', pinjam.id)}>
                          <CheckCheck />
                        </Link>
                      </Button>
                    )}
                    <EditPinjam pinjam={pinjam} users={users}>
                      <Button variant="ghost" size={'icon'}>
                        <Edit />
                      </Button>
                    </EditPinjam>
                    <DeletePinjam pinjam={pinjam}>
                      <Button variant="ghost" size={'icon'}>
                        <Trash2 />
                      </Button>
                    </DeletePinjam>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Container>
    </AppLayout>
  );
};

export default PinjamIndex;
