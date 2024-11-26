import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen({ navigation }) {
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    phone_number: '',
  });
  const [gstNumber, setGstNumber] = useState('');

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });

    const fetchUserDetails = async () => {
      try {
        const storedMobile = await AsyncStorage.getItem('userMobile');
        if (storedMobile) {
          const response = await fetch('http://192.168.100.121:4000/get/user', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ mobile: storedMobile }),
          });
          const data = await response.json();
          setUserDetails(data);
          console.log('User details:', data?.seller);
          
          if (data?.seller) {
            setGstNumber(data?.store?.gstnumber || '');
          }
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, []);

  const validateGSTNumber = (gstNumber) => {
    const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/;  // sample GST: 27ABCDE1234F1Z5
    if (gstRegex.test(gstNumber)) {
      navigation.navigate('SellerRegistration', { gstNumber, userDetails });
    } else {
      alert('Invalid GST Number');
    }
  };

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Image source={require('../../assets/images/yummymart.png')} style={styles.logo} />
        <View style={styles.topBarIcons}>
          <TouchableOpacity>
            <AntDesign name="search1" size={24} color="black" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="notifications-outline" size={24} color="black" style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.mainComponent}>
        <View style={styles.profileIconContainer}>
          <MaterialIcons name="account-circle" size={100} color="black" style={styles.profileIcon} />
          {userDetails?.seller && userDetails?.store?.verification_status === 'pending' && (
            <MaterialIcons name="verified" size={20} color='#f4871a' style={styles.verifiedIcon} />
          )}
          {userDetails?.seller && userDetails?.store?.verification_status === 'verified' && (
            <MaterialIcons name="verified" size={20} color="green" style={styles.verifiedIcon} />
          )}
        </View>
        <TextInput
          placeholder="Name"
          style={styles.input}
          value={userDetails.name || ''}
          placeholderTextColor="#999"
        />
        <TextInput
          placeholder="Email"
          style={styles.input}
          value={userDetails.email || ''}
          placeholderTextColor="#999"
        />
        <TextInput
          placeholder="Mobile Number"
          style={styles.input}
          value={userDetails.phone_number || ''}
          placeholderTextColor="#999"
        />
        <TextInput
          placeholder="GST Number"
          style={styles.input}
          value={gstNumber}
          onChangeText={(text) => setGstNumber(text)}
          placeholderTextColor="#999"
        />

        {
          userDetails?.seller && userDetails?.store?.verification_status === 'verified' ? (
            <Text style={{ color: 'green', marginBottom: 16 }}>Your Seller Account is verified</Text>
          ) : 
          userDetails?.seller && userDetails?.store?.verification_status === 'pending' ? (
            <Text style={{ color: '#f4871a', marginBottom: 16, width: '80%' }}>Verification pending. Please wait while we process your account. You'll be notified once verified.</Text>
          ) : 
          userDetails?.seller && userDetails?.store?.verification_status === 'rejected' ? (
            <><Text style={{ color: 'red', marginBottom: 16 }}>Your Seller Account verification is rejected</Text>
              <Button title="Submit" onPress={() => validateGSTNumber(gstNumber)} style={styles.button} />
            </>
          ) :
          (
            <Button title="Become a Seller" onPress={() => validateGSTNumber(gstNumber)} style={styles.button} />
          )

        }
      </View>

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <AntDesign name="home" size={24} color="black" style={styles.bottomIcon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.bottomText}>
            <Text style={styles.bottomTextYummy}>Yummy</Text>
            <Text style={styles.bottomTextGo}>Go</Text>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <AntDesign name="shoppingcart" size={24} color="black" style={styles.bottomIcon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialIcons name="account-circle" size={24} color="black" style={styles.bottomIcon} onPress={() => {
            navigation.navigate('Profile');
          }} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, backgroundColor: '#f8f8f8' },
  logo: { width: 50, height: 50 },
  topBarIcons: { flexDirection: 'row' },
  icon: { width: 24, height: 24, marginLeft: 16 },
  mainComponent: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  profileIconContainer: { position: 'relative', marginBottom: 16 },
  profileIcon: {},
  verifiedIcon: { position: 'absolute', top: '6px', right: '11px' },
  bottomBar: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', padding: 16, backgroundColor: '#f8f8f8' },
  bottomIcon: { width: 24, height: 24 },
  bottomText: { fontSize: 16 },
  bottomTextYummy: { color: '#1366b2' },
  bottomTextGo: { color: '#f4871a' },
  input: { borderWidth: 1, borderColor: '#1366b2', padding: 10, marginBottom: 16, backgroundColor: '#ffffff', width: '80%' },
  button: { backgroundColor: '#1366b2', width: '80%' },
});
