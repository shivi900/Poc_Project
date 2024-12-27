import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { addToCart, removeFromCart } from '../redux/actions/actions';

const useProductDetails = (product) => {
  const cart = useSelector((state) => state.cart.cart); // Access cart from Redux
  const dispatch = useDispatch(); // To dispatch actions
  const navigation = useNavigation(); // To handle navigation

  // Check if the product is already in the cart
  const isInCart = cart.some((item) => item.id === product.id);

  const handleAddToCart = () => {
    dispatch(addToCart(product)); // Add product to cart
  };

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(product.id)); // Remove product from cart
  };

  const handleViewCart = () => {
    navigation.navigate('Cart'); // Navigate to Cart screen
  };

  return {
    cart,
    isInCart,
    handleAddToCart,
    handleRemoveFromCart,
    handleViewCart,
  };
};

export default useProductDetails;
