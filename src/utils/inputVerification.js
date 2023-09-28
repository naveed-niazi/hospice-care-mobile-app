const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export const loginCredVerification = ({ email, password }) => {
    if (emailRegex.test(email) && password.length > 4)
        return { OK: true, error: "" };
    else return { OK: false, error: "Password or Email Error" };
};
