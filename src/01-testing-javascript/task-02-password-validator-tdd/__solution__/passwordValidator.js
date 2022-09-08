export default function passwordValidator(password) {
    if (password.length < 8) {
        return "Password must be at least 8 characters long";
    }

    if (!password.match(/[0-9]/)) {
        return "Password must contain at least one number";
    }

    if (!password.match(/[a-z]/i)) {
        return "Password must contain at least one letter";
    }

    return;
}