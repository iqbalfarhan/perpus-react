<?php

use App\Http\Controllers\BahasaController;
use App\Http\Controllers\BukuController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\KategoriController;
use App\Http\Controllers\PenerbitController;
use App\Http\Controllers\PinjamController;
use App\Http\Controllers\PinjamitemController;
use App\Http\Controllers\RakController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('tanyaai', [DashboardController::class, 'tanyaai'])->name('tanyaai');

    Route::resource('kategori', KategoriController::class);
    Route::resource('bahasa', BahasaController::class);
    Route::resource('penerbit', PenerbitController::class);
    Route::resource('user', UserController::class);
    Route::resource('rak', RakController::class);

    Route::put('/buku/{buku}/remove-cover', [BukuController::class, 'removeCover'])->name('buku.remove-cover');
    Route::get('/buku/{buku}/print', [BukuController::class, 'print'])->name('buku.print');
    Route::resource('buku', BukuController::class);

    Route::put('/pinjam/{pinjam}/set-pengembalian', [PinjamController::class, 'setPengembalian'])->name('pinjam.set-pengembalian');
    Route::get('/pinjam/{pinjam}/pengembalian', [PinjamController::class, 'pengembalian'])->name('pinjam.pengembalian');
    Route::resource('pinjam', PinjamController::class);
    
    Route::resource('pinjamitem', PinjamitemController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
