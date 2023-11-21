import { faUser } from "@fortawesome/free-regular-svg-icons"
import { faArrowRightFromBracket, faListUl } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useNavigate } from "react-router-dom";

{/* Sidebar on web */ }

function Sidebar() {
  const navigate = useNavigate();

  return (
    <section className="drawer-side">
      <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
      <ul className="menu p-4 w-80 min-h-full bg-gray-900 text-white text-base imprima-400 border-r-2 border-r-light-black">
        <img onClick={() => navigate('/')} src="/assets/logo.png" alt="logo" className="w-2/3 mx-3 mb-20 hover:cursor-pointer" />
        <li onClick={() => navigate('/my-pl')} className="rounded-lg hover:bg-dark-cyan active:bg-light-cyan">
          <a className="py-4 gap-6">
            <div className="flex justify-center items-center border-2 rounded-full w-7 h-7">
              <FontAwesomeIcon icon={faListUl} style={{ color: "#dffce5", }} />
            </div>
            Mis playlists
          </a>
        </li>
        <li onClick={() => navigate('/profile')} className="rounded-lg hover:bg-dark-cyan active:bg-light-cyan">
          <a className="py-4 gap-6">
            <div className="flex justify-center items-center border-2 rounded-full w-7 h-7">
              <FontAwesomeIcon icon={faUser} style={{ color: "#dffce5", }} />
            </div>
            Perfil
          </a>
        </li>
        <li onClick={() => navigate('/login')} className="rounded-lg hover:bg-dark-cyan active:bg-light-cyan">
          <a className="py-4 gap-6">
            <div className="flex justify-center items-center border-2 rounded-full w-7 h-7">
              <FontAwesomeIcon icon={faArrowRightFromBracket} style={{ color: "#dffce5", }} size="sm" />
            </div>
            Cerrar sesión
          </a>
        </li>
      </ul>

    </section>
  )
}

export default Sidebar