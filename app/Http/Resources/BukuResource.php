<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BukuResource extends JsonResource
{

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'synopsis' => $this->synopsis,
            'author' => $this->author,
            'isbn' => $this->isbn,
            'cover' => $this->cover,
            'page' => $this->page,
            'stock' => $this->stock,
            'penerbit' => $this->penerbit,
            'kategori' => $this->kategori,
            'rak' => $this->rak,
            'bahasa' => $this->bahasa,
            'inputer' => $this->inputer,
            'thumbnail' => $this->thumbnail,
        ];
    }
}
