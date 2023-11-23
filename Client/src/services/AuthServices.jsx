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

export const logout = async (token) => {
    try {
        const response = await axios.post(`auth/logout`, {},
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );

        if (response.status === 200) {
            return null;
        } else {
            throw new Error(`Failed to log in. Please try again.`);
        }
    } catch (error) {
        console.error("An error ocurred: ", error);
        throw error;
    }
}

export const register = async (username, email, password) => {
    try {
        const response = await axios.post(`/auth/signup`, {
            username: username,
            email: email,
            password: password,
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 200) {
            const { token } = response.data;
            return token;
        } else {
            throw new Error(`Failed to register. Please try again.`);
        }

    } catch (error) {
        if (axios.isAxiosError(error) && error.response && error.response.status === 409) {
            throw new Error("This account already exists.");
        } else {
            console.error("An error occurred: ", error);
            throw error;
        }
    }
}

export const infoProfile = async (token) => {
    try {
        const response = await axios.get(`/auth/profile`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.status === 200) {
            return response.data;
        } else {
            return [];
        }
    } catch (error) {
        console.error('An error occurred while fetching profile information:', error);
        throw error;
    }
}