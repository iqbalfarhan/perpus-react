import Container from '@/components/container';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Bahasa, BreadcrumbItem, Buku, Kategori, Penerbit, Rak } from '@/types';
import { Link } from '@inertiajs/react';
import { Edit, QrCode, Trash2 } from 'lucide-react';
import { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import DeleteBuku from './components/delete-buku';
import EditBuku from './components/edit-buku';
import UpdateCover from './components/update-cover';

type BukuShowProps = {
  buku: Buku;
  kategoris: Kategori[];
  raks: Rak[];
  bahasas: Bahasa[];
  penerbits: Penerbit[];
};

const BukuShow: FC<BukuShowProps> = ({ buku, kategoris, raks, bahasas, penerbits }) => {
  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Daftar buku',
      href: route('buku.index'),
    },
    {
      title: buku.title,
      href: route('buku.show', buku.id),
    },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Container title={buku.title} description={buku.kategori?.name}>
        <div className="flex items-center justify-end gap-2">
          <Button asChild>
            <Link href={route('buku.print', buku.id)}>
              <QrCode /> Cetak QR buku
            </Link>
          </Button>
          <EditBuku buku={buku} kategoris={kategoris} raks={raks} bahasas={bahasas} penerbits={penerbits}>
            <Button>
              <Edit /> Edit buku
            </Button>
          </EditBuku>
          <DeleteBuku buku={buku}>
            <Button variant={'destructive'}>
              <Trash2 /> Hapus buku
            </Button>
          </DeleteBuku>
        </div>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <UpdateCover buku={buku} />
          </div>
          <div className="col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Informasi buku</CardTitle>
                <CardDescription>{buku.kategori?.name}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableHead>Judul buku</TableHead>
                      <TableCell>{buku.title}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableHead>Kategori</TableHead>
                      <TableCell>{buku.kategori?.name}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableHead>Penerbit</TableHead>
                      <TableCell>{buku.penerbit?.name}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableHead>Rak</TableHead>
                      <TableCell>{buku.rak?.name}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableHead>Bahasa</TableHead>
                      <TableCell>{buku.bahasa?.name}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableHead>Nomor ISBN</TableHead>
                      <TableCell>{buku.isbn}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableHead>Stok</TableHead>
                      <TableCell>{buku.stock}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableHead>Jumlah halaman</TableHead>
                      <TableCell>{buku.page}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableHead>Diinput oleh</TableHead>
                      <TableCell>{buku.inputer?.name}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
              <Separator />
              <CardContent>
                <article className="prose prose-invert max-w-full">
                  <ReactMarkdown>{buku.synopsis}</ReactMarkdown>
                </article>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </AppLayout>
  );
};

export default BukuShow;
