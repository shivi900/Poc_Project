import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import useHomeScreen from '../hooks/useHomeScreen';
import Carousel from 'react-native-reanimated-carousel';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const { filteredProducts, searchText, cart, handleSearch,banners } = useHomeScreen();
  

  const renderCarousel = () => (
    <View style={styles.carouselContainer}>
      <Carousel
        loop
        width={width - 20}
        height={150}
        autoPlay
        data={banners}
        scrollAnimationDuration={1000}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item.thumbnail }}
            style={styles.carouselImage}
            resizeMode="contain"
          />
        )}
      />
    </View>
  );

  const renderProductItem = ({ item }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => navigation.navigate('ProductDetails', { product: item })}
    >
      <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.category} numberOfLines={1}>
          {item.category}
        </Text>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>₹{item.price}</Text>
          <Text style={styles.discountPrice}>₹{item.price + 500}</Text>
          <Text style={styles.discount}>50% OFF</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search by category..."
          value={searchText}
          onChangeText={handleSearch}
        />
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => navigation.navigate('Cart')}
        >
          <View style={styles.iconContainer}>
            <Image source={require('../../assets/images/shoppingCart.png')} style={{height:40,width:40}} color="#000" />
            {cart.length > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{cart.length}</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </View>

      {/* FlatList with Carousel as Header */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProductItem}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        ListHeaderComponent={renderCarousel} // Add Carousel as the header
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  searchBar: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: '#f9f9f9',
    marginRight: 10,
  },
  iconContainer: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'red',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  cartButton: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    padding: 10,
  },
  cartText: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
  },
  carouselContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  carouselImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  productCard: {
    width: width / 2 - 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 15,
    marginHorizontal: 5,
  },
  thumbnail: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  infoContainer: {
    padding: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  category: {
    fontSize: 12,
    color: 'gray',
    marginBottom: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  discountPrice: {
    fontSize: 12,
    textDecorationLine: 'line-through',
    color: 'gray',
    marginLeft: 6,
  },
  discount: {
    fontSize: 12,
    color: 'red',
    marginLeft: 6,
  },
  listContent: { paddingBottom: 20, paddingHorizontal: 10 },
});

export default HomeScreen;
