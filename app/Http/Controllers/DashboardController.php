<?php

namespace App\Http\Controllers;

use App\Models\Buku;
use App\Models\Pinjam;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('dashboard', [
            'bukus' => Buku::select('title', 'id')->get(),
            'buku_count' => Buku::select('stock')->get()->sum('stock'),
            'user_count' => User::count(),
            'pinjam_count' => Pinjam::where('returned', true)->count(),
        ]);
    }

    public function tanyaai()
    {
        return Inertia::render('tanyaai', [
            'api_key' => env('GEMINI_API_KEY' , ""),
        ]);
    }
}
