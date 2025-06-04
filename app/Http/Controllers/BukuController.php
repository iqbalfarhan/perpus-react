<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBukuRequest;
use App\Http\Requests\UpdateBukuRequest;
use App\Http\Resources\BukuResource;
use App\Models\Bahasa;
use App\Models\Buku;
use App\Models\Kategori;
use App\Models\Penerbit;
use App\Models\Rak;
use Inertia\Inertia;

class BukuController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('buku/index', [
            'bukus' => BukuResource::collection(Buku::get()),
            'kategoris' => Kategori::get(),
            'raks' => Rak::get(),
            'bahasas' => Bahasa::get(),
            'penerbits' => Penerbit::get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('buku/create', [
            'kategoris' => Kategori::orderBy('name')->get(),
            'raks' => Rak::orderBy('name')->get(),
            'penerbits' => Penerbit::orderBy('name')->get(),
            'bahasas' => Bahasa::orderBy('name')->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBukuRequest $request)
    {
        $data = $request->validated();
        $data['created_by'] = auth()->user()->id;

        Buku::create($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(Buku $buku)
    {
        return Inertia::render('buku/show', [
            'buku' => new BukuResource($buku),
            'kategoris' => Kategori::get(),
            'raks' => Rak::get(),
            'penerbits' => Penerbit::orderBy('name')->get(),
            'bahasas' => Bahasa::orderBy('name')->get(),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Buku $buku)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBukuRequest $request, Buku $buku)
    {
        $data = $request->validated();
        if ($request->hasFile('cover')) {
            $data['cover'] = $request->file('cover')->store('book-cover', 'public');
        } else {
            unset($data['cover']); // biar gak error pas update
        }
        $buku->update($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Buku $buku)
    {
        //
    }

    public function print(Buku $buku)
    {
        return Inertia::render('buku/print', [
            'buku' => new BukuResource($buku),
        ]);
    }

    public function removeCover(Buku $buku)
    {
        $buku->update(['cover' => null]);
    }
}
