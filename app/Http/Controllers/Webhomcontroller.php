<?php

namespace App\Http\Controllers;

use App\Models\Banners;
use App\Models\Departments;
use App\Models\Feedbacks;
use App\Models\UniversityPartners;
use App\Models\Weoffers;
use App\Models\WebPlan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class Webhomcontroller extends Controller
{
    public function home()
    {
        // Banners
        $banners = Banners::where('status', 1)->get();
        //Banner end

        // // WeOffers
        $weoffers = Weoffers::where('status', 1)
            ->select('id', 'title', 'description', 'image', 'status')
            ->limit(4)
            ->get();
        //WeOffers end

        // Courses by Department → Program → Courses
        // $formattedData = Departments::where('status', 1)->with('programs','programs.courses')->get();
        $departments = Departments::where('status', 1)
            ->with(['programs.courses'])
            ->get();

        $formattedData = [];
        foreach ($departments as $department) {
            $deptName = $department->name;
            $formattedData[$deptName] = [];

            foreach ($department->programs as $program) {
                $progName = $program->name;

                $courses = $program->courses->map(function ($course) {
                    return [
                        'id' => $course->id,
                        'name' => $course->name,
                        'image' => $course->image,
                        'rating' => $course->rating,
                        'price'=> $course->price,
                    ];
                })->toArray();

                $formattedData[$deptName][$progName] = $courses;
            }
        }
        //category end
        //university partner
        $universityPartner = UniversityPartners::where('status', 1)
            ->select('id', 'name', 'image', 'link')
            ->get();
        //end university partner
        $webplan = WebPlan::where('status', 1)->limit(3)->get();
        $feedback= Feedbacks::where('status', 1)->get();
        // dd($univserityPartner);
        return Inertia::render('web-pages/Home', [
            'banners' => $banners,
            'categoryData' => $formattedData,
            'weoffers' => $weoffers,
            'universityPartner' => $universityPartner,
            'webplan'=> $webplan,
            'feedback'=> $feedback,
        ]);
    }   
}
