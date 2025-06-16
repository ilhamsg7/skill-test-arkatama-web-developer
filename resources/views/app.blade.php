<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Travel Management System">
    <meta name="author" content="Sahabat Travel">
    <meta name="keywords" content="travel, sahabat, perjalanan">

    <title inertia>Sahabat Travel</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,300..900;1,300..900&display=swap" rel="stylesheet">

    <link rel="icon" type="image/svg+xml" href="/assets/icon-bar.svg">
    <link rel="apple-touch-icon" href="/assets/icon-bar.svg">

    <style>
        * {
            font-family: "Figtree", serif !important;
            font-optical-sizing: auto !important;
        }
    </style>

    <!-- Scripts -->
    @viteReactRefresh
    @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
    @inertiaHead
</head>

<body class="font-sans antialiased">
    @inertia
</body>

</html>
