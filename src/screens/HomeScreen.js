import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, Dimensions } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import Carousel from 'react-native-reanimated-carousel';

const HomeScreen = ({ navigation }) => {
  const carouselItems = [
    { title: 'Item 1', imageUrl: '../../../assets/images/ad-banners/banner1.jpeg' },
    { title: 'Item 2', imageUrl: '../../../assets/images/ad-banners/banner2.jpeg' },
    { title: 'Item 3', imageUrl: '../../../assets/images/ad-banners/banner3.jpeg' },
  ];

  const categories = [
    { name: 'Groceries', imageUrl: '../../../assets/images/categories/groceries.jpeg' },
    { name: 'Vegetables', imageUrl: '../../../assets/images/categories/vegetables.jpeg' },
    { name: 'Fruits', imageUrl: '../../../assets/images/categories/fruits.jpeg' },
    { name: 'Dairy', imageUrl: '../../../assets/images/categories/dairy.jpeg' },
    { name: 'Electronics', imageUrl: '../../../assets/images/categories/electronics.jpeg' },
    { name: 'Detergents', imageUrl: '../../../assets/images/categories/detergents.jpeg' },
    { name: 'Beverages', imageUrl: '../../../assets/images/categories/beverages.jpeg' },
  ];

  const stores = [
    { name: 'Saravana Stores', imageUrl: '../../../assets/images/stores/saravana.jpeg' },
    { name: 'D mart', imageUrl: '../../../assets/images/stores/dmart.jpeg' },
    { name: 'RMKV', imageUrl: '../../../assets/images/stores/rmkv.png' },
    { name: 'Aachi Masala', imageUrl: '../../../assets/images/stores/aachi.png' },
  ];

  const featuredProducts = [
    { name: 'Toor Dal', imageUrl: '../../../assets/images/products/toor.jpeg', price: '₹100', discount: '10% off' },
    { name: 'Coconut Oil', imageUrl: '../../../assets/images/products/oil.jpeg', price: '₹200', discount: '5% off' },
    { name: 'Dove Body wash', imageUrl: '../../../assets/images/products/dove.jpeg', price: '₹150', discount: '15% off' },
    { name: 'Shampoo 1L', imageUrl: '../../../assets/images/products/shampoo.jpeg', price: '₹250', discount: '20% off' },
    { name: 'Country Tomatoes', imageUrl: '../../../assets/images/products/tomato.jpeg', price: '₹50', discount: '5% off' },
  ];

  const renderCategoryItem = ({ item }) => (
    <View style={styles.categoryItem}>
      <Image source={{ uri: item.imageUrl }} style={styles.categoryImage} />
      <Text style={styles.categoryText}>{item.name}</Text>
    </View>
  );

  const renderStoreItem = ({ item }) => (
    <View style={styles.storeItem}>
      <Image source={item.imageUrl} style={styles.storeImage} />
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
                // onSnapToItem={(index) => console.log('current index:', index)}
                renderItem={({ index }) => (
                  <View
                      style={{
                          flex: 1,
                          justifyContent: 'center',
                      }}
                  >
                      <Image source={carouselItems[index].imageUrl} style={styles.carouselImage} />
                      <Text style={styles.carouselText}>{carouselItems[index].title}</Text>
                  </View>
              )}
            />
        </View>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Shop by categories</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>View all</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={categories}
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
          data={stores}
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
  );
};

const styles = StyleSheet.create({
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
