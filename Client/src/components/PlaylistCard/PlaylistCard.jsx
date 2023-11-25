import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { deletePlaylist } from "../../services/songService";

export default function PlaylistCard({ title = "Titulo de playlist", getData, description = "Descripción", code = "" }) {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [loading, setLoading] = useState(false);
    const [deleteError, setDeleteError] = useState(null);

    const deleteData = async () => {
        try {
            setLoading(true);
            let response = await deletePlaylist(token, code);
            if (response) {
                console.log(response);
                getData();
                setDeleteError("La playlist fue borrada");
            }
        } catch (error) {
            console.error('Error al obtener datos de la API:', error);
            setDeleteError("La playlist no pudo eliminarse");
        }
    };

    const handleDelete = () => {
        deleteData();
    };

    return (
        <div className="card flex justify-center lg:px-10 px-6 bg-light-blue w-full text-sm md:text-base lg:w-11/12 lg:h-20">
            {deleteError && (
                <span className='absolute -top-5 right-0 text-light-blue text-sm imprima-700 italic pr-2'>{deleteError}</span>
            )}
            <div className="flex flex-row items-center justify-between py-2"> {/* Arreglar la navegación */}
                <div onClick={() => navigate(`/my-pl/${code}`)} className="flex w-full py-2 justify-between hover:cursor-pointer">
                    <a>{title}</a>
                    <a className='hidden lg:block'>{description}</a>
                </div>
                <div className="pl-4">
                    <button onClick={handleDelete} className="btn btn-xs h-8 w-8 border-none rounded-full bg-light-cyan hover:bg-darkest-cyan active:bg-dark-cyan">
                        <FontAwesomeIcon icon={faTrash} style={{ color: "#ffffff", }} size='sm' />
                    </button>
                </div>

            </div>
        </div>
    )
}

