import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, Dimensions, ScrollView } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import Carousel from 'react-native-reanimated-carousel';

const HomeScreen = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesResponse = await fetch('http://192.168.100.121:4000/get/categories', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          }
        });
        const data = await categoriesResponse.json();
        setCategories(data);

        const storesResponse = await fetch('http://192.168.100.121:4000/get/stores', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          }
        });
        const storesData = await storesResponse.json();
        setStores(storesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  const carouselItems = [
    { title: 'Item 1', imageUrl: 'http://192.168.100.121:8081/assets/images/ad-banners/banner1.jpeg' },
    { title: 'Item 2', imageUrl: 'http://192.168.100.121:8081/assets/images/ad-banners/banner2.jpeg' },
    { title: 'Item 3', imageUrl: 'http://192.168.100.121:8081/assets/images/ad-banners/banner3.jpeg' },
  ];

  const featuredProducts = [
    { name: 'Toor Dal', imageUrl: 'http://192.168.100.121:8081/assets/images/products/toor.jpeg', price: '₹100', discount: '10% off' },
    { name: 'Coconut Oil', imageUrl: 'http://192.168.100.121:8081/assets/images/products/oil.jpeg', price: '₹200', discount: '5% off' },
    { name: 'Dove Body wash', imageUrl: 'http://192.168.100.121:8081/assets/images/products/dove.jpeg', price: '₹150', discount: '15% off' },
    { name: 'Shampoo 1L', imageUrl: 'http://192.168.100.121:8081/assets/images/products/shampoo.jpeg', price: '₹250', discount: '20% off' },
    { name: 'Country Tomatoes', imageUrl: 'http://192.168.100.121:8081/assets/images/products/tomato.jpeg', price: '₹50', discount: '5% off' },
  ];

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity style={styles.categoryItem} onPress={() => navigation.navigate('Category', { item })}>
      <Image source={{ uri: item.image_url }} style={styles.categoryImage} />
      <Text style={styles.categoryText}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderStoreItem = ({ item }) => (
    <View style={styles.storeItem}>
      <Image source={item.image_url} style={styles.storeImage} />
      <Text style={styles.storeText}>{item.name}</Text>
    </View>
  );

  const renderProductItem = ({ item }) => (
    <View style={styles.productItem}>
      <Image source={item.imageUrl} style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>{item.price}</Text>
      <Text style={styles.productDiscount}>{item.discount}</Text>
    </View>
  );

  const width = Dimensions.get('window').width;
  

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} style={{ flex: 1, overflow: 'scroll' }}>
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
        <View style={styles.mainComponent}>
          <View>
            <Carousel
              loop
              width={width}
              height={width / 2}
              autoPlay={true}
              data={[...new Array(carouselItems.length).keys()]}
              scrollAnimationDuration={1000}
              renderItem={({ index }) => (
                <View style={{ flex: 1, justifyContent: 'center' }}>
                  <Image source={carouselItems[index].imageUrl} style={styles.carouselImage} />
                  <Text style={styles.carouselText}>{carouselItems[index].title}</Text>
                </View>
              )}
            />
          </View>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Shop by categories</Text>
            <TouchableOpacity>
              <Text style={styles.viewAll} onPress={()=> {
                navigation.navigate('Categories');
              }}>View all</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={categories.slice(0, 4)}
            renderItem={renderCategoryItem}
            keyExtractor={(item) => item.name}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Shop by stores</Text>
            <TouchableOpacity>
              <Text style={styles.viewAll}>View all</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={stores.slice(0, 4)}
            renderItem={renderStoreItem}
            keyExtractor={(item) => item.name}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured products</Text>
            <TouchableOpacity>
              <Text style={styles.viewAll}>View all</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={featuredProducts}
            renderItem={renderProductItem}
            keyExtractor={(item) => item.name}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: { flexGrow: 1 },
  container: { flex: 1, backgroundColor: '#ffffff' },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, backgroundColor: '#f8f8f8' },
  logo: { width: 50, height: 50 },
  topBarIcons: { flexDirection: 'row' },
  icon: { width: 24, height: 24, marginLeft: 16 },
  mainComponent: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  carouselItem: { backgroundColor: '#f8f8f8', borderRadius: 8, padding: 16, justifyContent: 'center', alignItems: 'center' },
  bottomBar: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', padding: 16, backgroundColor: '#f8f8f8' },
  bottomIcon: { width: 24, height: 24 },
  bottomText: { fontSize: 16 },
  bottomTextYummy: { color: '#1366b2' },
  bottomTextGo: { color: '#f4871a' },
  carouselImage: { width: '100%', height: 200, borderRadius: 8 },
  carouselText: { fontSize: 18, marginTop: 10 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, width: '80%' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold' },
  viewAll: { color: '#1366b2' },
  categoryItem: { alignItems: 'center', marginHorizontal: 8 },
  categoryImage: { width: 60, height: 60, borderRadius: 30 },
  categoryText: { marginTop: 8, fontSize: 14 },
  storeItem: { alignItems: 'center', marginHorizontal: 8 },
  storeImage: { width: 60, height: 60, borderRadius: 30 },
  storeText: { marginTop: 8, fontSize: 14 },
  productItem: { alignItems: 'center', marginHorizontal: 8, width: 150 },
  productImage: { width: '100%', height: 150, borderRadius: 8 },
  productName: { marginTop: 8, fontSize: 14, fontWeight: 'bold' },
  productPrice: { marginTop: 4, fontSize: 14, color: '#1366b2' },
  productDiscount: { marginTop: 2, fontSize: 12, color: '#f4871a' },
});

export default HomeScreen;
