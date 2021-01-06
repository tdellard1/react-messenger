export default function submitSignUp(values, callback) {
    const {username, email, password} = values;
    const requestOptions = {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            username: username,
            email: email,
            password: password
        })
    };

    fetch("register", requestOptions)
        .then(r => r.json())
        .then(response => {
            if (response.error) {
                // Create Toast
            } else {
                callback(response.user);
            }
        });
}
