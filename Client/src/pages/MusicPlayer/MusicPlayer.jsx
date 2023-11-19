import { useLocation } from 'react-router-dom'
import Controls from './Controls'

const MusicPlayer = () => {
    const location = useLocation()
    const {code, title, duration, audioRef} = location.state
    return(
        <div>
            <h1>{code}</h1>
            <audio src='https://dl.vgmdownloads.com/soundtracks/akumajo-dracula-gallery-of-labyrinth-original-soundtrack/qwpxwvbgta/1-04%20Invitation%20of%20a%20Crazed%20Moon.mp3' ref={audioRef}/>
            <Controls audioRef={audioRef}/>
        </div>
    )
}

export default MusicPlayer;