import axios from "axios";

const API_URL = process.env.REACT_APP_API_BASE_URL;

/*
    Login API

    1. Search user by email
    2. Compare password
    3. Return user (without password)
*/

export const loginUser = async (email, password) => {
    const response = await axios.get(
        `${API_URL}/users?email=${email}`
    );

    const users = response.data;

    if (users.length === 0) {
        throw new Error("User not found");
    }

    const user = users[0];

    if (user.password !== password) {
        throw new Error("Invalid password");
    }

    // remove password before returning

    const { password: _, ...userWithoutPassword } = user;

    return userWithoutPassword;
};