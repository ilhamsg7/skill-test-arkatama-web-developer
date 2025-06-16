<?php

namespace App\Service;

use App\Contract\UserAuthContract;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class UserAuthService extends AuthBaseService implements UserAuthContract
{
    protected string $username = 'email';
    protected string|null $guard = 'web';
    protected string|null $guardForeignKey = null;
    protected Model $model;

    /**
     * Repositories constructor.
     *
     * @param Model $model
     */
    public function __construct(User $model)
    {
        $this->model = $model;
    }

}
