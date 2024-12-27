import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import useProductDetails from '../hooks/useProductDetails';

const ProductDetails = ({ route }) => {
  const { product } = route.params;

  const {
    cart,
    isInCart,
    handleAddToCart,
    handleRemoveFromCart,
    handleViewCart,
  } = useProductDetails(product);

  // Calculate discount
  const originalPrice = product.price + 500; // Assuming a fixed discount of ₹500
  const discountPercentage = Math.round((500 / originalPrice) * 100);

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.thumbnail }} style={styles.image} />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.category}>Category: {product.category}</Text>

      {/* Price and Discount */}
      <View style={styles.priceContainer}>
        <Text style={styles.price}>₹{product.price.toFixed(2)}</Text>
        <Text style={styles.originalPrice}>₹{originalPrice.toFixed(2)}</Text>
        <Text style={styles.discount}>{discountPercentage}% OFF</Text>
      </View>

      <Text style={styles.description}>{product.description}</Text>

      {/* Add/Remove from Cart Button */}
      <View style={styles.buttonContainer}>
        {isInCart ? (
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: 'red' }]}
            onPress={handleRemoveFromCart}
          >
            <Text style={styles.actionText}>Remove from Cart</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#007bff' }]}
            onPress={handleAddToCart}
          >
            <Text style={styles.actionText}>Add to Cart</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* View Cart Button */}
      <TouchableOpacity style={styles.cartButton} onPress={handleViewCart}>
        <Text style={styles.cartText}>View Cart ({cart.length})</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  image: { width: '100%', height: 300, borderRadius: 10, marginBottom: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  category: { fontSize: 16, color: 'gray', marginBottom: 10 },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  price: { fontSize: 20, color: 'green', fontWeight: 'bold' },
  originalPrice: {
    fontSize: 16,
    textDecorationLine: 'line-through',
    color: 'gray',
    marginLeft: 10,
  },
  discount: { fontSize: 16, color: 'red', marginLeft: 10 },
  description: { fontSize: 16, marginBottom: 20 },
  buttonContainer: { marginVertical: 10 },
  actionButton: {
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  actionText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  cartButton: {
    position: 'absolute',
    bottom: 40,
    left: 10,
    right: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
    padding: 15,
  },
  cartText: { color: 'white', fontSize: 16, textAlign: 'center', fontWeight: 'bold' },
});

export default ProductDetails;
