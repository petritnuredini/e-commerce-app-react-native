/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import MyTabs from './src/components/TabNavigation';
import FavouritesContextProvider from './src/context/FavouritesContext';

function App() {
  return (
    <NavigationContainer>
      <FavouritesContextProvider>
        <MyTabs />
      </FavouritesContextProvider>
    </NavigationContainer>
  );
}

export default App;
