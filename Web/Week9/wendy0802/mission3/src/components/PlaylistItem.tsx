import { usePlayListStore } from '../store/playListStore';

interface PlaylistItemProps {
  id: string;
  title: string;
  artist: string;
  price: number;
  imageUrl: string;
}

export default function PlaylistItem({ id, title, artist, price, imageUrl }: PlaylistItemProps) {
  const songs = usePlayListStore(state => state.songs);
  const addSong = usePlayListStore(state => state.addSong);
  const removeSong = usePlayListStore(state => state.removeSong);
  const count = songs.filter(song => song.id === id).length;

  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
      <img src={imageUrl} alt={title} style={{ width: 64, height: 64, borderRadius: 8, marginRight: 16 }} />
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 'bold' }}>{title}</div>
        <div style={{ color: '#555', fontSize: 14 }}>{artist}</div>
        <div style={{ fontWeight: 'bold' }}>{`₩${price}`}</div>
      </div>
      <div>
        <button onClick={() => removeSong(id)}>-</button>
        <span style={{ margin: '0 8px' }}>{count}</span>
        <button onClick={() => addSong({ id, title, artist, price, imageUrl })}>+</button>
      </div>
    </div>
  );
}