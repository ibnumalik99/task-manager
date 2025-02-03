<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\Task\TaskRequest;
use App\Models\Task;
use App\Models\User;
use App\Notifications\TaskAssigned;
use App\Services\HistoryService;
use App\Services\TaskService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Task/Index', [
            'users' => User::get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(TaskRequest $request)
    {
        $taskService = new TaskService();
        $data = [
            'title' => $request['title'],
            'description' => $request['description'],
            'assigned' => $request['assigned'],
            'due_date' => $request['due_date'],
            'status' => 'Pending',
            'created_by' => Auth::user()->id
        ];

        $task = Task::create($data);
        if ($task->recipient) {
            $task->recipient->notify(new TaskAssigned($task));
        }
        $taskService->createHistory($task);
        DB::commit();
        return redirect()->route('dashboard');
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        $task->load(['maker', 'recipient']);
        return Inertia::render('Task/Show', [
            'record' => $task,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        $task->load(['maker', 'recipient']);
        return Inertia::render('Task/Index', [
            'users' => User::get(),
            'record' => $task
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(TaskRequest $request, Task $task)
    {
        $sendNotify = $request['assigned'] && $task->assigned != $request['assigned'] && $request['assigned'] != auth()->id();
        $taskService = new TaskService();

        $task->title = $request['title'];
        $task->description = $request['description'];
        $task->assigned = $request['assigned'];
        $task->due_date = $request['due_date'];
        $task->save();

        if ($sendNotify) {
            $task->recipient->notify(new TaskAssigned($task));
        }

        $taskService->createHistory($task);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        $task->delete();
        return redirect()->route('dashboard');
    }

    public function updateStatus(Task $task)
    {
        $taskService = new TaskService();
        $taskService->updateStatus($task);
        // $taskService->createHistory($task);
        return redirect()->route('dashboard');
    }
}
