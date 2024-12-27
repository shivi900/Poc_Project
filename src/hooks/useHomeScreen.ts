import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const useHomeScreen = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [banners, setBanners] = useState([]);
  const cart = useSelector((state) => state.cart.cart);

  // Fetch products and banners from the API
  const fetchProductsAndBanners = async () => {
    try {
      const response = await fetch('https://dummyjson.com/products');
      const data = await response.json();
      setProducts(data.products);
      setFilteredProducts(data.products);

      // Create banners dynamically for each category
      const categories = [...new Set(data.products.map((item) => item.category))]; // Unique categories
      const bannersData = categories.map((category) => {
        const firstProduct = data.products.find((item) => item.category === category);
        return firstProduct; // First product of each category
      });
      setBanners(bannersData);
    } catch (error) {
      console.error('Error fetching products and banners:', error);
    }
  };

  // Handle search functionality
  const handleSearch = (text) => {
    setSearchText(text);
    if (text) {
      const filtered = products.filter((item) =>
        item.category.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  };

  useEffect(() => {
    fetchProductsAndBanners();
  }, []);

  return {
    products,
    filteredProducts,
    searchText,
    cart,
    banners, // Return banners for use in the component
    handleSearch,
  };
};

export default useHomeScreen;
