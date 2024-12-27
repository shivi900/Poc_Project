import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const useHomeScreen = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const cart = useSelector((state) => state.cart.cart); // Access cart from Redux

  // Fetch products from the API
  const fetchProducts = async () => {
    try {
      const response = await fetch('https://dummyjson.com/products');
      const data = await response.json();
      setProducts(data.products);
      setFilteredProducts(data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Filter products based on search input
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
    fetchProducts();
  }, []);

  return {
    products,
    filteredProducts,
    searchText,
    cart,
    handleSearch,
  };
};

export default useHomeScreen;
