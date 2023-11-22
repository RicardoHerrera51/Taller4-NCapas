import axios from 'axios';

export const login = async (identifier, password) => {
    try {
        const response = await axios.post(`/auth/login`, {
            identifier: identifier,
            password: password,
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 200) {
            const { token } = response.data;
            return token;
        }

    } catch (error) {
        console.error("An error ocurred: ", error);
        throw error;
    }
}