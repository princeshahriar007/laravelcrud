<?php

namespace App\repositories;

use App\interfaces\AuthInterface;
use App\Models\Project;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthRepository implements AuthInterface
{


    public function checkIfAuthenticated(Request $request)
    {
       if(Auth::attempt(['email' => $request->Email, 'password' => $request->Password])){
            return true;
       }else{
            return false;
       }
    }

    public function registerUser(Request $request)
    {
        $user = new User();
        $user->name = $request->Name;
        $user->email = $request->Email;
        $user->password = Hash::make($request->Password) ;
        $user->save();
        return $user;
    }

    public function findByEmailAddress($email)
    {
        $user = User::where('email', $email)->first();
        return $user;
    }

//    public function getLoginInfo($usrInfo){
//        $minutes = 1;
//        return cookie('loginInfo', $usrInfo, $minutes);
//    }

}
