<?php

namespace App\Http\Controllers;

use App\Contract\PassengerContract;
use App\Http\Requests\TravelRequest;
use App\Utils\WebResponse;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\AllowedSort;

class TravelController extends Controller
{
    protected PassengerContract $service;

    public function __construct(PassengerContract $service)
    {
        $this->service = $service;
    }
    public function fetch()
    {
        $allowedSorts = [
            'id',
        ];

        $data = $this->service->all(
            allowedFilters: ['id'],
            allowedSorts: $allowedSorts,
            withPaginate: true,
            relation: [],
            perPage: request()->get('per_page', 10)
        );

        return response()->json($data);
    }

    public function store(TravelRequest $request)
    {
        $payload = $request->validated();
        $data = $this->service->create($payload);
        return WebResponse::response($data, 'dashboard.index');
    }

    public function update(TravelRequest $request, $id)
    {
        $payload = $request->validated();
        $data = $this->service->update($id, $payload);
        return WebResponse::response($data, 'dashboard.index');
    }
}
