import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import logoImg from '../../assets/logo.png';

import api from '../../services/api.js';

import styles from './styles.js';

export default function Dashboard() {

  const route = useRoute();
  const navigation = useNavigation();

  const [myIncidents, setMyIncidents] = useState([]);
  const [dashboardStatus, setDashboardStatus] = useState({});
  const [refreshList, setRefreshList] = useState(false);
  const [volunteerName, setVolunteerName] = useState('');

  const { id, name } = route.params;

  useEffect(() => { 
    loadData(id);
    getIncidentsStatus();
    setRefreshList(false);
    setVolunteerName(name);
  }, [refreshList]);

  function handleRefreshList() {
    setRefreshList(true);
  }

  async function loadData(id) {    
    try {
      const response = await api.get("/dashboard/mobile", {
        headers: { id }
      });
      //por algum motivo não renderiza o ultimo elemento
      //isso resolve por hora o problema
      if (response.data !== []) {
        setMyIncidents(response.data);
      }
    } catch (error) {}
  }

  async function getIncidentsStatus() {    
    try {
      const response = await api.get("dashboard/status", {
        headers: {
          id,
          dashboardtype: "volunteer"
        }
      });
      setDashboardStatus(response.data);
    } catch (error) {}
  }

  function gotToSearch() {
    navigation.navigate('Search', { name: volunteerName, id });
  }

  function goToDetail(incident) {
    navigation.navigate('Detail', { incident });
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} style={styles.logoImage} />
        <TouchableOpacity
          style={styles.searchButton}
          onPress={ () => gotToSearch() }
        >
          <Text
            style={styles.searchButtonText}
          >Buscar casos</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.welcome}>Bem vindx, {name}</Text>
      <View style={styles.totalDonate}>
        <Text style={styles.totalText}>Total doado:</Text>
        <Text style={styles.totalText}>
          {Intl.NumberFormat("pt-BR", {
            currency: "BRL",
            style: "currency",
          }).format(dashboardStatus.totalReceived)}
        </Text>
      </View>
      <View style={styles.totalDonate}>
        <Text style={styles.totalText}>Total casos salvos:</Text>
        <Text style={styles.totalText}>{dashboardStatus.solved}</Text>
      </View>
      <View style={styles.titleRefresh}>
        <Text style={styles.title}>Meus casos</Text>
        <TouchableOpacity onPress={() => handleRefreshList()}>
          <Feather name="refresh-cw" size={20} />
        </TouchableOpacity>
      </View>{myIncidents.length > 0 &&
      <FlatList
        style={styles.list}
        data={myIncidents}
        keyExtractor={(item) => item.incident_id}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={styles.listItemTitle}>CASO:</Text>
            <Text style={styles.listItemText}>{item.title}</Text>
            <Text style={styles.listItemTitle}>ONG:</Text>
            <Text style={styles.listItemText}>
              {`${item.name} de ${item.city}/${item.uf}`}
            </Text>
            <Text style={styles.listItemTitle}>VALOR:</Text>
            <Text style={styles.listItemText}>
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(item.value)}
            </Text>
            <TouchableOpacity
              style={styles.viewDetail}
              onPress={ () => goToDetail(item)}
            >
              <Feather name="arrow-right" size={20} color="#e02041" />
              <Text style={styles.viewDetailText}>Ver detalhes do caso</Text>
            </TouchableOpacity>
          </View>
        )}
      />}
      { myIncidents.length === 0 &&
        <Text style={styles.emptyList}>
          Nenhum caso resolvido. Busque um caso e comece a ser um herói!
        </Text>
      }
    </View>
  );
}