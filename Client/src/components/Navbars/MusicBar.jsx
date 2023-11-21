import MusicPlayer from "../MusicPlayer/MusicPlayer"

{/* Music player bar */ }

export default function MusicBar({ image = "https://lastfm.freetls.fastly.net/i/u/500x500/42851f3f78390ec7f5bacd31c761c681.jpg", song = "Canción", artist = "Artista"}) {
  return (
    <section className="navbar bottom-0 lg:relative lg:top-0 z-50 btm-nav lg:navbar bg-light-black lg:bg-greenish-black lg:border-b lg:border-b-light-black lg:w-full">
      <div className="flex flex-row text-white imprima-400">
        <div className="flex h-full w-1/3 gap-4 sm:pl-20">
          <div className="avatar left-0">
            <div className="w-full rounded-lg">
              <img src={image} />
            </div>
          </div>
          <div className="flex flex-col justify-center text-sm">
            <a className="text-white">{song}</a>
            <a className="text-white">{artist}</a>
          </div>
        </div>
        <MusicPlayer />
      </div>
    </section>
  )
}