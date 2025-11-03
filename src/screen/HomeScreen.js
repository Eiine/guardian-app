import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';

// Componente de tarjetas y lista
const StatCard = ({ title, value, change, iconName, color }) => (
  <View style={[styles.card, { backgroundColor: color }]}>
    <View style={styles.cardHeader}>
      <Text style={styles.cardTitle}>{title}</Text>
      <AntDesign name={iconName} size={18} color="#000" />
    </View>
    <Text style={styles.cardValue}>{value}</Text>
    <Text style={styles.cardChange}>{change}</Text>
  </View>
);

const ListItem = ({ name, subtitle, tag, status, iconColor }) => (
  <View style={styles.listItem}>
    <View style={[styles.avatar, { backgroundColor: iconColor || '#DEDEDE' }]} />
    <View style={styles.listItemContent}>
      <Text style={styles.listItemName}>{name}</Text>
      <Text style={styles.listItemSubtitle}>{subtitle}</Text>
    </View>
    <View style={styles.listItemRight}>
      <Text style={styles.listItemTag}>{tag}</Text>
      {status === 'Medium' && <Text style={[styles.statusTag, styles.mediumTag]}>{status}</Text>}
      {status === 'High' && <Text style={[styles.statusTag, styles.highTag]}>{status}</Text>}
      <Feather name="chevron-right" size={18} color="#A0A0A0" style={{ marginLeft: 8 }} />
    </View>
  </View>
);

const DashboardScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>

      {/* Búsqueda y Notificaciones */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={20} color="#A0A0A0" style={{ marginRight: 8 }} />
          <Text style={styles.searchText}>Search</Text>
        </View>
        <Feather name="bell" size={24} color="#000" />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.cardsRow}>
          <StatCard title="Turbo gas" value="5" change="+5 from yesterday" iconName="filetext1" color="#E0F7FA" />
          <StatCard title="Turbo-rendlin" value="24" change="+8 from yesterday" iconName="clockcircleo" color="#FFFDE7" />
        </View>

        <Text style={styles.sectionTitle}>Task tracking</Text>
        <View style={styles.tabsContainer}>
          <Text style={styles.tabText}>Guardia pesada</Text>
          <Text style={[styles.tabText, styles.activeTab]}>Día de guardia</Text>
          <Text style={styles.tabText}>Guardia próxima</Text>
          <Feather name="filter" size={18} color="#A0A0A0" style={styles.filterIcon} />
        </View>

        <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Vigiladores</Text>
        <ListItem name="Adam Murphy" subtitle="Plan 2022 ago" tag="New tag" iconColor="#58D68D" />
        <ListItem name="Ussename" subtitle="3 min ago" tag="Content" iconColor="#F4D03F" />
        <ListItem name="Adam Murphy" subtitle="35 min ago" tag="Content" iconColor="#5DADE2" />

        <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Recent activities</Text>
        <ListItem name="Adam Murphy" subtitle="10 min ago" tag="Content" status="Medium" iconColor="#E74C3C" />
        <ListItem name="Ussename" subtitle="45 min ago" tag="Content" status="High" iconColor="#F39C12" />
      </ScrollView>
    </View>
  );
};

export default DashboardScreen;

// Tus estilos se mantienen igual
const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: '#FFF' },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', marginLeft: 10 },
  searchContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  searchBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F0F0F0', padding: 8, borderRadius: 8, flex: 1, marginRight: 10 },
  searchText: { color: '#A0A0A0' },
  scrollContent: { paddingBottom: 50 },
  cardsRow: { flexDirection: 'row', justifyContent: 'space-between' },
  card: { flex: 1, margin: 5, padding: 15, borderRadius: 12 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  cardTitle: { fontSize: 14, fontWeight: 'bold' },
  cardValue: { fontSize: 20, fontWeight: 'bold' },
  cardChange: { fontSize: 12, color: '#555' },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginVertical: 10 },
  tabsContainer: { flexDirection: 'row', alignItems: 'center' },
  tabText: { marginRight: 10, color: '#555' },
  activeTab: { fontWeight: 'bold', color: '#6C5CE7' },
  filterIcon: { marginLeft: 'auto' },
  listItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10 },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  listItemContent: { flex: 1 },
  listItemName: { fontWeight: 'bold' },
  listItemSubtitle: { color: '#555' },
  listItemRight: { flexDirection: 'row', alignItems: 'center' },
  listItemTag: { fontSize: 12, marginRight: 5 },
  statusTag: { fontSize: 12, paddingHorizontal: 5, borderRadius: 4 },
  mediumTag: { backgroundColor: '#F39C12', color: '#FFF' },
  highTag: { backgroundColor: '#E74C3C', color: '#FFF' },
});
