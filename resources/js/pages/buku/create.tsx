import Container from '@/components/container';
import FormControl from '@/components/form-control';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { Bahasa, BreadcrumbItem, Kategori, Penerbit, Rak } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { Loader2, Plus } from 'lucide-react';
import { FC } from 'react';
import { toast } from 'sonner';
import CreateBahasa from '../bahasa/components/create-bahasa';
import CreateKategori from '../kategori/components/create-kategori';
import CreatePenerbit from '../penerbit/components/create-penerbit';
import CreateRak from '../rak/components/create-rak';

type CreateBukuProps = {
  kategoris: Kategori[];
  raks: Rak[];
  penerbits: Penerbit[];
  bahasas: Bahasa[];
};

const CreateBuku: FC<CreateBukuProps> = ({ kategoris, raks, penerbits, bahasas }) => {
  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Daftar buku',
      href: route('buku.index'),
    },
    {
      title: 'Tambah buku baru',
      href: route('buku.create'),
    },
  ];

  const { data, setData, post, processing, errors, hasErrors, reset } = useForm({
    title: '',
    isbn: '',
    page: 0,
    stock: 0,
    synopsis: '',
    kategori_id: '',
    rak_id: '',
    penerbit_id: '',
    bahasa_id: '',
    cover: undefined as File | undefined,
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('buku.store'), {
      onSuccess: () => {
        toast.success('Buku berhasil dibuat', {
          action: {
            label: 'List buku',
            onClick: () => router.visit(route('buku.index')),
          },
        });
        reset();
      },
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Create Buku" />
      <Container title="Buat buku baru" description="Harap isi semua informasi yang dibutuhkan untuk membuat buku baru">
        <Card>
          <CardHeader>
            <CardTitle>Klasifikasi Buku</CardTitle>
            <CardDescription>Pengelompokan buku berdasarkan kategori, bahasa, dan penerbit</CardDescription>
          </CardHeader>
          {hasErrors && (
            <>
              <Separator />
              <CardContent className="text-destructive">
                {Object.entries(errors).map(([key, message]) => (
                  <div>
                    {key} : {message}
                  </div>
                ))}
              </CardContent>
            </>
          )}
          <CardContent>
            <div className="grid grid-cols-2 gap-6">
              <FormControl label="Judul Buku">
                <Input placeholder="Judul buku" value={data.title} onChange={(e) => setData('title', e.target.value)} />
              </FormControl>

              <FormControl label="Nomor ISBN">
                <Input placeholder="Nomor ISBN" value={data.isbn} onChange={(e) => setData('isbn', e.target.value)} />
              </FormControl>

              <FormControl label="Jumlah halaman">
                <Input type="number" placeholder="Jumlah halaman" value={data.page} onChange={(e) => setData('page', parseInt(e.target.value))} />
              </FormControl>

              <FormControl label="Stok buku">
                <Input type="number" placeholder="Stok buku" value={data.stock} onChange={(e) => setData('stock', parseInt(e.target.value))} />
              </FormControl>

              <FormControl label="Sinopsis Buku">
                <Textarea placeholder="Sinopsis buku" value={data.synopsis} onChange={(e) => setData('synopsis', e.target.value)} />
              </FormControl>

              <FormControl label="Bahasa">
                <div className="flex w-full gap-2">
                  <Select value={data.bahasa_id} onValueChange={(value) => setData('bahasa_id', value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Pilih kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      {bahasas.map((bahasa) => (
                        <SelectItem key={bahasa.id} value={bahasa.id.toString()}>
                          {`${bahasa.flag} ${bahasa.name}`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <CreateBahasa>
                    <Button size={'icon'}>
                      <Plus />
                    </Button>
                  </CreateBahasa>
                </div>
              </FormControl>
            </div>
          </CardContent>
          <Separator />
          <CardHeader>
            <CardTitle>Klasifikasi Buku</CardTitle>
            <CardDescription>Pengelompokan buku berdasarkan kategori, bahasa, dan penerbit</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-6">
              <FormControl label="Kategori Buku">
                <div className="flex w-full gap-2">
                  <Select value={data.kategori_id} onValueChange={(value) => setData('kategori_id', value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Pilih kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      {kategoris.map((kategori) => (
                        <SelectItem key={kategori.id} value={kategori.id.toString()}>
                          {kategori.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <CreateKategori>
                    <Button size={'icon'}>
                      <Plus />
                    </Button>
                  </CreateKategori>
                </div>
              </FormControl>
              <FormControl label="Rak Buku">
                <div className="flex w-full gap-2">
                  <Select value={data.rak_id} onValueChange={(value) => setData('rak_id', value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Pilih rak buku" />
                    </SelectTrigger>
                    <SelectContent>
                      {raks.map((rak) => (
                        <SelectItem key={rak.id} value={rak.id.toString()}>
                          {rak.name} {rak.location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <CreateRak kategoris={kategoris}>
                    <Button size={'icon'}>
                      <Plus />
                    </Button>
                  </CreateRak>
                </div>
              </FormControl>

              <FormControl label="Penerbit buku">
                <div className="flex w-full gap-2">
                  <Select value={data.penerbit_id} onValueChange={(value) => setData('penerbit_id', value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Pilih penerbit" />
                    </SelectTrigger>
                    <SelectContent>
                      {penerbits.map((penerbit) => (
                        <SelectItem key={penerbit.id} value={penerbit.id.toString()}>
                          {penerbit.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <CreatePenerbit>
                    <Button size={'icon'}>
                      <Plus />
                    </Button>
                  </CreatePenerbit>
                </div>
              </FormControl>
            </div>
          </CardContent>

          <Separator />

          <CardHeader>
            <CardTitle>Klasifikasi Buku</CardTitle>
            <CardDescription>Pengelompokan buku berdasarkan kategori, bahasa, dan penerbit</CardDescription>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-3 gap-6">
              <FormControl label="Cover buku">
                <Input placeholder="Cover buku" accept="image/*" type="file" onChange={(e) => setData('cover', e.target.files?.[0])} />
              </FormControl>
              <FormControl label="Preview cover">
                {data.cover && (
                  <Avatar>
                    <AvatarImage src={data.cover ? URL.createObjectURL(data.cover) : ''} />
                  </Avatar>
                )}
              </FormControl>
            </div>
          </CardContent>
          <Separator />
          <CardFooter>
            <form onSubmit={submit} className="space-y-6">
              <div>
                <Button disabled={processing}>
                  {processing && <Loader2 className="animate-spin" />}
                  Simpan buku baru
                </Button>
              </div>
            </form>
          </CardFooter>
        </Card>
      </Container>
    </AppLayout>
  );
};

export default CreateBuku;
