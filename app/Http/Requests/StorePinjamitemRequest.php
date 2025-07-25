<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePinjamitemRequest extends FormRequest
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
            'pinjam_id' => 'required|exists:pinjams,id',
            'buku_id' => 'required|exists:bukus,id',
            'qty' => 'required|integer|min:1',
        ];
    }
}
