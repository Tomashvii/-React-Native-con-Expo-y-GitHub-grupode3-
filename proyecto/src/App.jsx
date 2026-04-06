import { useState } from 'react';
import ListaScreen from './ListaScreen';
import FuncionOriginal from './screens/FuncionOriginal'; 

const TABS = [
  { key: 'home',    label: 'Inicio',   icon: '🏠' },
  { key: 'lista',   label: 'Lista',    icon: '♟️' },
  { key: 'funcion', label: 'Análisis', icon: '📊' }, 
];

function HomeScreen() {
  return (
    <div style={s.screen}>
      <h2 style={{ color: '#FFF' }}>Bienvenido ♟️</h2>
      <p style={{ color: '#aaa' }}>App de streamers de ajedrez en Chess.com</p>
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  const renderScreen = () => {
    if (activeTab === 'home')    return <HomeScreen />;
    if (activeTab === 'lista')   return <ListaScreen />;
    if (activeTab === 'funcion') return <FuncionOriginal />; 
  };

  return (
    <div style={s.container}>

   
      <div style={s.header}>
        <span>♟ Chess Streamers</span>
      </div>

     
      <div style={s.content}>
        {renderScreen()}
      </div>

      <div style={s.tabBar}>
        {TABS.map(tab => {
          const active = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{ ...s.tabItem, ...(active ? s.tabActive : {}) }}
            >
              <span style={{ fontSize: 22 }}>{tab.icon}</span>
              <span style={{ fontSize: 11, color: active ? '#769656' : '#aaa' }}>
                {tab.label}
              </span>
              {active && <div style={s.underline} />}
            </button>
          );
        })}
      </div>

    </div>
  );
}

const s = {
  container: { display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#302E2B', fontFamily: 'sans-serif' },
  header:    { backgroundColor: '#769656', color: '#FFF', padding: '14px 16px', fontSize: 18, fontWeight: 'bold', textAlign: 'center' },
  content:   { flex: 1, overflow: 'auto' },
  screen:    { padding: 24 },
  tabBar:    { display: 'flex', borderTop: '1px solid #555', backgroundColor: '#302E2B' },
  tabItem:   { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '8px 0', background: 'none', border: 'none', cursor: 'pointer', gap: 2 },
  tabActive: {},
  underline: { width: 24, height: 3, backgroundColor: '#769656', borderRadius: 2, marginTop: 2 },
};