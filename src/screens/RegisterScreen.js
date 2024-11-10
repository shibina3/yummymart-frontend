import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, Image } from 'react-native';

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');

  const handleRegister = async () => {
    try {
      const response = await fetch('http://192.168.100.121:4000/register/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name, mobileNumber }),
      });
      const result = await response.json();
      if (response.ok) {
        Alert.alert('Registration Successful!');
        navigation.navigate('Login');
      } else {
        Alert.alert(result.message || 'Registration failed');
      }
    } catch (error) {
      Alert.alert('An error occurred. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.titleImg} source={require('../../assets/images/yummymart.png')} />
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Mobile number"
        value={mobileNumber}
        onChangeText={setMobileNumber}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <View style={styles.buttonContainer}>
        <Button title="Register" onPress={handleRegister} />
      </View>
      <Text
        style={styles.link}
        onPress={() => navigation.navigate('Login')}
      >
        Already have an account? Login
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'center', backgroundColor: '#ffffff' },
  titleImg: { width: 100, height: 100, alignSelf: 'center' },
  input: { borderWidth: 1, borderColor: '#1366b2', padding: 10, marginBottom: 16, backgroundColor: '#ffffff', width: '80%', alignSelf: 'center' },
  link: { color: '#f4871a', textAlign: 'center', marginTop: 16 },
  buttonContainer: { backgroundColor: '#1366b2', width: '80%', alignSelf: 'center' },
});

export default RegisterScreen;
