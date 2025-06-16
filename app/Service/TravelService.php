<?php

namespace App\Service;

use App\Contract\TravelContract;
use App\Models\Travel;
use Illuminate\Database\Eloquent\Model;

class TravelService extends BaseService implements TravelContract
{
    protected string|null $guardForeignKey = null;
    protected Model $model;

    /**
     * Repositories constructor.
     *
     * @param Model $model
     */
    public function __construct(Travel $model)
    {
        $this->model = $model;
    }

}
