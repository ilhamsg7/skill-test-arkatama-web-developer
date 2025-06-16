<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class UserAuthMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string|null $role = null): Response
    {
        $roles = explode(',', $role);

        if (!Auth::guard("web")->check()) {
            return redirect(route('auth.login'));
        }

        $user = User::find(Auth::id());

        if ($role && !$user->hasRole($roles)) {
            abort(403, "You Cann't Access This Feature");
        }

        return $next($request);
    }
}
