import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

export default function PlaylistCard({ title = "Titulo de playlist", description = "Descripción", duration = "23:33", code = "" }) {
    const navigate = useNavigate();

    const handleTest = () => {
        console.log(title);
    };

    return (
        <div className="card flex justify-center lg:px-10 px-6 bg-light-blue w-full lg:w-11/12 lg:h-20">
            <div className="flex flex-row items-center justify-between py-2"> {/* Arreglar la navegación */}
                <div onClick={() => navigate(`/my-pl/${code}`)} className="flex w-full py-2 justify-between hover:cursor-pointer">
                    <a>{title}</a>
                    <a className='hidden lg:block'>{description}</a>
                </div>
                <div className="pl-4">
                    <button className="btn btn-xs h-8 w-8 border-none rounded-full bg-light-cyan hover:bg-darkest-cyan active:bg-dark-cyan">
                        <FontAwesomeIcon icon={faTrash} style={{ color: "#ffffff", }} size='sm' />
                    </button>
                </div>

            </div>
        </div>
    )
}

