import { useLocation } from 'react-router-dom'
import Controls from './Controls'
import { useState, useEffect } from 'react';
import SongDetails from './SongDetails';

const MusicPlayer = () => {
    const location = useLocation()
    const {code, title, duration, audioRef} = location.state

    const [currentTime, setCurrentTime] = useState(0);
    const [aDuration, setDuration] = useState(0);

    const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current.currentTime);
    };
    
    const handleLoadedMetadata = () => {
        setDuration(audioRef.current.duration);
    };
    
    const handleSeek = (e) => {
        const newTime = e.target.value;
        setCurrentTime(newTime);
        audioRef.current.currentTime = newTime;
    };
    
    const calculateProgress = () => {
        return (currentTime / duration) * 100;
    };
    
    return(
        <div className="flex flex-row w-full bg-gray-400 py-4">
            <audio src='https://dl.vgmdownloads.com/soundtracks/akumajo-dracula-gallery-of-labyrinth-original-soundtrack/qwpxwvbgta/1-04%20Invitation%20of%20a%20Crazed%20Moon.mp3' 
            ref={audioRef} 
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}/>

            <section className="w-96">
            <Controls audioRef={audioRef}/>

            <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={handleSeek}
            className="w-max h-4 rounded-full bg-gray-300 appearance-none focus:outline-none"
            style={{ background: `linear-gradient(to right, #4dc0b5 ${calculateProgress()}%, #d4d4d4 0%)` }}
            />

            <div className="mt-2 flex justify-between">
                <p>{formatTime(currentTime)}</p>
                <p>{duration}</p>
            </div>
            </section>
            <SongDetails />
            
            
        </div>
    )
}

const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

export default MusicPlayer;