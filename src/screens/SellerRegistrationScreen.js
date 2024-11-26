import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import Feather from '@expo/vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SellerRegistrationScreen = ({ route, navigation }) => {
  const { gstNumber, userDetails } = route.params;
  const [storeName, setStoreName] = useState('');
  const [storeAddress, setStoreAddress] = useState('');
  const [storeRating, setStoreRating] = useState('');
  const [storeReviews, setStoreReviews] = useState('');
  const [panNumber, setPanNumber] = useState('');
  const [panFile, setPanFile] = useState(null);
  const [gstFile, setGstFile] = useState(null);

  const handleFileUpload = async (setFile) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({});
      let file = {
        uri: result.assets[0].uri,
        name: result.assets[0].name,
        type: result.assets[0].mimeType,
      }      
      setFile(file);
    } catch (error) {
      Alert.alert('Error', 'Failed to upload file. Please try again.');
    }
  };

  const handleSubmit = async () => {
    if (!storeName || !storeAddress || !storeRating || !storeReviews || !panNumber || !panFile || !gstFile) {
      Alert.alert('Error', 'Please fill all the fields and upload all required documents.');
      return;
    }

    const formData = {}
    formData.storeName = storeName;
    formData.storeAddress = storeAddress;
    formData.storeRating = storeRating;
    formData.storeReviews = storeReviews;
    formData.panNumber = panNumber;
    formData.panFile = {
      uri: panFile.uri,
      name: panFile.name,
      type: panFile.mimeType,
    }
    formData.gstFile = {
        uri: gstFile.uri,
        name: gstFile.name,
        type: gstFile.mimeType,
    }
    formData.gstNumber = gstNumber;

    const mobile = await AsyncStorage.getItem('userMobile');
    formData.mobile = mobile;

    try {
      const response = await fetch('http://192.168.100.121:4000/register/seller', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        Alert.alert('Success', 'Your documents have been submitted. Status: Pending');
        navigation.navigate('Home');
      } else {
        Alert.alert('Error', 'Failed to submit documents. Please try again.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to submit documents. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seller Registration</Text>
      <TextInput
        placeholder="Store Name"
        style={styles.input}
        value={storeName}
        onChangeText={setStoreName}
        placeholderTextColor="#999"
      />
      <TextInput
        placeholder="Store Address"
        style={styles.input}
        value={storeAddress}
        onChangeText={setStoreAddress}
        placeholderTextColor="#999"
      />
      <TextInput
        placeholder="Store Rating"
        style={styles.input}
        value={storeRating}
        onChangeText={setStoreRating}
        placeholderTextColor="#999"
      />
      <TextInput
        placeholder="Store Reviews"
        style={styles.input}
        value={storeReviews}
        onChangeText={setStoreReviews}
        placeholderTextColor="#999"
      />
      <TextInput
        placeholder="PAN Card Number"
        style={styles.input}
        value={panNumber}
        onChangeText={setPanNumber}
        placeholderTextColor="#999"
      />
      <TouchableOpacity style={styles.uploadButton} onPress={() => handleFileUpload(setPanFile)}>
        <Text style={styles.uploadButtonText}>{panFile ? panFile.name : <><Feather style={styles.uploadCloudIcon} name="upload-cloud" size={16} />Upload PAN Card File</>}</Text>
      </TouchableOpacity>
      <TextInput
        placeholder="GST Number"
        style={styles.input}
        value={gstNumber}
        editable={false}
        placeholderTextColor="#999"
      />
      <TouchableOpacity style={styles.uploadButton} onPress={() => handleFileUpload(setGstFile)}>
        <Text style={styles.uploadButtonText}>{gstFile ? gstFile.name : <><Feather style={styles.uploadCloudIcon} name="upload-cloud" size={16} />Upload GST Document</>}</Text>
      </TouchableOpacity>
      <View style={styles.button}>
        <Button title="Submit" onPress={handleSubmit} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'center', backgroundColor: '#ffffff' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 24 },
  input: { borderWidth: 1, borderColor: '#1366b2', padding: 10, marginBottom: 16, backgroundColor: '#ffffff', width: '80%', alignSelf: 'center' },
  uploadButton: { borderWidth: 1, borderColor: '#1366b2', padding: 10, marginBottom: 16, backgroundColor: '#ffffff', width: '80%', alignSelf: 'center', alignItems: 'center' },
  uploadButtonText: { color: '#1366b2' },
  uploadCloudIcon: { marginRight: 8 },
  button: { backgroundColor: '#1366b2', width: '80%', alignSelf: 'center' },
});

export default SellerRegistrationScreen;
