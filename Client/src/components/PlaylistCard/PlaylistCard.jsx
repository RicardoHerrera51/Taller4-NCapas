import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

export default function PlaylistCard() {
    const navigate = useNavigate();
    return (
        <div className="card flex justify-center lg:px-10 px-6 bg-light-blue w-full lg:w-11/12 lg:h-20 hover:cursor-pointer">
            <div onClick={() => navigate('/pl-details')} className="flex flex-row items-center justify-between py-4"> {/* Arreglar la navegación */}
                <a>Título de playlist</a>
                <a className='hidden lg:block'>Descripción</a>
                <a className='hidden lg:block'>23:33</a>
                <div>
                    <button className="btn btn-xs h-8 w-8 border-none rounded-full bg-light-cyan hover:bg-darkest-cyan active:bg-dark-cyan">
                        <FontAwesomeIcon icon={faTrash} style={{ color: "#ffffff", }} size='sm' />
                    </button>
                </div>
            </div>
        </div>
    )
}
