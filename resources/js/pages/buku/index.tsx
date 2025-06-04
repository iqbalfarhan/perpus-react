import Container from '@/components/container';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { handleFilter, strLimit } from '@/lib/utils';
import { Bahasa, BreadcrumbItem, Buku, Kategori, Penerbit, Rak } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Edit, FolderArchive, ImageOff, Plus, Trash2 } from 'lucide-react';
import { FC, useState } from 'react';
import HoverCardRak from '../rak/components/hover-card-rak';
import DeleteBuku from './components/delete-buku';
import DetailBuku from './components/detail-buku';
import EditBuku from './components/edit-buku';

type BukuIndexProps = {
  bukus: Buku[];
  kategoris: Kategori[];
  raks: Rak[];
  bahasas: Bahasa[];
  penerbits: Penerbit[];
};

const BukuIndex: FC<BukuIndexProps> = ({ bukus, kategoris, raks, bahasas, penerbits }) => {
  const [search, setSearch] = useState('');

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Daftar buku',
      href: route('buku.index'),
    },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Daftar buku" />
      <Container title="Daftar buku" description="Menampilkan semua kategori buku">
        <div className="flex items-center justify-between gap-4">
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." />
          <Button asChild>
            <Link href={route('buku.create')}>
              <Plus />
              Buat buku baru
            </Link>
          </Button>
        </div>

        <div className="grid">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Judul buku</TableHead>
                <TableHead>ISBN</TableHead>
                <TableHead>Bahasa</TableHead>
                <TableHead>Rak buku</TableHead>
                <TableHead>Stok</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bukus
                .filter((data) => handleFilter(data, search))
                .map((buku) => (
                  <TableRow key={buku.id}>
                    <TableCell>{buku.id}</TableCell>
                    <TableCell>
                      <Link href={route('buku.show', buku.id)} className="flex items-center space-x-4">
                        <Avatar className="size-5 rounded">
                          <AvatarImage src={buku.thumbnail} />
                          <AvatarFallback>
                            <ImageOff className="size-4" />
                          </AvatarFallback>
                        </Avatar>
                        <Badge variant={'outline'}>{buku.kategori?.name}</Badge>
                        <div>{strLimit(buku.title)}</div>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <DetailBuku buku={buku}>
                        <div className="font-mono">{buku.isbn}</div>
                      </DetailBuku>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <span>{buku.bahasa?.flag}</span>
                        <span>{buku.bahasa?.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {buku.rak ? (
                        <HoverCardRak rak={buku.rak as Rak}>
                          <span>{buku.rak?.name}</span>
                        </HoverCardRak>
                      ) : (
                        <span className="text-red-500">Tidak ada rak</span>
                      )}
                      <HoverCardRak rak={buku.rak as Rak}>{buku.rak?.name}</HoverCardRak>
                    </TableCell>
                    <TableCell className="font-mono">{buku.stock}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size={'icon'} asChild>
                        <Link href={route('buku.show', buku.id)}>
                          <FolderArchive />
                        </Link>
                      </Button>
                      <EditBuku buku={buku} kategoris={kategoris} raks={raks} bahasas={bahasas} penerbits={penerbits}>
                        <Button variant="ghost" size={'icon'}>
                          <Edit />
                        </Button>
                      </EditBuku>
                      <DeleteBuku buku={buku}>
                        <Button variant="ghost" size={'icon'}>
                          <Trash2 />
                        </Button>
                      </DeleteBuku>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </Container>
    </AppLayout>
  );
};

export default BukuIndex;
