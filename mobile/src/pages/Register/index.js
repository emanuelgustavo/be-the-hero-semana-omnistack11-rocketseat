import React, { useState } from 'react';
import { Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import api from '../../services/api.js';

import logoImg from '../../assets/logo.png';
import styles from './styles.js';

export default function Register() {

  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [city, setCity] = useState("");
  const [uf, setUf] = useState("");

  async function handleRegister() {
    const response = await api.post('/volunteer', {
      name, 
      email, 
      whatsapp,
      city,
      uf
    });

    if (response.status === 200) {
      navigation.navigate("Logon", {
        id: response.data.id
      });
    }
  }
  
  return (
    <View style={styles.container}>
      <Image style={styles.logoImage} source={logoImg} />
      <Text style={styles.title}>Cadastro</Text>
      <Text style={styles.text}>
        Faça seu cadastro, entre na plataforma e ajude casos da sua comunidade.
      </Text>
      <TextInput
        style={styles.TextInput}
        placeholder="Nome"
        textContentType="name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.TextInput}
        placeholder="E-mail"
        textContentType="emailAddress"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.TextInput}
        placeholder="What's app"
        textContentType="telephoneNumber"
        value={whatsapp}
        onChangeText={(text) => setWhatsapp(text)}
      />
      <View style={styles.location}>
        <TextInput
          style={[styles.TextInput, styles.locationCity]}
          placeholder="Cidade"
          textContentType="addressCity"
          value={city}
          onChangeText={(text) => setCity(text)}
        />
        <TextInput
          style={[styles.TextInput, styles.locationUF]}
          placeholder="UF"
          textContentType="addressState"
          value={uf}
          onChangeText={(text) => setUf(text)}
        />
      </View>
      <TouchableOpacity
        style={styles.buttonRegister}
        onPress={ () => handleRegister() }
      >
        <Text style={styles.buttonRegisterText}>Cadastrar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonBack}
        onPress={() => navigation.goBack()}
      >
        <Feather name="arrow-left" size={28} color="#E02041" />
        <Text style={styles.buttonBackText}>Voltar ao logon</Text>
      </TouchableOpacity>
    </View>
  );
}