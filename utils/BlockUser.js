const isBlocked = (loginAttemptSchema) => {
    const lockoutDurationMs = 24 * 60 * 60 * 1000;
    const currentTime = new Date().getTime();
    const loginAttempt = new Date(loginAttemptSchema).getTime();
    return currentTime - loginAttempt >= lockoutDurationMs;
};
export default isBlocked;


