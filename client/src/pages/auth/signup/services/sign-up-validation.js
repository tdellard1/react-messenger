export default function signUpValidation(values) {
    const {password, confirmPass} = values;
    let errors = {};

    if (password.length < 6) {
        errors.password = 'Password must be 6 characters or longer';
    }

    if (confirmPass !== password) {
        errors.confirmPass = 'Passwords do not match';
    }

    return errors;
}
