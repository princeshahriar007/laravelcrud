<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\repositories\ProjectRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProjectsController extends Controller
{
    public $projectRepository;

    public function __construct(ProjectRepository $projectRepository)
    {
        $this->projectRepository = $projectRepository;
    }

    /**
     * index() Get all project List
     *
     * @return response
     */

    public function index()
    {
        $projects = $this->projectRepository->getAll();
        return response()->json([
            "success" => true,
            "message" => "Project List",
            "data" => $projects
        ]);
    }

    /**
     * show() Get all project List
     *
     * @param integer $id
     * @return response
     */

    public function show($id)
    {
        $project = $this->projectRepository->findById($id);
        if (is_null($project)) {
            return response()->json([
                "success" => false,
                "message" => "Project Details",
                "data" => null
            ]);
        }
        return response()->json([
            "success" => true,
            "message" => "Project Details",
            "data" => $project
        ]);
    }

    /**
     * store() Get all project List
     *
     * @param Request $request
     * @return response
     */

    public function store(Request $request)
    {
        $form_data = $request->all();
        $validator = Validator::make($form_data, [
            'name' => 'required',
            'description' => 'required',
            'user_id' => 'required',
        ], [
            'name.required' => 'Please give a name',
            'description.required' => 'Please give a description',
        ]);

        if ($validator->fails()) {
            return response()->json([
                "success" => false,
                "error" => $validator->getMessageBag()
            ]);
        }

        $project = $this->projectRepository->create($request);

        return response()->json([
            "success" => true,
            "message" => "Project Details",
            "data" => $project
        ]);
    }

    /**
     * update() Get all project List
     *
     * @param Request $request
     * @param integer $id
     * @return response
     */

    public function update(Request $request, $id)
    {
        $project = $this->projectRepository->findById($id);
        if (is_null($project)) {
            return response()->json([
                'success' => false,
                'message' => "Project not found",
                'data' => null
            ]);
        }
        $form_data = $request->all();
        $validator = Validator::make($form_data, [
            'name' => 'required',
            'description' => 'required',
            'user_id' => 'required',
        ], [
            'name.required' => 'Please give a name',
            'description.required' => 'Please give a description',
        ]);

        if ($validator->fails()) {
            return response()->json([
                "success" => false,
                "error" => $validator->getMessageBag()
            ]);
        }

        $project = $this->projectRepository->edit($request, $id);

        return response()->json([
            "success" => true,
            "message" => "Project Updated",
            "data" => $project
        ]);
    }

    /**
     * destroy() Get all project List
     *
     * @param integer $id
     * @return response
     */

    public function destroy($id)
    {
        $project = $this->projectRepository->findById($id);
        if (is_null($project)) {
            return response()->json([
                'success' => false,
                'message' => "Project not found",
                'data' => null
            ]);
        }

        $project = $this->projectRepository->delete($id);

        return response()->json([
            "success" => true,
            "message" => "Project Deleted",
            "data" => $project
        ]);
    }
}
