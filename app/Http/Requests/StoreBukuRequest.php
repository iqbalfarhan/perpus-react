<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBukuRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'synopsis' => 'nullable|string',
            'author' => 'nullable|string|max:255',
            'isbn' => 'nullable|string|max:255',
            'cover' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'page' => 'nullable|integer',
            'stock' => 'nullable|integer',
            'penerbit_id' => 'nullable|integer|exists:penerbits,id',
            'kategori_id' => 'nullable|integer|exists:kategoris,id',
            'rak_id' => 'nullable|integer|exists:raks,id',
            'bahasa_id' => 'nullable|integer|exists:bahasas,id',
        ];
    }
}
