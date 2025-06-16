<?php

namespace App\Http\Controllers;

use App\Contract\TravelContract;
use App\Http\Requests\TravelRequest;
use App\Utils\WebResponse;

class TravelController extends Controller
{
    protected TravelContract $service;

    public function __construct(TravelContract $service)
    {
        $this->service = $service;
    }
    public function fetch()
    {
        $allowedSorts = [
            'id',
            'name'
        ];

        $data = $this->service->all(
            allowedFilters: ['id', 'name'],
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
        return WebResponse::response($data, 'Created Data Success', 'dashboard.index');
    }

    public function update(TravelRequest $request, $id)
    {
        $payload = $request->validated();
        $data = $this->service->update($id, $payload);
        return WebResponse::response($data, 'Updated Data Success','dashboard.index');
    }
}
