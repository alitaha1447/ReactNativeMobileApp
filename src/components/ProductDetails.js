import React from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView } from 'react-native';

const ProductDetails = ({ route }) => {
  const { title, description, images, price } = route.params.product;

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.card}>
        {/* Display image centered in one row */}
        <View style={styles.imageContainer}>
          {images.length > 0 && (
            <Image
              source={{ uri: images[0] }}
              style={styles.image}
              resizeMode="contain"
            />
          )}
        </View>
        {/* Display title, description, and price in another row */}
        <View style={styles.textContainer}>
          <Text style={styles.productTitle}>{title}</Text>
          <Text style={styles.productDescription}>{description}</Text>
          <Text style={styles.productPrice}>Price: {price}$</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'lightgrey',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'column',
    gap: 10,
    margin: 20,

    elevation: 5, // Add elevation for a box shadow effect
  },
  imageContainer: {
    alignItems: 'center',
    paddingTop: 20
  },
  image: {
    width: 250, // Adjust the width and height as needed
    height: 250,
    borderRadius: 50,
  },
  textContainer: {
    marginTop: 10,
  },
  productTitle: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  productDescription: {
    fontSize: 20,
    paddingVertical: 10,
  },
  productPrice: {
    paddingVertical: 10,
    fontSize: 18
  }
});
