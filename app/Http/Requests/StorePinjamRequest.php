<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePinjamRequest extends FormRequest
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
            'user_id' => 'required|exists:users,id',
            'loan_date' => 'required|date',
            'due_date' => 'required|date',
            'note' => 'nullable|string',
            'items' => 'required|array',
            'items.*.buku_id' => 'required|exists:bukus,id',
            'items.*.qty' => 'required|integer|min:1',
        ];
    }

    public function messages()
    {
        return [
            'code.unique' => 'Kode pinjaman sudah digunakan.',
            'user_id.required' => 'Peminjam harus dipilih.',
            'user_id.exists' => "Peminjam tidak ditemukan.",
            'loan_date.required' => 'Tanggal pinjam harus diisi.',
            'due_date.required' => 'Tanggal kembali harus diisi.',
            'items.required' => 'Daftar buku harus diisi.',
            'items.*.buku_id.required' => 'Buku harus dipilih.',
            'items.*.buku_id.exists' => 'Buku tidak ditemukan.',
            'items.*.qty.required' => 'Jumlah buku harus diisi.',
            'items.*.qty.integer' => 'Jumlah buku harus berupa angka.',
            'items.*.qty.min' => 'Jumlah buku harus lebih besar dari 0.',
        ];
    }
}
