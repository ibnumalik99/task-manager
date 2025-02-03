<?php

namespace App\Services;

use App\Models\Task;
use App\Models\TaskHistory;

class TaskService
{
    public function createHistory(Task $data)
    {
        $historyData = [
            'task_id' => $data->id,
            'title' => $data->title,
            'description' => $data->description,
            'assigned' => $data->assigned,
            'due_date' => $data->due_date,
            'status' => $data->status,
            'created_by' => $data->created_by,
        ];
        TaskHistory::create($historyData);
    }

    public function updateStatus(Task $data)
    {
        if ($data->assigned === auth()->id() || $data->created_by === auth()->id()) {
            if ($data->status === 'Pending') {
                $data->status = 'In Progress';
            } elseif ($data->status === 'In Progress') {
                $data->status = 'Completed';
            }

            $data->save();
            $this->createHistory($data);
        }
    }
}