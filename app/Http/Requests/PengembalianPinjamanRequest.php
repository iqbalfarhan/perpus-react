<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PengembalianPinjamanRequest extends FormRequest
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
            'returned_at' => 'required|date',
            'late' => 'nullable|boolean',
            'fine' => 'nullable|numeric',
        ];
    }

    public function messages(): array
    {
        return [
            'returned_at.required' => 'Tanggal pengembalian harus diisi.',
            'returned_at.date' => 'Tanggal pengembalian harus berupa tanggal.',
            'late.boolean' => 'Kolom late harus berupa boolean.',
            'fine.numeric' => 'Kolom denda harus berupa angka.',
        ];
    }
}
