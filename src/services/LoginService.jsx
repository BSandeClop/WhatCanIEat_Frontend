import axios from "axios";


export const getJwt = (username, password) => {
    try {
        localStorage.clear();
        const response = axios(
            {
                url: "https://whatcanieat-backend.herokuapp.com/auth",
                method: 'post',
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json"
                },
                data: {
                    "username": username, 
                    "password": password
                }
            }
        )

        return response;
    } catch (error) {
        throw error;
    }
}