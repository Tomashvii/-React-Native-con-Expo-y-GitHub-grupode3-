import { useEffect, useState } from 'react';

const API_URL = 'https://api.chess.com/pub/streamers';

export default function ListaScreen() {
  const [streamers, setStreamers] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);

  const fetchStreamers = async () => {
    try {
      setError(null);
      setLoading(true);
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Error al conectar con la API');
      const data = await response.json();
      setStreamers(data.streamers);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchStreamers(); }, []);

  if (loading) return (
    <div style={s.centered}>
      <p style={{ color: '#769656', fontSize: 18 }}>Cargando streamers...</p>
    </div>
  );

  if (error) return (
    <div style={s.centered}>
      <p style={{ color: '#E74C3C' }}>❌ {error}</p>
      <button style={s.retryBtn} onClick={fetchStreamers}>Reintentar</button>
    </div>
  );

  return (
    <div style={s.container}>
      <div style={s.list}>
        {streamers.map(item => (
          <div key={item.username} style={s.card}>
            <img src={item.avatar} alt={item.username} style={s.avatar} />
            <div>
              <p style={s.username}>♟ {item.username}</p>
              {item.twitch_url && (
                <a href={item.twitch_url} target="_blank" rel="noreferrer" style={s.twitch}>
                  🟣 Ver en Twitch
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const s = {
  container: { backgroundColor: '#302E2B', minHeight: '100%', padding: 12 },
  centered:  { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', backgroundColor: '#302E2B' },
  list:      { display: 'flex', flexDirection: 'column', gap: 10 },
  card:      { display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: '#3D3A36', borderRadius: 10, padding: 12, gap: 12 },
  avatar:    { width: 50, height: 50, borderRadius: 25, backgroundColor: '#555' },
  username:  { color: '#FFF', fontWeight: 'bold', fontSize: 15, margin: 0, marginBottom: 4 },
  twitch:    { color: '#9146FF', fontSize: 13, textDecoration: 'none' },
  retryBtn:  { backgroundColor: '#769656', color: '#FFF', border: 'none', padding: '8px 16px', borderRadius: 8, cursor: 'pointer', marginTop: 10 },
};
