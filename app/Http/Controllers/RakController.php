<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRakRequest;
use App\Http\Requests\UpdateRakRequest;
use App\Models\Kategori;
use App\Models\Rak;
use Inertia\Inertia;

class RakController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('rak/index', [
            'raks' => Rak::with('kategori')->get(),
            'kategoris' => Kategori::get(),
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
    public function store(StoreRakRequest $request)
    {
        $data = $request->validated();
        if (empty($data['kategori_id'])) {
            $data['kategori_id'] = null;
        }
        
        Rak::create($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(Rak $rak)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Rak $rak)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRakRequest $request, Rak $rak)
    {
        $data = $request->validated();
        if (empty($data['kategori_id'])) {
            $data['kategori_id'] = null;
        }
        
        $rak->update($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Rak $rak)
    {
        $rak->delete();
    }
}
