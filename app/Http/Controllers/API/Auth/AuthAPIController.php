<?php

namespace App\Http\Controllers\API\Auth;

use App\Http\Controllers\Controller;
use App\repositories\AuthRepository;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AuthAPIController extends Controller
{
    public $authRepository;

    public function __construct(AuthRepository $authRepository)
    {
        $this->authRepository = $authRepository;

    }

    public function createToken(){
        $user = User::first();
        $accessToken = $user->createToken('Token Name')->accessToken;
        return $accessToken;
    }

    public function login(Request $request)
    {
        $form_data = $request->all();
        $validator = Validator::make($form_data, [
            'Email' => 'required',
            'Password' => 'required',
        ], [
            'Email.required' => 'Please give a email',
            'Password.required' => 'Please give a password',
        ]);

        if ($validator->fails()) {
            return response()->json([
                "success" => false,
                "error" => $validator->getMessageBag()
            ]);
        }

        if($this->authRepository->checkIfAuthenticated($request)){
            $user = $this->authRepository->findByEmailAddress($request->Email);
            $accessToken = $user->createToken('authToken')->accessToken;

            return response()->json([
                'success' => true,
                'message' => 'Logged in successfully',
                'user' => $user,
                'access_token' => $accessToken,
            ]);;
        }else{
            return response()->json([
                'success' => false,
                'message' => 'Sorry invalid email or password',
            ]);

        }

    }

    public function register(Request $request)
    {
        $form_data = $request->all();
        $validator = Validator::make($form_data, [
            'Name' => 'required|min:3|max:30',
            'Email' => 'required|email|max:100|unique:users',
            'Password' => 'required|confirmed|min:8',
        ], [
            'Name.required' => 'Please give your name',
            'Email.required' => 'Please give your email',
            'Email.unique' => 'This email address is already in use, use something else',
            'Password.required' => 'Please give a password',
        ]);

        if ($validator->fails()) {
            return response()->json([
                "success" => false,
                "error" => $validator->getMessageBag()
            ]);
        }

        $user = $this->authRepository->registerUser($request);
        if(!is_null($user)){
            $user = $this->authRepository->findByEmailAddress($request->Email);
            $accessToken = $user->createToken('authToken')->accessToken;
            return response()->json([
                'success' => true,
                'message' => 'Registered successfully',
                'user' => $user,
                'access_token' => $accessToken,
            ]);
        }else{
            return response()->json([
                'success' => false,
                'user' => $user,
                'message' => 'Sorry Registration was not successful',
            ]);
        }

    }

}
