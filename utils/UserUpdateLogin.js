const UserUpdateLogin = (FailedLoginAttempts) => {

    const lockedUser = 24 * 60 * 60 * 1000;
    const loginAttemptSchema = new Date().getTime();
    const FailedToLoginTime = new Date(FailedLoginAttempts).getTime();

    return loginAttemptSchema - FailedToLoginTime >= lockedUser;
}

export default UserUpdateLogin;
