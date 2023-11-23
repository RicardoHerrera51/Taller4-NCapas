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
          console.log(response.data);
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

  export const addSongToPlaylist = async (token, playlistCode, songCode) => {
    try {
        const response = await axios.post(`/playlist/?playlistCode=${playlistCode}` , 
        {
          codeSong: songCode
      }, 
      {
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

  export const deletePlaylist = async (token, playlistCode) => {
    try {
        const response = await axios.delete(`/playlist/delete?playlistCode=${playlistCode}`, {
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