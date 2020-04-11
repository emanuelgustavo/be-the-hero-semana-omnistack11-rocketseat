import React, { useState } from 'react';
import { View, TextInput, Image, TouchableOpacity, Text } from 'react-native';
import { StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import api from '../../services/api.js';

import logoImg from '../../assets/logo.png';
import heroesImg from '../../assets/heroes.png';

const styles = StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },

  logoImage: {
    margin: 12
  },

  heroesImage: {
    margin: 24
  },

  textInput: {
    width: '75%',
    height: 50,
    marginTop: 36,
    padding: 2,
    lineHeight: 40,
    fontSize: 22,
    borderColor: '#DCDCE6',
    borderRadius: 8,
    borderWidth: 1.5,
    backgroundColor: '#fff',
    color: '#DCDCE6'
  },

  entryButton: {
    width: '75%',
    height: 50,
    marginTop: 10,
    backgroundColor: '#E02041',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#DCDCE6',
    borderRadius: 8,
    borderWidth: 1.5,
  },

  entryButtonText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '500',
  },

  registerButton: {
    marginTop: 20,
    width: '75%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  registerButtonText: {
    color: '#E02041',
    fontWeight: '500',
    fontSize: 18,
    marginLeft: 10
  },
});

export default function Logon() {

  const navigation = useNavigation();

  const [logonId, setLogonId] = useState('');
  const [errorText, setErrorText] = useState('');

  async function handleLogon(id) {
    
    try {      
      const response = await api.post("/sessions", {
       id,
       type: "volunteer"
      });
      
      if (response.status === 200) {
        navigation.navigate('Incidents', { id, name: response.data.name });
      }
    } catch (error) {      
      setErrorText('Erro no Login: ', error);
    }
  }
  
  return (
    <View style={styles.container}>
      <Image style={styles.logoImage} source={logoImg} />
      <Image style={styles.heroesImage} source={heroesImg} />
      <Text>{errorText}</Text>
      <TextInput
        style={styles.textInput}
        placeholder={'Digite sua ID'}
        value={logonId}
        onChangeText={(text) => setLogonId(text)}
      />
      <TouchableOpacity
        style={styles.entryButton}
        onPress={() => handleLogon(logonId)}
      >
        <Text style={styles.entryButtonText}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.registerButton}>
        <Feather name='log-in' size={24} color={'#E02041'} />
        <Text style={styles.registerButtonText}>Não tenho cadastro</Text>
      </TouchableOpacity>
    </View>
  );
}

