import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Modal, FlatList, Button, SafeAreaView, Platform, StatusBar, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from './icon'; 

const ProfileScreen = ({ goBack }) => { // Agregamos goBack como prop
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('El Salvador');
  const [showCountryModal, setShowCountryModal] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const countries = ["El Salvador", "Guatemala", "Honduras", "Nicaragua", "Costa Rica", "Panamá", "México"]; // Ejemplo de lista de países

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const renderCountryItem = ({ item }) => (
    <TouchableOpacity onPress={() => { setSelectedCountry(item); setShowCountryModal(false); }}>
      <Text style={styles.countryItem}>{item}</Text>
    </TouchableOpacity>
  );

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Por favor, ingresa un correo electrónico válido.');
    } else {
      setEmailError('');
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <Icon type="AntDesign" name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.header}>Usuario</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.container}>
          <View style={styles.avatarContainer}>
            <Image 
              source={{ uri: 'https://images.app.goo.gl/Rpbt3pQPNBgGejdN9' }} 
              style={styles.avatar} 
            />
            <TouchableOpacity style={styles.cameraIcon}>
              <Icon type="AntDesign" name="camera" size={20} color="white" />
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Nombre</Text>
            <TextInput 
              style={styles.input} 
              placeholder="Juana Perez" 
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Correo</Text>
            <TextInput 
              style={styles.input} 
              placeholder="juanaperez@gmail.com" 
              keyboardType="email-address"
              value={email}
              onChangeText={(text) => setEmail(text)}
              onBlur={() => validateEmail(email)}
            />
            {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Contraseña</Text>
            <TextInput 
              style={styles.input} 
              placeholder="************" 
              secureTextEntry 
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Cumpleaños</Text>
            <TouchableOpacity style={styles.input} onPress={() => setShowDatePicker(true)}>
              <Text>{date.toLocaleDateString()}</Text>
              <Icon type="AntDesign" name="down" size={20} color="black" />
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={onDateChange}
              />
            )}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>País</Text>
            <TouchableOpacity style={styles.input} onPress={() => setShowCountryModal(true)}>
              <Text>{selectedCountry}</Text>
              <Icon type="AntDesign" name="down" size={20} color="black" />
            </TouchableOpacity>
            <Modal visible={showCountryModal} transparent={true} animationType="slide">
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <FlatList 
                    data={countries} 
                    keyExtractor={(item) => item} 
                    renderItem={renderCountryItem} 
                  />
                  <Button title="Cerrar" onPress={() => setShowCountryModal(false)} />
                </View>
              </View>
            </Modal>
          </View>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Guardar Cambios</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, // Para asegurar margen en Android
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
  },
  backButton: {
    paddingRight: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20, // Espacio extra al final del contenido
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#ddd',
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 5,
    right: 130,  // Ajuste para acercar el icono a la imagen
    backgroundColor: '#007AFF',
    borderRadius: 15,
    padding: 5,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    marginTop: 5,
    fontSize: 14,
  },
  button: {
    backgroundColor: '#005490',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 8,
  },
  countryItem: {
    paddingVertical: 10,
    fontSize: 16,
  },
});

export default ProfileScreen;
