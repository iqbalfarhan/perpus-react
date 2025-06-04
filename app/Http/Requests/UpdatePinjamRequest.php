<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePinjamRequest extends FormRequest
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
            'code' => 'nullable|unique:pinjams,code,' . $this->pinjam->id,
            'user_id' => 'nullable|exists:users,id',
            'pic_id' => 'nullable|exists:users,id',
            'loan_date' => 'nullable|date',
            'due_date' => 'nullable|date',
            'late' => 'nullable|boolean',
            'fine' => 'nullable|numeric',
            'note' => 'nullable|string',
            'returned' => 'nullable|boolean',
            'returned_at' => 'nullable|date',
        ];
    }
}
