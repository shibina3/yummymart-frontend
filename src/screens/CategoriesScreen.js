import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, ScrollView } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';

const CategoriesScreen = ({ navigation }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://192.168.100.121:4000/get/categories', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity style={styles.categoryItem} onPress={() => navigation.navigate('Category', { item })}>
      <Image source={{ uri: item.image_url }} style={styles.categoryImage} />
      <Text style={styles.categoryText}>{item.name}</Text>
    </TouchableOpacity>
  );

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

      {/* Main Component */}
      <ScrollView contentContainerStyle={styles.mainComponent}>
        <FlatList
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item.name}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.flatListContent}
        />
      </ScrollView>

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
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, backgroundColor: '#f8f8f8' },
  logo: { width: 50, height: 50 },
  topBarIcons: { flexDirection: 'row' },
  icon: { width: 24, height: 24, marginLeft: 16 },
  mainComponent: { flexGrow: 1, padding: 16 },
  columnWrapper: { justifyContent: 'space-between' },
  flatListContent: { paddingBottom: 16 },
  categoryItem: { alignItems: 'center', marginBottom: 16, width: '48%' },
  categoryImage: { width: 100, height: 100, borderRadius: 50, marginBottom: 8 },
  categoryText: { fontSize: 16, textAlign: 'center' },
  bottomBar: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', padding: 16, backgroundColor: '#f8f8f8' },
  bottomIcon: { width: 24, height: 24 },
  bottomText: { fontSize: 16 },
  bottomTextYummy: { color: '#1366b2' },
  bottomTextGo: { color: '#f4871a' },
});

export default CategoriesScreen;
