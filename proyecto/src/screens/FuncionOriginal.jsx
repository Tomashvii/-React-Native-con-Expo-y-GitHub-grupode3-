import { useState, useEffect } from 'react';
import './FuncionOriginal.css';

// función original: cuenta cuántos streamers tienen Twitch y cuántos no
function contarStreamers(lista) {
  let conTwitch = 0;
  let sinTwitch = 0;

  lista.forEach((streamer) => {
    if (streamer.twitch_url) {
      conTwitch = conTwitch + 1;
    } else {
      sinTwitch = sinTwitch + 1;
    }
  });

  return { conTwitch, sinTwitch };
}

export default function FuncionOriginal() {
  const [streamers, setStreamers] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [conteo, setConteo] = useState(null);

  useEffect(() => {
    fetch('https://api.chess.com/pub/streamers')
      .then((respuesta) => respuesta.json())
      .then((datos) => {
        const lista = datos.streamers;
        setStreamers(lista);
        setConteo(contarStreamers(lista));
        setCargando(false);
      });
  }, []);

  if (cargando) {
    return <p className="cargando">Cargando streamers...</p>;
  }

  return (
    <div className="funcion-contenedor">
      <h2 className="funcion-titulo">♟️ Streamers de Chess.com</h2>
      <p className="funcion-subtitulo">Integrante C — Función Original</p>

      {conteo && (
        <div className="conteo-box">
          <p className="conteo-texto">🎮 Con Twitch: {conteo.conTwitch}</p>
          <p className="conteo-texto">⬛ Sin Twitch: {conteo.sinTwitch}</p>
        </div>
      )}

  
      {streamers.map((item) => (
        <div key={item.username} className="tarjeta">
          <p className="tarjeta-nombre">{item.username}</p>
          <p className="tarjeta-estado">
            {item.twitch_url ? '🎮 Tiene Twitch' : '⬛ Sin Twitch'}
          </p>
        </div>
      ))}
    </div>
  );
}