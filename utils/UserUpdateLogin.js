const UserUpdateLogin = (FailedLoginAttempts) => {

    const lockedUser = 24 * 60 * 60 * 1000;
    const loginAttemptSchema = new Date().getTime();
    const FailedToLoginTime = new Date(FailedLoginAttempts).getTime();

    return loginAttemptSchema - FailedToLoginTime >= lockedUser;
}

//         let user1 = await User.findByIdAndUpdate(user._id, {
//             failedLoginAttempts: user.failedLoginAttempts,
//             loginAttemptSchema: user.loginAttemptSchema,
//         });
//         return user1;
//     } catch (error) {
//         // console.error("Error updating user failed login info:", error);
//         throw new Error("Failed to update user failed login info");
//     }
// };
export default UserUpdateLogin;
