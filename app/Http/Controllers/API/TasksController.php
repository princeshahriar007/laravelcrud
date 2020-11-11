<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\repositories\TaskRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TasksController extends Controller
{
    public $taskRepository;

    public function __construct(TaskRepository $taskRepository)
    {
        $this->taskRepository = $taskRepository;
    }

    /**
     * index() Get all task List
     *
     * @return response
     */

    public function index()
    {
        $tasks = $this->taskRepository->getAll();
        return response()->json([
            "success" => true,
            "message" => "task List",
            "data" => $tasks
        ]);
    }

    /**
     * show() Get all task List
     *
     * @param integer $id
     * @return response
     */

    public function show($id)
    {
        $task = $this->taskRepository->findById($id);
        if (is_null($task)) {
            return response()->json([
                "success" => false,
                "message" => "task Details",
                "data" => null
            ]);
        }
        return response()->json([
            "success" => true,
            "message" => "task Details",
            "data" => $task
        ]);
    }

    /**
     * store() Get all task List
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
            'project_id' => 'required',
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

        $task = $this->taskRepository->create($request);

        return response()->json([
            "success" => true,
            "message" => "task Details",
            "data" => $task
        ]);
    }

    /**
     * update() Get all task List
     *
     * @param Request $request
     * @param integer $id
     * @return response
     */

    public function update(Request $request, $id)
    {
        $task = $this->taskRepository->findById($id);
        if (is_null($task)) {
            return response()->json([
                'success' => false,
                'message' => "task not found",
                'data' => null
            ]);
        }
        $form_data = $request->all();
        $validator = Validator::make($form_data, [
            'name' => 'required',
            'description' => 'required',
            'project_id' => 'required',
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

        $task = $this->taskRepository->edit($request, $id);

        return response()->json([
            "success" => true,
            "message" => "task Updated",
            "data" => $task
        ]);
    }

    /**
     * destroy() Get all task List
     *
     * @param integer $id
     * @return response
     */

    public function destroy($id)
    {
        $task = $this->taskRepository->findById($id);
        if (is_null($task)) {
            return response()->json([
                'success' => false,
                'message' => "task not found",
                'data' => null
            ]);
        }

        $task = $this->taskRepository->delete($id);

        return response()->json([
            "success" => true,
            "message" => "task Deleted",
            "data" => $task
        ]);
    }
}
