import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function ProfileScreen({ navigation }) {
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
        <MaterialIcons name="account-circle" size={100} color="black" style={styles.profileIcon} />
        <TextInput placeholder="Name" style={styles.input} value={"Shibina"} />
        <TextInput placeholder="Email" style={styles.input} value={"shibina@gmail.com"} />
        <TextInput placeholder="Mobile Number" style={styles.input} value={"6379103258"} />
        <Button title="Become a Seller" onPress={() => {}} style={styles.button} />
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
  bottomBar: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', padding: 16, backgroundColor: '#f8f8f8' },
  bottomIcon: { width: 24, height: 24 },
  bottomText: { fontSize: 16 },
  bottomTextYummy: { color: '#1366b2' },
  bottomTextGo: { color: '#f4871a' },
  profileIcon: { marginBottom: 16 },
  input: { borderWidth: 1, borderColor: '#1366b2', padding: 10, marginBottom: 16, backgroundColor: '#ffffff', width: '80%' },
  button: { backgroundColor: '#1366b2', width: '80%' },
});
