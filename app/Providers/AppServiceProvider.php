<?php

namespace App\Providers;

use App\Http\Resources\BukuResource;
use App\Models\Pinjam;
use App\Observers\PinjamObserver;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        BukuResource::withoutWrapping();
        
        Pinjam::observe(PinjamObserver::class);
    }
}
