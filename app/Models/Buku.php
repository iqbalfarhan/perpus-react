<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Buku extends Model
{
    /** @use HasFactory<\Database\Factories\BukuFactory> */
    use HasFactory;

    protected $fillable = [
        'title',
        'synopsis',
        'author',
        'isbn',
        'cover',
        'page',
        'stock',
        'penerbit_id',
        'kategori_id',
        'rak_id',
        'bahasa_id',
        'created_by',
    ];

    public $appends = ['thumbnail'];

    public function penerbit()
    {
        return $this->belongsTo(Penerbit::class);
    }

    public function kategori()
    {
        return $this->belongsTo(Kategori::class);
    }

    public function rak()
    {
        return $this->belongsTo(Rak::class);
    }

    public function bahasa()
    {
        return $this->belongsTo(Bahasa::class);
    }

    public function inputer()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function getThumbnailAttribute()
    {
        return $this->cover ? Storage::url($this->cover) : null;
    }
}
