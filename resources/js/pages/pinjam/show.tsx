import Container from '@/components/container';
import FormControl from '@/components/form-control';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Pinjam, User } from '@/types';
import { Head, Link } from '@inertiajs/react';
import dayjs from 'dayjs';
import { Check, Edit, Trash2 } from 'lucide-react';
import { FC } from 'react';
import DetailBuku from '../buku/components/detail-buku';
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

type ShowPinjamProps = {
  pinjam: Pinjam;
  users: User[];
};

const ShowPinjam: FC<ShowPinjamProps> = ({ pinjam, users }) => {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Peminjaman" />
      <Container title="Peminjaman" description="List peminjaman">
        <Card>
          <CardHeader className="flex justify-between">
            <div>
              <CardTitle>Detail peminjaman</CardTitle>
              <CardDescription>{pinjam.code}</CardDescription>
            </div>

            <div className="flex gap-2">
              <EditPinjam pinjam={pinjam} users={users}>
                <Button>
                  <Edit />
                  Edit peminjaman
                </Button>
              </EditPinjam>
              {!pinjam.returned && (
                <Button asChild>
                  <Link href={route('pinjam.pengembalian', pinjam.id)}>
                    <Check />
                    Pengembalian
                  </Link>
                </Button>
              )}
            </div>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-4 gap-6 py-6">
              <FormControl label="Kode peminjaman">
                <p className="text-muted-foreground">{pinjam.code ?? '-'}</p>
              </FormControl>
              <FormControl label="Nama peminjam">
                <p className="text-muted-foreground">
                  {pinjam.user.name ? (
                    <div className="flex items-center gap-2">
                      <Avatar className="size-4">
                        <AvatarImage src={pinjam.user.avatar} />
                      </Avatar>
                      <span>{pinjam.user.name}</span>
                    </div>
                  ) : (
                    '-'
                  )}
                </p>
              </FormControl>
              <FormControl label="Tanggal pinjam">
                <p className="text-muted-foreground">{dayjs(pinjam.loan_date).format('DD MMMM YYYY') ?? '-'}</p>
              </FormControl>
              <FormControl label="Rencana pengembalian">
                <p className="text-muted-foreground">{dayjs(pinjam.due_date).format('DD MMMM YYYY') ?? '-'}</p>
              </FormControl>
              <FormControl label="Status peminjaman">
                <Badge variant={pinjam.returned ? 'default' : 'outline'}>{pinjam.status}</Badge>
              </FormControl>
              <FormControl label="Waktu pengembalian">
                <p className="text-muted-foreground">{pinjam.returned_at ? dayjs(pinjam.returned_at).format('DD MMMM YYYY HH:mm:ss') : '-'}</p>
              </FormControl>
              <FormControl label="Petugas">
                <p className="text-muted-foreground">
                  {pinjam.pic.name ? (
                    <div className="flex items-center gap-2">
                      <Avatar className="size-4">
                        <AvatarImage src={pinjam.pic.avatar} />
                      </Avatar>
                      <span>{pinjam.pic.name}</span>
                    </div>
                  ) : (
                    '-'
                  )}
                </p>
              </FormControl>
              <FormControl label="Denda">
                <p className="text-muted-foreground">{pinjam.fine ?? '-'}</p>
              </FormControl>
              <FormControl label="Catatan">
                <p className="text-muted-foreground">{pinjam.note ?? '-'}</p>
              </FormControl>
            </div>
          </CardContent>
        </Card>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Kode buku</TableHead>
              <TableHead>Judul buku</TableHead>
              <TableHead>Jumlah</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pinjam.bukus?.map((buku) => {
              return (
                <TableRow>
                  <TableCell>
                    <DetailBuku buku={buku}>
                      <Badge variant={'secondary'}>{buku?.isbn}</Badge>
                    </DetailBuku>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-4">
                      <Badge variant={'outline'}>{buku?.kategori?.name}</Badge>
                      <span>{buku?.title}</span>
                    </div>
                  </TableCell>
                  <TableCell>{buku.pivot.qty}</TableCell>
                  <TableCell>
                    <Button size={'icon'} variant={'ghost'}>
                      <Link href={route('pinjamitem.destroy', buku.pivot.id)}>
                        <Trash2 />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Container>
    </AppLayout>
  );
};

export default ShowPinjam;
