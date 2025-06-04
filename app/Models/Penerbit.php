<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Penerbit extends Model
{
    /** @use HasFactory<\Database\Factories\PenerbitFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'address',
        'logo',
    ];

    public $appends = ['image'];

    public function getImageAttribute()
    {
        return $this->logo ? Storage::url($this->logo) : null;
    }
}
