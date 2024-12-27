import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';
import useCartReview from '../hooks/useCartReview';

const CartReviewScreen = ({ navigation }) => {
  const {
    cart,
    subtotal,
    tax,
    total,
    paymentMethod,
    handlePlaceOrder,
    togglePaymentMethod,
  } = useCartReview(navigation);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>Cart Summary</Text>

        <FlatList
          data={cart}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 10,
          }}
          style={{
            flexGrow: 0,
            maxHeight: '65%',
          }}
          renderItem={({ item }) => {
            const price = item.price || 0;
            const quantity = item.quantity || 1;
            return (
              <View style={styles.item}>
                <Image
                  style={styles.thumbnail}
                  source={{ uri: item.thumbnail }}
                />
                <View style={styles.detailsContainer}>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  <Text style={styles.itemCategory}>
                    Category: {item.category}
                  </Text>
                  <View style={styles.priceContainer}>
                    <Text style={styles.itemPrice}>₹{price.toFixed(2)}</Text>
                    <Text style={styles.originalPrice}>
                      ₹{(price + 500).toFixed(2)}
                    </Text>
                    <Text style={styles.discount}>50% OFF</Text>
                  </View>
                  <Text style={styles.itemDetails}>
                    {quantity} x ₹{price.toFixed(2)}
                  </Text>
                </View>
                <Text style={styles.itemTotal}>
                  ₹{(price * quantity).toFixed(2)}
                </Text>
              </View>
            );
          }}
        />

        {/* Payment Method */}
        <View style={styles.paymentContainer}>
          <Text style={styles.paymentLabel}>Payment Method:</Text>
          <TouchableOpacity
            style={styles.paymentButton}
            onPress={togglePaymentMethod}
          >
            <Text style={styles.paymentButtonText}>{paymentMethod}</Text>
          </TouchableOpacity>
        </View>

        {/* Order Summary */}
        <View style={styles.orderSummary}>
          <Text style={styles.summaryText}>Subtotal: ₹{subtotal.toFixed(2)}</Text>
          <Text style={styles.summaryText}>Tax: ₹{tax.toFixed(2)}</Text>
          <Text style={styles.totalText}>Total: ₹{total.toFixed(2)}</Text>
        </View>

        {/* Place Order Button */}
        <TouchableOpacity style={styles.placeOrderButton} onPress={handlePlaceOrder}>
          <Text style={styles.placeOrderText}>Place Order</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  container: { padding: 20 },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 10,
  },
  thumbnail: {
    height: 80,
    width: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  detailsContainer: { flex: 1 },
  itemTitle: { fontSize: 14, fontWeight: 'bold', marginBottom: 4, width: '90%' },
  itemCategory: { fontSize: 12, color: 'gray', marginBottom: 4 },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  itemPrice: { fontSize: 14, fontWeight: 'bold', color: 'green' },
  originalPrice: {
    fontSize: 12,
    textDecorationLine: 'line-through',
    color: 'gray',
    marginLeft: 10,
  },
  discount: { fontSize: 12, color: 'red', marginLeft: 10 },
  itemDetails: { fontSize: 12, color: 'gray' },
  itemTotal: { fontSize: 16, fontWeight: 'bold' },
  paymentContainer: { marginBottom: 20, paddingTop: 10 },
  paymentLabel: { fontSize: 16, marginBottom: 5 },
  paymentButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  paymentButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  orderSummary: { marginBottom: 80 },
  summaryText: { fontSize: 16, marginBottom: 5 },
  totalText: { fontSize: 18, fontWeight: 'bold', marginTop: 10 },
  placeOrderButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
  },
  placeOrderText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default CartReviewScreen;
