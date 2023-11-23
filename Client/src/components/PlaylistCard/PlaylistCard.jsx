import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

import {useEffect, useState} from "react";
import {deletePlaylist} from "../../services/songService";

export default function PlaylistCard({  title = "Titulo de playlist", getData, description = "Descripción", duration = "23:33", code = "" }) {
    const navigate = useNavigate();
    
  const [loading, setLoading] = useState(false);

    const handleTest = () => {
        console.log(title);
    };


    const deleteData = async () => {
        
        try {
          
          setLoading(true);
        let response = await deletePlaylist("eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtb3JhbGVzbWoiLCJpYXQiOjE3MDA2MzY3NDUsImV4cCI6MTcwMTkzMjc0NX0.pVCc7qqWreFX_o0q5cVOUHhHG60gYxRTL4YThe7SmNk", code);
        if (response) {
          console.log(response);
            getData();
        } 
        } catch (error) {
        console.error('Error al obtener datos de la API:', error);
        }
    };

    const handleDelete = () => {
        deleteData();
    };
    return (
        <div className="card flex justify-center lg:px-10 px-6 bg-light-blue w-full lg:w-11/12 lg:h-20">
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

