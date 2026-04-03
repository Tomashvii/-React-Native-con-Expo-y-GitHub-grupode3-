import React, { useEffect, useState } from 'react';
import {
  View, Text, FlatList, Image,
  ActivityIndicator, StyleSheet,
  TouchableOpacity, Linking, RefreshControl,
} from 'react-native';

const API_URL = 'https://api.chess.com/pub/streamers';

export default function ListaScreen() {
  const [streamers, setStreamers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const fetchStreamers = async () => {
    try {
      setError(null);
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Error al conectar con la API');
      const data = await response.json();
      setStreamers(data.streamers);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => { fetchStreamers(); }, []);

  const onRefresh = () => { setRefreshing(true); fetchStreamers(); };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.info}>
        <Text style={styles.username}>♟ {item.username}</Text>
        {item.twitch_url && (
          <TouchableOpacity onPress={() => Linking.openURL(item.twitch_url)}>
            <Text style={styles.twitch}>🟣 Ver en Twitch</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  if (loading) return (
    <View style={styles.centered}>
      <ActivityIndicator size="large" color="#769656" />
      <Text style={styles.loadingText}>Cargando streamers...</Text>
    </View>
  );

  if (error) return (
    <View style={styles.centered}>
      <Text style={styles.errorText}>❌ {error}</Text>
      <TouchableOpacity style={styles.retryButton} onPress={fetchStreamers}>
        <Text style={styles.retryText}>Reintentar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>♟ Chess.com Streamers</Text>
      <FlatList
        data={streamers}
        keyExtractor={(item) => item.username}
        renderItem={renderItem}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#302E2B' },
  header: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', padding: 14, backgroundColor: '#769656', color: '#FFF' },
  list: { padding: 12 },
  card: { flexDirection: 'row', backgroundColor: '#3D3A36', borderRadius: 10, padding: 12, marginBottom: 10, alignItems: 'center' },
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 12, backgroundColor: '#555' },
  info: { flex: 1 },
  username: { fontSize: 15, fontWeight: 'bold', color: '#FFF', marginBottom: 4 },
  twitch: { color: '#9146FF', fontSize: 13 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#302E2B' },
  loadingText: { marginTop: 10, color: '#769656' },
  errorText: { color: '#E74C3C', fontSize: 15 },
  retryButton: { backgroundColor: '#769656', padding: 10, borderRadius: 8, marginTop: 10 },
  retryText: { color: '#FFF', fontWeight: 'bold' },
});