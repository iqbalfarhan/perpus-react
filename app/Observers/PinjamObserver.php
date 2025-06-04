<?php

namespace App\Observers;

use App\Models\Pinjam;

class PinjamObserver
{
    /**
     * Handle the Pinjam "created" event.
     */
    public function created(Pinjam $pinjam): void
    {
        //
    }

    /**
     * Handle the Pinjam "updated" event.
     */
    public function updated(Pinjam $pinjam): void
    {
        // if ($pinjam->isDirty('returned') && $pinjam->returned === false) {
        //     $pinjam->returned_at = null;
        //     $pinjam->save();
        // }
    }

    /**
     * Handle the Pinjam "deleted" event.
     */
    public function deleted(Pinjam $pinjam): void
    {
        //
    }

    /**
     * Handle the Pinjam "restored" event.
     */
    public function restored(Pinjam $pinjam): void
    {
        //
    }

    /**
     * Handle the Pinjam "force deleted" event.
     */
    public function forceDeleted(Pinjam $pinjam): void
    {
        //
    }
}
