<?php

namespace App\Providers;

use App\Contract\AuthBaseContract;
use App\Contract\BaseContract;
use App\Contract\PassengerContract;
use App\Contract\TravelContract;
use App\Contract\UserAuthContract;
use App\Service\AuthBaseService;
use App\Service\BaseService;
use App\Service\PassengerService;
use App\Service\TravelService;
use App\Service\UserAuthService;
use Illuminate\Support\ServiceProvider;

class ContractServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        /**
         * Base Service Contract.
         */
        $this->app->bind(BaseContract::class, BaseService::class);
        $this->app->bind(AuthBaseContract::class, AuthBaseService::class);
        $this->app->bind(UserAuthContract::class, UserAuthService::class);
        $this->app->bind(PassengerContract::class, PassengerService::class);
        $this->app->bind(TravelContract::class, TravelService::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
