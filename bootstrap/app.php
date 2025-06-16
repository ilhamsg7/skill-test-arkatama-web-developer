<?php

use App\Http\Middleware\HandleInertiaRequests;
use App\Http\Middleware\UserAuthMiddleware;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;
use Illuminate\Support\Facades\Route;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
        then: function () {
            $loadRoutesRecursively = function ($directory, $middleware) {
                $iterator = new RecursiveIteratorIterator(
                    new RecursiveDirectoryIterator($directory, RecursiveDirectoryIterator::SKIP_DOTS)
                );

                foreach ($iterator as $file) {
                    if ($file->isFile() && $file->getExtension() === 'php') {
                        Route::middleware($middleware)->group($file->getPathname());
                    }
                }
            };

            $loadRoutesRecursively(base_path('routes/api'), 'api');

            $loadRoutesRecursively(base_path('routes/web'), 'web');
        }
    )
    ->withMiddleware(function (Middleware $middleware) {

        $middleware->alias([
            "user-auth" => UserAuthMiddleware::class,
        ]);

        $middleware->web(append: [
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {

    })
    ->withEvents(discover: [
        __DIR__ . '/../app/Listeners',
    ])
    ->create();
