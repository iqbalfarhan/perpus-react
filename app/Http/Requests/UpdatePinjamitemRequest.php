<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePinjamitemRequest extends FormRequest
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
            'pinjam_id' => 'nullable|exists:pinjams,id',
            'buku_id' => 'nullable|exists:bukus,id',
            'qty' => 'nullable|integer|min:1',
            'checked' => 'nullable|boolean',
        ];
    }
}
