<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function maker()
    {
        return $this->hasOne(User::class, 'id', 'created_by');
    }

    public function recipient()
    {
        return $this->hasOne(User::class, 'id', 'assigned');
    }
}
