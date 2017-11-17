<?php

namespace App\Http\Controllers;

use App\Expert;
use App\Reports\ExpertSearchQuery;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ExpertController extends Controller
{
    public function top(Request $request)
    {
        $experts = Expert::where('isTopExpert', true)->orderBy('rating', 'desc')->get();

        return response()->json($experts);
    }

    public function search(Request $request)
    {

        $experts = app(ExpertSearchQuery::class)
            ->filterSection($request->input('section'))
            ->filterType($request->input('type'))
            ->filterCategory($request->input('category'))
            ->filterSubCategory($request->input('subcategory'))
            ->get();
        return response()->json($experts);
    }

    public function search2(Request $request)
    {

        $experts = Expert::paginate(5)
        ->filterSection($request->input('section'))
        ->filterType($request->input('type'))
        ->filterCategory($request->input('category'))
        ->filterSubCategory($request->input('subcategory'));
        return response()->json($experts);
    }

    public function show(Request $request)
    {
        $model = Auth::getProvider()->getModel();
        $id = ($model == 'App\Expert') ? Auth::user()->id : $request->id;

        $expert = Expert::with(['packages'])->withCount('reviews')->find($id)->makeVisible('bio');

        if($expert) {
            return response()->json($expert);
        }
        else {
            return response()->json(['error' => 'not found'], 404);
        }
    }
}
