import React from 'react';
import { View, TouchableOpacity, Text, Image, Linking } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather } from "@expo/vector-icons";
import * as MailComposer from 'expo-mail-composer';

import styles from './styles.js';
import LogoImg from "../../assets/logo.png";

export default function Detail() {

  const route = useRoute();
  const navigation = useNavigation();

  const incident = route.params.incident;  
  const message = `Olá, ${incident.name}
          Estou entrando em contato para informar que vou contribuir
          com o caso "${incident.title}" com o valor de "${Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(incident.value)}"`;
  
  function navigateBack() {
    navigation.goBack();
  }

  function sendEmail() {
    MailComposer.composeAsync({
      subject: `Herói do caso: ${incident.title}`,
      recipients: incident.email,
      body: message,
    })
  }

  function sendWhatsApp() {
    Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}text=${message}`);
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

        <Text style={styles.incidentProperty}>Descrição:</Text>
        <Text style={styles.incidentValue}>{incident.description}</Text>

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
      <View style={styles.contactBox}>
        <Text style={styles.heroTitle}>Salve o dia!</Text>
        <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>

        <Text style={styles.heroDescription}>Entre em contato:</Text>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.action} onPress={sendWhatsApp}>
            <Text style={styles.actionText}>What's App</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.action} onPress={sendEmail}>
            <Text style={styles.actionText}>e-mail</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}