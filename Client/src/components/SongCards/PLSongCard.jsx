import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function PLSongCard({ cover = "https://lastfm.freetls.fastly.net/i/u/500x500/42851f3f78390ec7f5bacd31c761c681.jpg", song = "Canción", artist = "Artista", duration = "3:33", onClick, }) {
    return (
        <div className="card flex justify-center md:pr-10 pr-6 bg-light-blue text-sm md:text-base w-full lg:w-11/12 h-20 lg:h-20">
            <div className="flex flex-row items-center py-4 gap-4">
                <div className="avatar left-0 hover:cursor-pointer">
                    <div className="w-20 rounded-l-xl">
                        <img onClick={() => onClick()} src={cover} />
                    </div>
                </div>
                <div className='flex flex-row md:flex-row items-center justify-between w-full'>
                    <div className='flex flex-col md:flex-row justify-center lg:pl-10 md:gap-8 w-fit md:w-fit'>
                        <a>{song}</a>
                        <a>{artist}</a>
                    </div>
                    <div className='flex flex-row items-center justify-end gap-2 md:gap-8 w-fit'>
                        <a>{duration}</a>
                        <button className="btn btn-xs h-8 w-8 border-none rounded-full bg-light-cyan hover:bg-darkest-cyan active:bg-dark-cyan">
                            <FontAwesomeIcon icon={faTrash} style={{ color: "#ffffff", }} size='sm' />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
