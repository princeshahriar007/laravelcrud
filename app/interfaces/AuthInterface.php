<?php

namespace App\interfaces;

use Illuminate\Http\Request;

interface AuthInterface
{
    /**
     * checkIfAuthenticated
     *
     * Check if an user is authenticated or not by request
     *
     * @param Request $request
     * @return bool -> true if authenticated, flase if not
     */
    public function checkIfAuthenticated(Request $request);

    /**
     * registerUser
     *
     * Register a user by Request form
     *
     * @param Request $request
     * @return obj -> $user object
     */
    public function registerUser(Request $request);

    /**
     * findByEmailAddress
     *
     * Find an user by email address
     *
     * @param strin $email
     * @return obj -> $user object
     */
    public function findByEmailAddress($email);
}
