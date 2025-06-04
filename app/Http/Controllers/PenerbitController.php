<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePenerbitRequest;
use App\Http\Requests\UpdatePenerbitRequest;
use App\Models\Penerbit;
use Inertia\Inertia;

class PenerbitController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('penerbit/index', [
            'penerbits' => Penerbit::get(),
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
    public function store(StorePenerbitRequest $request)
    {
        $data = $request->validated();
        if ($request->file('logo')) {
            $data['logo'] = $request->file('logo')->store('penerbit-logos');
        }

        Penerbit::create($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(Penerbit $penerbit)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Penerbit $penerbit)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePenerbitRequest $request, Penerbit $penerbit)
    {          
        $data = $request->validated();

        if ($request->hasFile('image')) {
            $data['logo'] = $request->file('image')->store('penerbit-logos', 'public');
        } else {
            unset($data['image']); // biar gak error pas update
        }

        $penerbit->update($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Penerbit $penerbit)
    {
        $penerbit->delete();
    }
}
