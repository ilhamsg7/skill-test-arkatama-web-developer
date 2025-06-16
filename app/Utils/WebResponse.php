<?php

namespace App\Utils;
use Exception;

class WebResponse
{
    public static function base($message = '', $status = 200, $redirectRoute = null, $routeParam = null)
    {
        if ($status != 200) $message = sprintf('%s. %s', $status, $message);
        if ($redirectRoute != null) return redirect()->route($redirectRoute, $routeParam)->with('message', $message)->setStatusCode($status);

        if ($status != 200) return redirect()->back()->withInput()->with('message', $message)->with('errorNotification', $message)->setStatusCode($status);

        return redirect()->back()->with('message', $message)->setStatusCode($status);
    }

    public static function response($result, $messageSuccess = '', $redirectRoute = null, $routeParam = null)
    {
        if ($result instanceof Exception) {
            return WebResponse::base($result->getMessage(), 400);
        } else {
            return WebResponse::base(ucwords($messageSuccess), 200, $redirectRoute, $routeParam);
        }
    }
}
