import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';


const ConfirmationScreen = ({ navigation }) => {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    // Animate the image scaling
    scale.value = withTiming(1, {
      duration: 800,
      easing: Easing.bounce,
    });

    // Animate the text opacity
    opacity.value = withTiming(1, {
      duration: 800,
      delay: 400,
    });
  }, []);

  const imageStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const textStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <View style={styles.container}>
      {/* Animated Image */}
      <Animated.Image
        source={require('../../assets/images/orderplaced.png')}
        style={[styles.image, imageStyle]}
        resizeMode="contain"
      />

      {/* Animated Text */}
      <Animated.View style={[styles.textContainer, textStyle]}>
        <Text style={styles.successText}>Order Placed Successfully!</Text>
        <Text style={styles.subText}>
          Thank you for shopping with us. Your order will be delivered soon.
        </Text>
      </Animated.View>

      {/* Go to Home Button */}
      <TouchableOpacity
        style={styles.homeButton}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.homeButtonText}>Go to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  textContainer: {
    alignItems: 'center',
  },
  successText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'green',
    marginBottom: 10,
  },
  subText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'gray',
  },
  homeButton: {
    marginTop: 30,
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  homeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ConfirmationScreen;
