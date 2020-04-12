import React from 'react';
import { View, TouchableOpacity, Text, Image, Linking } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather } from "@expo/vector-icons";

import styles from './styles.js';
import LogoImg from "../../assets/logo.png";

import formatDeadline from '../../utils/formatDeadline.js';
import api from '../../services/api.js';

export default function WantHelp() {

  const route = useRoute();
  const navigation = useNavigation();

  const incident = route.params.incident;
  const volunteer_id = route.params.id;

  console.log(id);

  async function handleWantHelp(incidentId, incidentValue) {
    const response = await api.post('/incidents/history', {
      incident_id: incidentId,
      volunteer_id,
      received_value: incidentValue
    });
    if (response.status === 200) {
      navigation.goBack();
    }
  }
  
  function navigateBack() {
    navigation.goBack();
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={LogoImg} />
        <TouchableOpacity onPress={navigateBack}>
          <Feather name="arrow-left" size={28} color="#E02041" />
        </TouchableOpacity>
      </View>
      <View style={styles.incident}>
        <Text style={[styles.incidentProperty, { marginTop: 0 }]}>ONG</Text>
        <Text style={styles.incidentValue}>{`${incident.name} de ${incident.city}/${incident.uf}`}</Text>

        <Text style={styles.incidentProperty}>CASO:</Text>
        <Text style={styles.incidentValue}>{incident.title}</Text>

        <Text style={styles.incidentProperty}>DESCRIÇÃO:</Text>
        <Text style={styles.incidentValue}>{incident.description}</Text>

        <View style={styles.valueDeadline}>
          <View>
            <Text style={styles.incidentProperty}>VALOR:</Text>
            <Text style={styles.incidentValue}>
              {
                Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL"
                }).format(incident.value)
                }
            </Text>
          </View>
          <View>
            <Text style={styles.incidentProperty}>PRAZO:</Text>
            <Text style={styles.incidentValue}>{formatDeadline(incident.deadline)}</Text>
          </View>
        </View>
      </View>
      <View style={styles.contactBox}>
        <Text style={styles.heroTitle}>Salve o dia!</Text>
        <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.action}
            onPress={() => handleWantHelp(incident.id, incident.value)}
          >
            <Text style={styles.actionText}>Quero ajudar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}