<?php

namespace App\repositories;

use App\interfaces\ProjectInterface;
use App\Models\Project;
use Illuminate\Http\Request;

class ProjectRepository implements ProjectInterface
{

    public function getAll()
    {
        //$user_check = Auth::check();
        //dd($user_check);
        //this is the hardcoded user_id
        $user_id = 1;
        //dd($user_id);
        $projects = Project::where('user_id', $user_id)->withCount('tasks')->with('tasks')->orderBy("id", "desc")->get();
        return $projects;
    }

    public function findById($id)
    {
        $project = Project::with('tasks')
            ->find($id);
        return $project;
    }

    public function create(Request $request)
    {
        $project = new Project();
        $project->name = $request->name;
        $project->description = $request->description;
        $project->user_id = $request->user_id;
        $project->save();
        return $project;
    }

    public function edit(Request $request, $id)
    {
        $project = $this->findById($id);;
        $project->name = $request->name;
        $project->description = $request->description;
        $project->user_id = $request->user_id;
        $project->status = $request->status;
        $project->save();
        return $project;
    }

    public function delete($id)
    {
        $project = $this->findById($id);
        $project->tasks()->delete();
        $project->delete();
        return $project;
    }
}
