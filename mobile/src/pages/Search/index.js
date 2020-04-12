import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Image, Text, TouchableOpacity, FlatList } from 'react-native';

import LogoImg from '../../assets/logo.png';
import styles from './styles.js';

import api from '../../services/api.js';
import formatDeadline from '../../utils/formatDeadline.js';

export default function Search() {

  const route = useRoute();
  const navigation = useNavigation();

  const [incidents, setIncidents] = useState([]); //dados dos casos cadastrados
  const [total, setTotal] = useState(0); //total de casos cadastrados
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const volunteerName = route.params.name;
  const { id } = route.params;

  function goToDetail(incident) {
    navigation.navigate('WantHelp', { incident, id });
  }
  
  async function loadIncidents() {

    if (loading) {
      return;
    }
    if (total > 0 && incidents.length === total) {
      return;
    }

    setLoading(true);

    try {
      const response = await api.get('/search');

      setIncidents(response.data);
      setTotal(response.headers['x-total-count']);
      setPage(page + 1);
      setLoading(false);
      
    } catch (error) {
      
    }
  }

  useEffect(() => { 
    loadIncidents();
  }, []);
  
  function navigateBack() {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={LogoImg} />
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>{total} casos</Text>
        </Text>
        <TouchableOpacity onPress={navigateBack}>
          <Feather name="arrow-left" size={28} color="#E02041" />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Bem vindo, { volunteerName }</Text>
      <Text style={styles.description}>
        Escolha um caso para ajudar e salve o dia!
      </Text>

      <FlatList
        data={incidents}
        style={styles.incidentList}
        keyExtractor={incident => String(incident.id)}
        //showsVerticalScrollIndicator={false}
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.2}
        renderItem={({ item: incident }) => (
          <View style={styles.incident}>
            <Text style={styles.incidentProperty}>ONG:</Text>
            <Text style={styles.incidentValue}>{incident.name}</Text>

            <Text style={styles.incidentProperty}>CASO:</Text>
            <Text style={styles.incidentValue}>{incident.title}</Text>

            <View style={styles.valueDeadline}>
              <View>
                <Text style={styles.incidentProperty}>VALOR:</Text>
                <Text style={styles.incidentValue}>
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL"
                }).format(incident.value)}
                </Text>
              </View>
              <View>
                <Text style={styles.incidentProperty}>PRAZO:</Text>
                <Text style={styles.incidentValue}>
                  {formatDeadline(incident.deadline)}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() => goToDetail(incident)}
            >
              <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
              <Feather name="arrow-right" size={16} color="#E02041" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}