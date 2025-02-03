<?php

namespace App\Notifications;

use App\Models\Task;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class TaskAssigned extends Notification
{
    use Queueable;
    public $task;

    /**
     * Create a new notification instance.
     */
    public function __construct(Task $task)
    {
        $task->load('maker');
        $this->task = $task;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        \Log::debug($this->task);
        return (new MailMessage)
                    ->subject('Assignment')
                    ->line('You have been assigned. Here are the details of the task.')
                    ->line("Title : {$this->task->title}")
                    ->line("Sender : {$this->task->maker->name}")
                    ->line("Due Data : {$this->task->due_date}");
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
