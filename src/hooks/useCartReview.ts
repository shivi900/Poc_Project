import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../redux/actions/actions';

const useCartReview = (navigation) => {
  const [paymentMethod, setPaymentMethod] = useState('Credit Card'); // Default payment method
  const cart = useSelector((state) => state.cart.cart); // Access cart state from Redux
  const dispatch = useDispatch();

  // Calculate order summary
  const subtotal = cart.reduce((sum, item) => {
    const price = item.price || 0; // Default to 0 if price is missing
    const quantity = item.quantity || 1; // Default to 1 if quantity is missing
    return sum + price * quantity;
  }, 0);

  const tax = subtotal * 0.1; // Assuming 10% tax
  const total = subtotal + tax;

  const handlePlaceOrder = () => {
    dispatch(clearCart()); // Clear the cart
    navigation.navigate('ConfirmationScreen'); // Navigate to Confirmation Screen
  };

  const togglePaymentMethod = () => {
    setPaymentMethod((prev) =>
      prev === 'Credit Card' ? 'PayPal' : 'Credit Card'
    );
  };

  return {
    cart,
    subtotal,
    tax,
    total,
    paymentMethod,
    handlePlaceOrder,
    togglePaymentMethod,
  };
};

export default useCartReview;
