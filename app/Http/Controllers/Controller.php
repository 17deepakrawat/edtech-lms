<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
abstract class Controller
{
    public static function handleImageUpdate(Request $request, $fieldName, $oldPath, $folder)
    {
        if ($request->hasFile($fieldName)) {           
            if ($oldPath && Storage::disk('public')->exists($oldPath)) {
                Storage::disk('public')->delete($oldPath);
            }            
            return $request->file($fieldName)->store($folder, 'public');
        }
        return $oldPath;
    }
}
