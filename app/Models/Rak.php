<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rak extends Model
{
    /** @use HasFactory<\Database\Factories\RakFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'location',
        'capacity',
        'kategori_id'
    ];

    public function kategori()
    {
        return $this->belongsTo(Kategori::class);
    }
}
