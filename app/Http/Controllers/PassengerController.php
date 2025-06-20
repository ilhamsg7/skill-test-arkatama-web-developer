<?php

namespace App\Http\Controllers;

use App\Contract\PassengerContract;
use App\Http\Requests\PassengerRequest;
use App\Utils\WebResponse;

class PassengerController extends Controller
{
    protected PassengerContract $service;

    public function __construct(PassengerContract $service)
    {
        $this->service = $service;
    }
    public function fetch()
    {
        $allowedSorts = [
            'name',
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

    public function store(PassengerRequest $request)
    {
        $payload = $request->validated();
        $data = $this->service->create($payload);
        return WebResponse::response($data, 'dashboard.index');
    }

    public function update(PassengerRequest $request, $id)
    {
        $payload = $request->validated();
        $data = $this->service->update($id, $payload);
        return WebResponse::response($data, 'dashboard.index');
    }
}
