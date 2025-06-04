<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pinjamitem extends Model
{
    /** @use HasFactory<\Database\Factories\PinjamitemFactory> */
    use HasFactory;

    protected $fillable = [
        'pinjam_id',
        'buku_id',
        'qty',
        'checked'
    ];

    protected $casts = [
        'checked' => 'boolean',
    ];

    public function pinjam()
    {
        return $this->belongsTo(Pinjam::class);
    }

    public function buku()
    {
        return $this->belongsTo(Buku::class);
    }
}
