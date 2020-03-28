import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Feather } from "@expo/vector-icons";

import styles from './styles.css';
import LogoImg from "../../assets/logo.png";

export default function Detail() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={LogoImg} />
        <TouchableOpacity onPress={() => {}}>
          <Feather name="arrow-left" size={28} color="#E02041" />
        </TouchableOpacity>
      </View>
      <View style={styles.incident}>
        <Text style={[styles.incidentProperty, { marginTop: 0 }]}>ONG</Text>
        <Text style={styles.incidentValue}>APAD</Text>

        <Text style={styles.incidentProperty}>CASO:</Text>
        <Text style={styles.incidentValue}>Cadelinha Atropelada</Text>

        <Text style={styles.incidentProperty}>VALOR:</Text>
        <Text style={styles.incidentValue}>R$ 120,00</Text>
      </View>
      <View style={styles.contactBox}>
        <Text style={styles.heroTitle}>Salve o dia!</Text>
        <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>

        <Text style={styles.heroDescription}>Entre em contato:</Text>
        <View>
          <TouchableOpacity style={styles.action} onPress={() => {}}>
            <Text style={styles.actionText}>What's App</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.action} onPress={() => {}}>
            <Text style={styles.actionText}>e-mail</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}