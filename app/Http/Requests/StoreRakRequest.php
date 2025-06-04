<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreRakRequest extends FormRequest
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
            'name' => 'required|string|max:255',
            'location' => 'nullable|string|max:255',
            'capacity' => 'required|integer|min:1',
            'kategori_id' => 'nullable|exists:kategoris,id',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Nama rak harus diisi.',
            'name.string' => 'Nama rak harus berupa teks.',
            'name.max' => 'Nama rak tidak boleh lebih dari 255 karakter.',
            'location.string' => 'Lokasi rak harus berupa teks.',
            'location.max' => 'Lokasi rak tidak boleh lebih dari 255 karakter.',
            'capacity.required' => 'Kapasitas rak harus diisi.',
            'capacity.integer' => 'Kapasitas rak harus berupa angka.',
            'capacity.min' => 'Kapasitas rak harus minimal 1.',
            'kategori_id.required' => 'Kategori rak harus diisi.',
            'kategori_id.exists' => 'Kategori rak tidak valid.',
        ];
    }
}
