import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { useState, useEffect } from 'react';

export default function MusicPlayer({ audio = "https://dl.dropboxusercontent.com/scl/fi/wu8s3zznqq2ttspjb5p1h/Vaundy-Odoriko.mp3?rlkey=623mx9g1osg2td9509t1c8aph&dl=0" }) {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 600);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <AudioPlayer
            autoPlay
            src={audio}
            customAdditionalControls={[]}
            style={isMobile ? { backgroundColor: 'inherit', color: '#ffffff', width: '40%', paddingRight: 0 } : { backgroundColor: 'inherit ', color: '#ffffff', width: '70%', paddingRight: 0 }}
            layout={'horizontal'}
            customProgressBarSection={isMobile ? [] : ['PROGRESS_BAR']}
            customVolumeControls={[]}
        />
    )
}
