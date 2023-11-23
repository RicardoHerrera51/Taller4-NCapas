import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/AuthServices";

{/* Mobile navbar */ }

export default function MobNavbar() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const token = await logout(localStorage.getItem('token'));

            console.log('Logout successful', token);
            navigate('/login');
        } catch (error) {
            console.error('Logout failed', error);
        }
    }

    return (
        <section className="navbar lg:hidden bg-gray-900 max-w-full">
            <div className="flex-1">
                <img onClick={() => navigate('/')} src="/assets/logo.png" alt="logo" className="w-40 mx-3" />
            </div>
            <div className="dropdown dropdown-end flex-none z-50">
                <details>
                    <summary tabIndex={0} className="btn btn-ghost btn-circle">
                        <FontAwesomeIcon icon={faEllipsisVertical} style={{ color: "#dffce5", }} />
                    </summary>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-light-black text-white rounded-box w-36">
                        <li onClick={() => navigate('/my-pl')}><a className="flex justify-center py-2 hover:bg-light-cyan">Mis playlists</a></li>
                        <li onClick={() => navigate('/profile')}><a className="flex justify-center py-2 hover:bg-light-cyan">Perfil</a></li>
                        <li onClick={handleLogout}><a className="flex justify-center py-2 hover:bg-light-cyan">Cerrar sesión</a></li>
                    </ul>
                </details>
            </div>
        </section>
    )
}
