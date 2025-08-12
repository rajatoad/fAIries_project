import axios from 'axios';
import React from 'react'

function RegisterComponent() {

    const formSubmitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        // Handle form submission logic here, e.g., send data to the server
        const formData = new FormData(event.target as HTMLFormElement);
        const username = formData.get('username');
        const password = formData.get('password');
        // const confirmPassword = formData.get('confirm-password');
        console.log('Form submitted:', { username, password });

        axios.post('http://localhost:3000/users/register', {
            username: username,
            password: password
        }).then(response => {
            console.log('User registered successfully:', response.data);
            // Optionally redirect or update UI after successful registration
        }).catch(error => {
            console.error('Error registering user:', error);
            // Handle error, e.g., show an error message to the user
        });
    }

  return (
    <>
        <h1>Register User</h1>
        <form onSubmit={formSubmitHandler}>
            <div>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" required />
            </div>
            <div>
                <label htmlFor="password">Password:</label> 
                <input type="password" id="password" name="password" required />
            </div>
            {/* <div>
                <label htmlFor="confirm-password">Confirm Password:</label>
                <input type="password" id="confirm-password" name="confirm-password" required />
            </div> */}
            <button type="submit">Register</button>
        </form>
        {/* <p>Already have an account? <a href="/login">Login here</a></p> */}
    </>
  )
}

export default RegisterComponent