<?php

namespace Database\Seeders;

use App\Models\Task;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Task::create([
            'title' => 'Title 1',
            'description' => 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil assumenda incidunt quo et, cum, fuga sapiente quas natus consequuntur dicta amet ipsum consequatur delectus molestias dolorem vitae quos perspiciatis minus.',
            'status' => 'Pending',
            'created_by' => 1,
            'assigned' => 2
        ]);

        Task::create([
            'title' => 'Title 2',
            'description' => 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil assumenda incidunt quo et, cum, fuga sapiente quas natus consequuntur dicta amet ipsum consequatur delectus molestias dolorem vitae quos perspiciatis minus.',
            'status' => 'Pending',
            'created_by' => 1,
            'assigned' => 2
        ]);

        Task::create([
            'title' => 'Title 3',
            'description' => 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil assumenda incidunt quo et, cum, fuga sapiente quas natus consequuntur dicta amet ipsum consequatur delectus molestias dolorem vitae quos perspiciatis minus.',
            'status' => 'Pending',
            'created_by' => 1,
            'assigned' => 2
        ]);
    }
}
