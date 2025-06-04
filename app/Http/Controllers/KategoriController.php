<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreKategoriRequest;
use App\Http\Requests\UpdateKategoriRequest;
use App\Models\Kategori;
use Inertia\Inertia;

class KategoriController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('kategori/index', [
            'kategoris' => Kategori::withCount('bukus')->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreKategoriRequest $request)
    {
        $data=$request->validated();
        Kategori::create($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(Kategori $kategori)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Kategori $kategori)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateKategoriRequest $request, Kategori $kategori)
    {
        $data = $request->validated();
        $kategori->update($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Kategori $kategori)
    {
        $kategori->delete();
    }
}
