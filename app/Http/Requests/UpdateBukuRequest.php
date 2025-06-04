<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateBukuRequest extends FormRequest
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
            'title' => 'nullable',
            'synopsis' => 'nullable',
            'author' => 'nullable',
            'isbn' => 'nullable',
            'cover' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'page' => 'nullable',
            'stock' => 'nullable',
            'penerbit_id' => 'nullable|exists:penerbits,id',
            'kategori_id' => 'nullable|exists:kategoris,id',
            'rak_id' => 'nullable|exists:raks,id',
            'bahasa_id' => 'nullable|exists:bahasas,id',
            'created_by' => 'nullable|exists:users,id',
        ];
    }
}
