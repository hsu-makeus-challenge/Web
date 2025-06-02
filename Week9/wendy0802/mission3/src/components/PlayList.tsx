import { usePlaylistStore } from '../store/playlistStore'
import { FaPlay, FaPause, FaTrash } from 'react-icons/fa'

const PlayList = () => {
  const { songs, currentSong, isPlaying, setCurrentSong, removeSong, togglePlay } = usePlaylistStore()

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">재생 목록</h2>
      <div className="space-y-2">
        {songs.map((song) => (
          <div
            key={song.id}
            className={`flex items-center justify-between p-3 rounded-lg ${
              currentSong?.id === song.id ? 'bg-blue-100' : 'bg-gray-50'
            }`}
          >
            <div className="flex items-center space-x-4">
              <button
                onClick={() => {
                  if (currentSong?.id === song.id) {
                    togglePlay()
                  } else {
                    setCurrentSong(song)
                  }
                }}
                className="p-2 rounded-full hover:bg-gray-200"
              >
                {currentSong?.id === song.id && isPlaying ? (
                  <FaPause className="text-blue-500" />
                ) : (
                  <FaPlay className="text-blue-500" />
                )}
              </button>
              <div>
                <h3 className="font-medium">{song.title}</h3>
                <p className="text-sm text-gray-500">{song.artist}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">{song.duration}</span>
              <button
                onClick={() => removeSong(song.id)}
                className="p-2 text-red-500 hover:bg-red-100 rounded-full"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
        {songs.length === 0 && (
          <p className="text-center text-gray-500 py-4">재생 목록이 비어있습니다.</p>
        )}
      </div>
    </div>
  )
}

export default PlayList 