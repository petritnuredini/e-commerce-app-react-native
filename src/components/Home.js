import React, {useState, useEffect} from 'react';
import {useFavouritesContext} from '../context/FavouritesContext';

import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  loadingContainer: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 180,
    height: 180,
  },
  wrapper: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#dedede',
    padding: 10,
  },
  imageAndButtonWraper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageWrapper: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  textWrapper: {
    flex: 1,
  },
  text: {
    marginVertical: 5,
  },
  addButton: {
    marginVertical: 10,
    padding: 10,
    borderRadius: 7,
    backgroundColor: 'tomato',
  },
  addButtonText: {
    fontSize: 15,
    color: '#ffffff',
  },
});

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const {favourites, addToFavouritesHandler, removeFromFavouritesHandler} =
    useFavouritesContext();

  const checker = item => {
    const boolean = favourites.some(element => element.id === item.id);

    return boolean;
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get('https://fakestoreapi.com/products')
      .then(res => {
        setProducts(res.data);
      })
      .catch(e => console.log(e))
      .finally(() => setLoading(false));
  }, []);

  const renderItem = ({item}) => (
    <View style={styles.wrapper}>
      <View style={styles.imageAndButtonWraper}>
        <View style={styles.imageWrapper}>
          <Image
            source={{uri: item.image}}
            style={styles.image}
            resizeMode={'contain'}
          />
        </View>
        <View>
          {checker(item) ? (
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => removeFromFavouritesHandler(item)}>
              <Text style={styles.addButtonText}>Remove item</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => addToFavouritesHandler(item)}>
              <Text style={styles.addButtonText}>Add To Favourites</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={styles.textWrapper}>
        <Text style={styles.text}>{item.title}</Text>
        <Text style={styles.text}>{item.description}</Text>
        <Text style={styles.text}>${item.price}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.root}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={'large'} color={'#000000'} />
        </View>
      ) : (
        <FlatList
          data={products}
          keyExtractor={element => element.id}
          renderItem={renderItem}
        />
      )}
    </SafeAreaView>
  );
};

export default Home;
