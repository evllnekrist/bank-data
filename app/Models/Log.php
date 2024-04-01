<?php

namespace App\Models;

// use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
// use Illuminate\Database\Eloquent\SoftDeletes;

class Log extends Model
{
    // use HasFactory;
    // use SoftDeletes;
    protected $table = 'logs';
    protected $fillable = [
        'subject',
        'description',
        'request',
        'response',
        'created_at',
        'created_by',
    ];
}
