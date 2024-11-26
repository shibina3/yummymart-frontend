import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, Dimensions, ScrollView } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import Carousel from 'react-native-reanimated-carousel';

const CategoryScreen = ({ route, navigation }) => {    
  const { item } = route.params;
  const [products, setProducts] = useState([]);
  const [carouselItems, setCarouselItems] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
        
      try {
        const response = await fetch(`http://192.168.100.121:4000/get/products`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
            body: JSON.stringify({ category: item.name }),
        });
        const data = await response.json();
        setProducts(data.products);
        // setCarouselItems(data.carouselItems);
        const carousels = [
            { title: 'Item 1', imageUrl: 'http://192.168.100.121:8081/assets/images/ad-banners/banner1.jpeg' },
            { title: 'Item 2', imageUrl: 'http://192.168.100.121:8081/assets/images/ad-banners/banner2.jpeg' },
            { title: 'Item 3', imageUrl: 'http://192.168.100.121:8081/assets/images/ad-banners/banner3.jpeg' },
          ];
        setCarouselItems(carousels);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [item.name]);

  const renderProductItem = ({ item }) => (
    <View style={styles.productItem}>
      <Image source={{ uri: item.image_url }} style={styles.productImage} />
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
        <View style={styles.leftContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={24} color="black" style={styles.icon} />
          </TouchableOpacity>
          <Text style={styles.categoryName}>{item.name}</Text>
        </View>
        <View style={styles.topBarIcons}>
          <TouchableOpacity>
            <AntDesign name="filter" size={24} color="black" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <AntDesign name="search1" size={24} color="black" style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Component */}
      <ScrollView contentContainerStyle={styles.mainComponent}>
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
                <Image source={{ uri: carouselItems[index].image_url }} style={styles.carouselImage} />
                <Text style={styles.carouselText}>{carouselItems[index].title}</Text>
              </View>
            )}
          />
        </View>
        <FlatList
          data={products}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.id}
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
  leftContainer: { flexDirection: 'row', alignItems: 'center' },
  categoryName: { fontSize: 18, fontWeight: 'bold', marginLeft: 8 },
  topBarIcons: { flexDirection: 'row' },
  icon: { width: 24, height: 24, marginLeft: 16 },
  mainComponent: { flexGrow: 1, padding: 16 },
  columnWrapper: { justifyContent: 'space-between' },
  flatListContent: { paddingBottom: 16 },
  carouselImage: { width: '100%', height: 200, borderRadius: 8 },
  carouselText: { fontSize: 18, marginTop: 10, textAlign: 'center' },
  productItem: { alignItems: 'center', marginBottom: 16, width: '48%' },
  productImage: { width: 100, height: 100, borderRadius: 8, marginBottom: 8 },
  productName: { fontSize: 16, textAlign: 'center' },
  productPrice: { fontSize: 14, color: '#1366b2', textAlign: 'center' },
  productDiscount: { fontSize: 12, color: '#f4871a', textAlign: 'center' },
  bottomBar: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', padding: 16, backgroundColor: '#f8f8f8' },
  bottomIcon: { width: 24, height: 24 },
  bottomText: { fontSize: 16 },
  bottomTextYummy: { color: '#1366b2' },
  bottomTextGo: { color: '#f4871a' },
});

export default CategoryScreen;
