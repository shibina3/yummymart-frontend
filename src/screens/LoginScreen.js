import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image } from 'react-native';

const LoginScreen = ({ navigation }) => {
    const [emailOrMob, setEmailOrMob] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
          const response = await fetch('http://192.168.100.121:4000/login/user', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ emailOrMob, password }),
            // mode: 'no-cors',
          });
          const result = await response.json();
          if (response.ok) {
            navigation.navigate('Home');
          } else {
            console.log(result.message || 'Login failed');
          }
        } catch (error) {
            console.log('An error occurred. Please try again.');
        }
    };

    return (
        <View style={styles.container}>
            <Image style={styles.titleImg} source={require('../../assets/images/yummymart.png')} />
            <TextInput
                placeholder="Email/Mobile number"
                value={emailOrMob}
                onChangeText={setEmailOrMob}
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
                <Button title="Login" onPress={handleLogin} />
            </View>
            <Text
                style={styles.link}
                onPress={() => navigation.navigate('Register')}
            >
                Don't have an account? Register
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, justifyContent: 'center', backgroundColor: '#ffffff' },
    titleImg: { width: 100, height: 100, alignSelf: 'center' },
    input: { borderWidth: 1, borderColor: '#1366b2', padding: 10, marginBottom: 16, backgroundColor: '#ffffff', width: '80%', alignSelf: 'center' },
    link: { color: '#f4871a', textAlign: 'center', marginTop: 16 },
    buttonContainer: { backgroundColor: '#1366b2', width: '80%', alignSelf: 'center' },
});

export default LoginScreen;