<h1 style="text-align:center; font-weight:bolder;">Catatan Sebelum Melakukan Git Clone</h1>

## Beberapa Catatan Terkait Penggunaan Repository Ini

1. Silahkan melakukan kloning pada repository ini dengan melakukan copy url repository

2. Setelah melakukan kloning ketikan di terminal perintah berikut. Bertujuan agar APP KEY update otomatis dan vendor akan terinstal serta .env akan terbentuk. Jangan lupa lakukan konfigurasi pada database seperti username, password, host, dan database name
    ```shell
       composer install
    ```
    ```shell
       cp .env.example .env
    ```
    ```shell
       php artisan key:generate
    ```
    ```shell
       php artisan migrate --seed
    ```
3. Untuk mekanisme react dan inertia, silahkan jalankan perintah berikut
    ```shell
        bun install
    ```
4. Untuk menjalankan keseluruhan project, jalankan perintah berikut
    ```shell
        bun run dev
    ```
    ```shell
       php -S localhost:80 -t public
    ```
5. Default akun login adalah sebagai berikut
    ```
    email: superadmin@gmail.com
    password: password
    ```
