<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>SiPintar — Sistem Terpusat Informasi & Navigasi Terpadu Akademik Responsif</title>
    
    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
</head>
<body class="bg-slate-50 text-slate-800 antialiased min-h-screen">
    <div id="root"></div>
</body>
</html>
