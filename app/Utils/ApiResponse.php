<?php

namespace App\Utils;

use Illuminate\Http\JsonResponse;
use Exception;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Exceptions\HttpResponseException;
use Symfony\Component\Routing\Exception\MethodNotAllowedException;

class ApiResponse
{
    public static function base($data, $message = '', $status = 200, $useNotify = false): JsonResponse
    {
        if($useNotify) {
            session()->flash('notify', $data);
        }

        return response()->json([
            "message" => $message,
            "data" => $data,
        ], $status);
    }

    public static function response($result, $messageSuccess = ''): JsonResponse
    {
        if ($result instanceof AuthorizationException) {
            return ApiResponse::base(null, $result->getMessage(), 401);
        }  else if ($result instanceof ModelNotFoundException) {
            return ApiResponse::base(null, $result->getMessage(), 404);
        } else if ($result instanceof MethodNotAllowedException) {
            return ApiResponse::base(null, $result->getMessage(), 405);
        } else if ($result instanceof Exception) {
            return ApiResponse::base(null, $result->getMessage(), 400);
        } else if ($result instanceof HttpResponseException) {
            return ApiResponse::base(null, $result->getMessage(), 422);
        } else {
            if (is_array($result) && isset($result['message'])) {
                return ApiResponse::base(null, $result['message']);
            }
            return ApiResponse::base($result, $messageSuccess);
        }
    }
}
