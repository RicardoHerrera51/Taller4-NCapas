import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { getPlaylist, addSongToPlaylist } from "../../services/songService";
import { useEffect, useState } from "react";

export default function SongCard({ cover, code, song = "Canción", artist = "Artista", duration = "3:33", onClick }) {
  const token = localStorage.getItem('token');
  const [loading, setLoading] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const getData = async () => {
        try {
          setLoading(true);
          let response = await getPlaylist(token);

          if (response) {
            setPlaylists(response.content);
            console.log(response.content);

            setLoading(false);
          }
        } catch (error) {
          setError(true);
          console.error('Error al obtener datos de la API:', error);
        }
      };

      const postData = async (playlist) => {
        try {
          setLoading(true);
          let response = await addSongToPlaylist(token, playlist, code);

          if (response) {
            console.log(response);
            if (response === "Se agrego la cancion correctamente") {
              setSuccess(true);
              console.log("Success");
              setTimeout(() => {
                setSuccess(false);
              }, 1000);
            }
            else {
              setError(true);
              console.log("Error");
              setTimeout(() => {
                setError(false);
              }, 1000);
            }
            setLoading(false);
          }
        } catch (error) {

          console.error('Error al obtener datos de la API:', error);
        }
      };

      const handleTest = () => {
        console.log(playlists.code);
      };

      const handleSelectedPlaylist = (playlist) => {
        console.log(playlist);
        console.log(code);
        postData(playlist);
      };

      useEffect(() => {
      }, []);

      return (
        <div className="card flex justify-center md:pr-10 pr-6 bg-light-blue text-sm md:text-base w-full lg:w-11/12 h-20 lg:h-20">
          {success && <span className="absolute -top-5 right-0 text-light-blue">Canción agregada exitosamente</span>}
          {error && <span className="absolute -top-5 right-0 text-warning">La canción ya se encuentra en la playlist</span>}
          <div className="flex flex-row items-center py-4 gap-4">
            <div className="avatar left-0 hover:cursor-pointer">
              <div className="w-20 rounded-l-xl">
                <img src={cover} onClick={() => onClick()} />
              </div>
            </div>
            <div className='flex flex-row md:flex-row items-center justify-between w-full'>
              <div className='flex flex-col md:flex-row justify-center lg:pl-10 md:gap-8 w-fit md:w-fit'>
                <a onClick={handleTest}>{song}</a>
                <a>{artist}</a>
              </div>
              <div className='flex flex-row items-center justify-end gap-2 md:gap-8 w-fit'>
                <a>{duration}</a>
                <div className='dropdown dropdown-end flex-none'>
                  <details>
                    <summary tabIndex={0} className="btn btn-xs h-8 w-8 border-none rounded-full bg-light-cyan hover:bg-darkest-cyan active:bg-dark-cyan">
                      <FontAwesomeIcon icon={faEllipsisVertical} style={{ color: "#dffce5", }} size='sm' />
                    </summary>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-1 z-10 p-2 bg-light-black text-white rounded-box w-44">
                      <li className="z-50">
                        <details>
                          <summary onClick={getData} tabIndex={0} className=" hover:bg-light-cyan">Agregar a playlist</summary>
                          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 bg-light-black text-white rounded-box w-44">

                            {loading && <li><a className="flex break-words justify-center py-1">Cargando...</a></li>}
                            {playlists.map((playlist) => (
                              <li onClick={() => handleSelectedPlaylist(playlist.code)} key={playlist.code}>
                                <a className="flex break-words justify-center py-1 hover:bg-light-cyan">{playlist.title}</a>
                              </li>
                            ))}
                          </ul>
                        </details>
                      </li>
                    </ul>
                  </details>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
