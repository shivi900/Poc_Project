import React from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  Image, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  Dimensions 
} from 'react-native';
import useHomeScreen from '../hooks/useHomeScreen'; // Import the custom hook
import Icon from 'react-native-vector-icons/FontAwesome5';
const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const {
    filteredProducts,
    searchText,
    cart,
    handleSearch,
  } = useHomeScreen();

  const renderProductItem = ({ item }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => navigation.navigate('ProductDetails', { product: item })}
    >
      <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.price}>${item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Search Bar with My Cart Button */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search by category..."
          value={searchText}
          onChangeText={handleSearch}
        />
        {/* <TouchableOpacity
          style={styles.cartButton}
          onPress={() => navigation.navigate('Cart')}
        >
          <Text style={styles.cartText}>My Cart ({cart.length})</Text>
        </TouchableOpacity> */}
         <TouchableOpacity style={styles.cartButton}  onPress={() => navigation.navigate('Cart')}>
      <View style={styles.iconContainer}>
        {/* Bag Icon */}
        <Icon name="shopping-cart" size={24} color="#000" />
        {cart.length > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{cart.length}</Text>
          </View>
        )}
      </View>
      <Text style={styles.cartText}>Bag</Text>
    </TouchableOpacity>
      </View>

      {/* Product List */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProductItem}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
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
    alignSelf:'center',
    top:8
  },
  cartText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  productCard: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
  },
  thumbnail: { width: '100%', height: 150, borderRadius: 10, marginBottom: 10 },
  title: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  price: { fontSize: 14, color: 'gray', marginBottom: 10 },
  listContent: { paddingBottom: 20 },
});

export default HomeScreen;
