<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Route;
use Livewire\Livewire;
use Livewire\Mechanisms\HandleRequests\EndpointResolver;
use Livewire\Features\SupportFileUploads\FilePreviewController;
use Livewire\Features\SupportFileUploads\FileUploadController;

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
        $adminPrefix = '/admin';

        Livewire::setScriptRoute(function ($handle) use ($adminPrefix) {
            $path = EndpointResolver::scriptPath(minified: ! config('app.debug'));

            return Route::get($adminPrefix . $path, $handle);
        });

        Livewire::setUpdateRoute(function ($handle, string $path) use ($adminPrefix) {
            return Route::post($adminPrefix . $path, $handle);
        });

        Route::post($adminPrefix . EndpointResolver::uploadPath(), [FileUploadController::class, 'handle'])
            ->name('admin.livewire.upload-file');

        Route::get($adminPrefix . EndpointResolver::previewPath(), [FilePreviewController::class, 'handle'])
            ->name('admin.livewire.preview-file');
    }
}
