import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SongCard() {
    return (
        <div className="card flex justify-center md:pr-10 pr-6 bg-light-blue text-sm md:text-base w-full lg:w-11/12 h-20 lg:h-20 hover:cursor-pointer">
            <div className="flex flex-row items-center py-4 gap-4">
                <div className="avatar left-0">
                    <div className="w-20 rounded-l-xl">
                        <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                    </div>
                </div>
                <div className='flex flex-row md:flex-row items-center justify-between w-full'>
                    <div className='flex flex-col md:flex-row justify-center lg:pl-10 md:gap-8 w-fit md:w-fit'>
                        <a>Canción</a>
                        <a>Artista</a>
                    </div>
                    <div className='flex flex-row items-center justify-end gap-2 md:gap-8 w-fit'>
                        <a>3:33</a>
                        <div className='dropdown dropdown-end flex-none'>
                            <details>
                                <summary tabIndex={0} className="btn btn-xs h-8 w-8 border-none rounded-full bg-light-cyan hover:bg-darkest-cyan active:bg-dark-cyan">
                                    <FontAwesomeIcon icon={faEllipsisVertical} style={{ color: "#dffce5", }} size='sm' />
                                </summary>
                                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-1 z-10 p-2 bg-light-black text-white rounded-box w-36">
                                    <li className="z-50">
                                        <details>
                                            <summary tabIndex={0} className=" hover:bg-light-cyan">Agregar a playlist</summary>
                                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 bg-light-black text-white rounded-box w-36">
                                                <li><a className="flex break-words justify-center py-1 hover:bg-light-cyan">Titulo de playlist</a></li>
                                                <li><a className="flex break-words justify-center py-1 hover:bg-light-cyan">Titulo de playlist</a></li>
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
