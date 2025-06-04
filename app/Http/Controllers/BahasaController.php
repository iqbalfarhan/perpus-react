<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBahasaRequest;
use App\Http\Requests\UpdateBahasaRequest;
use App\Models\Bahasa;
use Inertia\Inertia;

class BahasaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('bahasa/index', [
            'bahasas' => Bahasa::get(),
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
    public function store(StoreBahasaRequest $request)
    {
        $data = $request->validated();
        Bahasa::create($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(Bahasa $bahasa)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Bahasa $bahasa)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBahasaRequest $request, Bahasa $bahasa)
    {
        $bahasa->update($request->validated());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Bahasa $bahasa)
    {
        $bahasa->delete();
    }
}
