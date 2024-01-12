import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Products({ searchTerm, searchIconClicked }) {

  const navigation = useNavigation();

  const [getData, setGetData] = useState([]);

  const fetchData = async (limit = 10) => {
    try {
      const response = await fetch(`https://dummyjson.com/products?_limit=${limit}`);
      const data = await response.json();
      const data1 = await data["products"];
      setGetData(data1);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const filterData = () => {
    if (searchIconClicked) {
      if (searchTerm.length !== 0) {
        const filteredData = getData.filter((item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()));
        return filteredData;
      } else {
        return getData;
      }
    } else {
      return getData;
    }
  }

  const navigateToDetails = (product) => {
    navigation.navigate('ProductDetails', { product });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <FlatList
          data={filterData()}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity style={styles.card} onPress={() => navigateToDetails(item)}>
                {/* Render only the first image from the images array */}
                {item.images.length > 0 && (
                  <Image
                    source={{ uri: item.images[0] }}
                    style={styles.image}
                    resizeMode="contain"
                  />
                )}
                <View style={{ flexDirection: 'column', marginLeft: 10, flex: 1, justifyContent: 'center' }}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.description}>{item.description}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 50,
    marginTop: 20,
  },
  card: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 10,
    margin: 5,
    flexWrap: 'wrap',
    elevation: 5, // Add elevation for a box shadow effect
  },
  image: {
    width: 80, // Adjust the width and height as needed
    height: 80,
    borderRadius: 50,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  description: {
    fontWeight: 'bold',
    fontSize: 12,
  }
});
