import React, { useState, useEffect } from 'react';
import { View, TextInput, Image, TouchableOpacity, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

import api from '../../services/api.js';

import logoImg from '../../assets/logo.png';
import heroesImg from '../../assets/heroes.png';
import styles from './styles.js';

export default function Logon() {

  const navigation = useNavigation();
  const route = useRoute();

  const [logonId, setLogonId] = useState('');
  const [errorText, setErrorText] = useState('');

  //reactnavigation.org/docs/params
  useEffect(() => { 
    if (route.params?.id) {
      setLogonId(route.params.id);
    }
  }, [route.params?.id]);

  async function handleLogon(id) {
    
    try {      
      const response = await api.post("/sessions", {
       id,
       type: "volunteer"
      });
      
      if (response.status === 200) {
        navigation.navigate('Dashboard', { id, name: response.data.name });
      }
    } catch (error) {      
      setErrorText('Erro no Login: ', error);
    }
  }

  function goToRegister() {
    navigation.navigate("Register");
  }
  
  return (
    <View style={styles.container}>
      <Image style={styles.logoImage} source={logoImg} />
      <Image style={styles.heroesImage} source={heroesImg} />
      <Text>{errorText}</Text>
      <TextInput
        style={styles.textInput}
        placeholder={'Digite sua ID'}
        value={logonId || route.params?.id}
        onChangeText={(text) => setLogonId(text)}
      />
      <TouchableOpacity
        style={styles.entryButton}
        onPress={() => handleLogon(logonId)}
      >
        <Text style={styles.entryButtonText}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.registerButton}
        onPress={ () => goToRegister() }
      >
        <Feather name='log-in' size={24} color={'#E02041'} />
        <Text style={styles.registerButtonText}>Não tenho cadastro</Text>
      </TouchableOpacity>
    </View>
  );
}

