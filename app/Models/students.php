<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;
use Spatie\Permission\Traits\HasPermissions;

class students extends Authenticatable
{
    use HasFactory, Notifiable, HasRoles, HasPermissions;
     protected $guard_name = 'student';
    protected $fillable = ['first_name', 'middle_name', 'last_name', 'email', 'password', 'dob', 'mobile'];
    protected $hidden = [
        'password',      
    ];

        protected $appends = ['name'];
    public function getNameAttribute(): string
{
    return collect([$this->first_name, $this->middle_name, $this->last_name])
        ->filter() // Remove null or empty values
        ->implode(' ');
}
}
