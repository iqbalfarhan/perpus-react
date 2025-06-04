<?php

namespace App\Http\Controllers;

use App\Http\Requests\PengembalianPinjamanRequest;
use App\Http\Requests\StorePinjamRequest;
use App\Http\Requests\UpdatePinjamRequest;
use App\Models\Buku;
use App\Models\Pinjam;
use App\Models\Pinjamitem;
use App\Models\User;
use Inertia\Inertia;

class PinjamController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = Pinjam::with('pic', 'user')->withCount('items')->orderBy(
            'returned_at', 'desc'
        )->get();
        return Inertia::render('pinjam/index', [
            'pinjams' => $data,
            'users' => User::get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('pinjam/create', [
            'bukus' => Buku::get(),
            'users' => User::get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePinjamRequest $request)
    {
        $data = $request->validated();
        $data['code'] = uniqid();
        $data['pic_id'] = auth()->user()->id;

        $pinjam_id = Pinjam::create($data);

        foreach ($data['items'] as $item) {
            Pinjamitem::create([
                'pinjam_id' => $pinjam_id->id,
                'buku_id' => $item['buku_id'],
                'qty' => $item['qty'],
            ]);
        }

        return redirect()->route('pinjam.index')->with('success', 'Data berhasil disimpan');
    }

    /**
     * Display the specified resource.
     */
    public function show(Pinjam $pinjam)
    {
        return Inertia::render('pinjam/show', [
            'pinjam' => $pinjam->load('bukus.kategori', 'bukus.rak', 'bukus.bahasa', 'bukus.penerbit', 'user', 'pic'),
            'users' => User::get(),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Pinjam $pinjam)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePinjamRequest $request, Pinjam $pinjam)
    {
        $data = $request->validated();
        
        if ($data['returned'] == false) {
            $data['returned_at'] = null;
        }

        $pinjam->update($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pinjam $pinjam)
    {
        $pinjam->delete();
    }

    public function pengembalian(Pinjam $pinjam)
    {
        return Inertia::render('pinjam/pengembalian', [
            'pinjam' => $pinjam->load('bukus.kategori', 'bukus.rak', 'bukus.bahasa', 'bukus.penerbit', 'user', 'pic'),
            "checked_count" => $pinjam->items->where('checked', true)->count(),
        ]);
    }

    public function setPengembalian(PengembalianPinjamanRequest $request, Pinjam $pinjam)
    {
        $validated = $request->validated();

        $totalItems = $pinjam->items->count();
        $checkedItems = $pinjam->items->where('checked', true)->count();

        $validated['returned'] = $checkedItems === $totalItems;

        $pinjam->update($validated);
    }
}
