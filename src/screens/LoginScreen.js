import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image, Switch } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
    const [mobile, setMobile] = useState('');
    const [otp, setOtp] = useState(Array(6).fill(''));
    const [showOtpInput, setShowOtpInput] = useState(false);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [showEmailAndPreferences, setShowEmailAndPreferences] = useState(false);
    const [preferences, setPreferences] = useState({
        sms: false,
        whatsapp: false,
        email: false,
    });
    const otpRefs = useRef([]);

    const handleSendOtp = async () => {
        const response = await fetch('http://192.168.100.121:4000/send/otp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ mobile }),
        });
        if (!response.ok) {
            Alert.alert("Error", "Failed to send OTP. Please try again.");
            return;
        }
        setShowOtpInput(true);
        Alert.alert("OTP Sent", "An OTP has been sent to your mobile number.");
    };

    const handleVerifyOtp = async () => {
        const otpCode = otp.join('');
        const response = await fetch('http://192.168.100.121:4000/verify/otp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ mobile, otp: otpCode }),
        });
        let data = await response.json();
        if (data.isVerified) {
            await AsyncStorage.setItem('userMobile', mobile);
            if (!data.isNewUser) {
                navigation.navigate('Home');
            }
            setShowEmailAndPreferences(true);
        } else {
            Alert.alert("Error", data.error);
        }
    };

    const handleUpdateUserEmailAndNotificationPreferences = async () => {
        const response = await fetch('http://192.168.100.121:4000/register/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ mobile, email, preferences, name }),
        });
        let data = await response.json();
        if( response.ok ){
            navigation.navigate('Home');
        } else {
            Alert.alert("Error", "Email is required.");
        }
    };

    const handlePreferenceChange = (type) => {
        setPreferences((prev) => ({ ...prev, [type]: !prev[type] }));
    };

    const handleOtpChange = (text, index) => {
        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);

        if (text && index < otpRefs.current.length - 1) {
            otpRefs.current[index + 1].focus();
        } else if (!text && index > 0) {
            otpRefs.current[index - 1].focus();
        }
    };

    return (
        <View style={styles.container}>
            <Image style={styles.titleImg} source={require('../../assets/images/yummymart.png')} />

            {!showOtpInput && !showEmailAndPreferences && (
                <>
                    <TextInput
                        placeholder="Mobile number"
                        value={mobile}
                        onChangeText={setMobile}
                        style={styles.input}
                        keyboardType="phone-pad"
                    />
                    <View style={styles.btnContainer}>
                        <Button title="Submit" onPress={handleSendOtp} />
                    </View>
                </>
            )}

            {showOtpInput && !showEmailAndPreferences && (
                <>
                    <Text style={styles.otpText}>Enter the 6-digit OTP sent to your mobile</Text>
                    <View style={styles.otpContainer}>
                        {otp.map((_, index) => (
                            <TextInput
                                key={index}
                                ref={(ref) => otpRefs.current[index] = ref}
                                style={styles.otpBox}
                                maxLength={1}
                                keyboardType="number-pad"
                                onChangeText={(text) => handleOtpChange(text, index)}
                            />
                        ))}
                    </View>
                    <View style={styles.btnContainer}>
                        <Button title="Verify" onPress={handleVerifyOtp} />
                    </View>
                </>
            )}

            {showEmailAndPreferences && (
                <>  
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
                        keyboardType="email-address"
                    />
                    <Text style={styles.otpText}>Notification Preferences</Text>
                    <View style={styles.preferenceContainer}>
                        <Text>Receive message via SMS</Text>
                        <Switch
                            value={preferences.sms}
                            onValueChange={() => handlePreferenceChange('sms')}
                        />
                    </View>
                    <View style={styles.preferenceContainer}>
                        <Text>Receive message via WhatsApp</Text>
                        <Switch
                            value={preferences.whatsapp}
                            onValueChange={() => handlePreferenceChange('whatsapp')}
                        />
                    </View>
                    <View style={styles.preferenceContainer}>
                        <Text>Receive message via Email</Text>
                        <Switch
                            value={preferences.email}
                            onValueChange={() => handlePreferenceChange('email')}
                        />
                    </View>
                    <View style={styles.btnContainer}>
                        <Button title="Create Account" onPress={handleUpdateUserEmailAndNotificationPreferences} />
                    </View>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, justifyContent: 'center', backgroundColor: '#ffffff' },
    titleImg: { width: 100, height: 100, alignSelf: 'center' },
    input: { borderWidth: 1, borderColor: '#1366b2', padding: 10, marginBottom: 16, backgroundColor: '#ffffff', width: '80%', alignSelf: 'center' },
    btnContainer: { width: '80%', alignSelf: 'center', marginBottom: 16 },
    otpContainer: { flexDirection: 'row', justifyContent: 'center', marginBottom: 16 },
    otpBox: { width: 40, height: 40, borderWidth: 1, borderColor: '#1366b2', textAlign: 'center', marginHorizontal: 5 },
    otpText: { textAlign: 'center', marginBottom: 16 },
    preferenceContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 8, width: '80%', alignSelf: 'center' },
});

export default LoginScreen;
