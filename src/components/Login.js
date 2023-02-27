import React from 'react';

import {StyleSheet, View, SafeAreaView, Text} from 'react-native';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

const Login = () => {
  return (
    <SafeAreaView style={styles.root}>
      <View>
        <Text>Login</Text>
      </View>
    </SafeAreaView>
  );
};

export default Login;
