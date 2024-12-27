import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import useCart from '../hooks/useCart'; // Custom hook for cart logic

const CartScreen = ({ navigation }) => {
  const { cart, increaseQuantity, decreaseQuantity, removeItem, calculateTotal } = useCart(); // Custom hook methods
  const total = calculateTotal(); // Calculate total amount

  return (
    <View style={styles.container}>
      {cart.length === 0 ? (
        <Text style={styles.emptyText}>Your cart is empty!</Text>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.cartItem}>
                <Image source={{ uri: item.thumbnail }} style={styles.image} />
                <View style={styles.details}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.category}>Category: {item.category}</Text>
                  <View style={styles.priceContainer}>
                    <Text style={styles.price}>₹{item.price.toFixed(2)}</Text>
                    <Text style={styles.originalPrice}>
                      ₹{(item.price + 500).toFixed(2)}
                    </Text>
                    <Text style={styles.discount}>50% OFF</Text>
                  </View>
                  <View style={styles.quantityContainer}>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => decreaseQuantity(item.id)}
                    >
                      <Text style={styles.quantityText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantity}>{item.quantity}</Text>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => increaseQuantity(item.id)}
                    >
                      <Text style={styles.quantityText}>+</Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    onPress={() => removeItem(item.id)}
                    style={styles.removeButton}
                  >
                    <Text style={styles.removeText}>Remove</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />

          <View style={styles.summary}>
            <Text style={styles.totalText}>Total: ₹{total.toFixed(2)}</Text>
            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={() => navigation.navigate('CartReview')}
            >
              <Text style={styles.checkoutText}>Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#fff' },
  emptyText: { textAlign: 'center', fontSize: 18, marginTop: 20 },
  cartItem: { flexDirection: 'row', marginBottom: 15, alignItems: 'center' },
  image: { width: 80, height: 80, borderRadius: 10, marginRight: 10 },
  details: { flex: 1 },
  title: { fontSize: 16, fontWeight: 'bold' },
  category: { fontSize: 14, color: 'gray', marginTop: 5, marginBottom: 5 },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  price: { fontSize: 16, fontWeight: 'bold', color: 'green' },
  originalPrice: {
    fontSize: 14,
    textDecorationLine: 'line-through',
    color: 'gray',
    marginLeft: 10,
  },
  discount: { fontSize: 14, color: 'red', marginLeft: 10 },
  quantityContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  quantityButton: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  quantityText: { fontSize: 16 },
  quantity: { marginHorizontal: 10, fontSize: 16 },
  removeButton: { marginTop: 5 },
  removeText: { color: 'red', fontSize: 14 },
  summary: {
    borderTopWidth: 1,
    borderColor: '#ddd',
    paddingTop: 10,
    marginTop: 10,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 10,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    color: '#333',
  },
  checkoutButton: {
    backgroundColor: '#007bff',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 10,
  },
  checkoutText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default CartScreen;
