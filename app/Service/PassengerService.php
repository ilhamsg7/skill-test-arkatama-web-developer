<?php

namespace App\Service;

use App\Contract\PassengerContract;
use App\Models\Passenger;
use Illuminate\Database\Eloquent\Model;

class PassengerService extends BaseService implements PassengerContract
{
    protected string|null $guardForeignKey = null;
    protected Model $model;

    /**
     * Repositories constructor.
     *
     * @param Model $model
     */
    public function __construct(Passenger $model)
    {
        $this->model = $model;
    }

}
