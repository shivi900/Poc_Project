import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/homescreen';
import ProductDetails from '../screens/productDetails';
import CartScreen from '../screens/cartScreen';
import CartReviewScreen from '../screens/cartReviewScreen';
import ConfirmationScreen from '../screens/confirmationScreen'

const Stack = createStackNavigator();

const Router = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          options={{
            title: 'Products', headerLeft: () => null, 
            gestureEnabled: false,  
          }}
          component={HomeScreen}
        >

        </Stack.Screen>
        <Stack.Screen
          name="ProductDetails"
          options={{ title: 'Product Details' }}
          component={ProductDetails}
        >

        </Stack.Screen>
        <Stack.Screen
          name="Cart"
          options={{ title: 'Your Cart' }}
          component={CartScreen}
        >

        </Stack.Screen>
        <Stack.Screen
          name="CartReview"
          options={{ title: 'Cart Review' }}
          component={CartReviewScreen}
        >

        </Stack.Screen>
        <Stack.Screen
          name="ConfirmationScreen"
          options={{
            title: 'Confirmation Screen', headerLeft: () => null, 
            gestureEnabled: false,  
          }}
          component={ConfirmationScreen}
        >

        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
