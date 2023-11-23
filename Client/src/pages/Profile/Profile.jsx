import MusicBar from '../../components/Navbars/MusicBar';
import MobNavbar from '../../components/Navbars/MobNavbar';
import Sidebar from '../../components/Navbars/Sidebar';
import Titles from '../../components/Titles/Titles';
import { infoProfile } from '../../services/AuthServices';
import { useEffect, useState } from 'react';

export default function Profile() {
    const [profileData, setProfileData] = useState({
        username: "usuario",
        gmail: "correo@electronico.com",
        image: "https://i.pinimg.com/736x/c0/74/9b/c0749b7cc401421662ae901ec8f9f660.jpg"
    });

    const getData = async () => {
        try {
            const token = localStorage.getItem('token');
            const profileInfo = await infoProfile(token);
            
            setProfileData(profileInfo);
        } catch (error) {
            console.error('An error occurred while getting profile info:', error);
        }
    }

    useEffect(() => {
        getData();
      }, []);

    return (
        <div className="drawer lg:drawer-open bg-greenish-black">
            <input type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col max-h-screen">
                {/* Mobile navbar and music player bar */}
                <MobNavbar />
                <MusicBar />

                {/* Contenido*/}
                <main className="lg:flex-1 h-screen lg:h-full flex flex-col items-center imprima-400 text-white px-10 pt-10 pb-28 lg:p-10 gap-5 overflow-y-auto scrollbar">
                    <Titles title='Mi Perfil' />
                    {/* Profile details */}
                    <section className='grid lg:grid-cols-2 w-full justify-center gap-14 lg:gap-0 lg:px-10 px-15 pb-10'>
                        <div className='flex flex-col items-center gap-8 w-56'>
                            <div className="avatar">
                                <div className="w-40 lg:w-56 rounded-full border-2 border-gray">
                                    <img src={profileData.image || "https://i.pinimg.com/736x/c0/74/9b/c0749b7cc401421662ae901ec8f9f660.jpg"} alt="Profile" />
                                </div>
                            </div>
                            <button type='button' className="btn btn-sm w-40 h-9 lg:w-56 imprima-400 text-white hover:text-white active:text-white bg-light-green hover:bg-darkest-green active:bg-dark-green border-none rounded-full">Editar foto</button>
                        </div>
                        <div className='flex flex-col justify-center items-center lg:items-start text-xl imprima-400 text-white lg:text-2xl lg:p-0'>
                            <a>{profileData.username}</a>
                            <a>{profileData.gmail}</a>
                        </div>
                    </section>
                </main>
            </div>

            {/* Sidebar on web */}
            <Sidebar />
        </div>
    )
}
