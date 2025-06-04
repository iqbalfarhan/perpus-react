<?php

namespace App\Models;

use App\Observers\PinjamObserver;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#[ObservedBy([PinjamObserver::class])]
class Pinjam extends Model
{
    /** @use HasFactory<\Database\Factories\PeminjamanFactory> */
    use HasFactory;

    protected $fillable = [
        'code',
        'user_id',
        'pic_id',
        'loan_date',
        'due_date',
        'late',
        'fine',
        'note',
        'returned',
        'returned_at',
    ];

    protected $casts = [
        'returned' => 'boolean',
        'returned_at' => 'datetime',
        'loan_date' => 'date:Y-m-d',
        'due_date' => 'date:Y-m-d',
    ];

    public $appends = ['status'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function pic()
    {
        return $this->belongsTo(User::class, 'pic_id');
    }

    public function bukus()
    {
        return $this->belongsToMany(Buku::class, 'pinjamitems')->withPivot('id', 'qty', 'checked');
    }

    public function items()
    {
        return $this->hasMany(Pinjamitem::class);
    }

    public function getStatusAttribute()
    {
        if ($this->returned) {
            return 'Sudah Dikembalikan';
        } else {
            return 'Belum Dikembalikan';
        }
    }
}
