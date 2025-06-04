<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePinjamitemRequest;
use App\Http\Requests\UpdatePinjamitemRequest;
use App\Models\Pinjamitem;

class PinjamitemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function store(StorePinjamitemRequest $request)
    {
        $data = $request->validated();
        Pinjamitem::create($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(Pinjamitem $pinjamitem)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Pinjamitem $pinjamitem)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePinjamitemRequest $request, Pinjamitem $pinjamitem)
    {
        $data = $request->validated();
        $pinjamitem->update($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pinjamitem $pinjamitem)
    {
        $pinjamitem->delete();
    }
}
