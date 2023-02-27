import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useFavouritesContext} from '../context/FavouritesContext';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  noFavouritesView: {
    flex: 1,
    alignItems: 'center',
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

const Favourites = () => {
  const {favourites, removeFromFavouritesHandler} = useFavouritesContext();

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
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => removeFromFavouritesHandler(item)}>
            <Text style={styles.addButtonText}>Remove item</Text>
          </TouchableOpacity>
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
      {favourites.length > 0 ? (
        <FlatList
          data={favourites}
          keyExtractor={element => element.id}
          renderItem={renderItem}
        />
      ) : (
        <View style={styles.noFavouritesView}>
          <Text>You have no favourites!</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Favourites;
