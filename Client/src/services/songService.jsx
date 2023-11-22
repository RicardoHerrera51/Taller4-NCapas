import axios from "axios";

export const getSongs = async (token) => {
    try {
        const response = await axios.get(`/song/`, {
            headers: {
                'Authorization': `Bearer ${token}`
              }
        });
          
        // Check if the HTTP response is successful
        if (response.status === 200) {
          // The response data is already in JSON format
          return response.data;
        } else {
          return [];
        }
      } catch (error) {
        console.error("An error occurred:", error);
        return [];
      }
  }


  export const getPlaylist = async (token) => {
    try {
        const response = await axios.get(`/user/playlist`, {
            headers: {
                'Authorization': `Bearer ${token}`
              }
        });
          
        // Check if the HTTP response is successful
        if (response.status === 200) {
          // The response data is already in JSON format
          return response.data;
        } else {
          return [];
        }
      } catch (error) {
        console.error("An error occurred:", error);
        return [];
      }
  }

  export const getPlaylistbyID = async (token, playlistCode) => {
    try {
        const response = await axios.get(`/playlist/?playlistCode=${playlistCode}`, {
            headers: {
                'Authorization': `Bearer ${token}`
              }
        });
          
        // Check if the HTTP response is successful
        if (response.status === 200) {
          // The response data is already in JSON format
          return response.data;
        } else {
          return [];
        }
      } catch (error) {
        console.error("An error occurred:", error);
        return [];
      }
  }
