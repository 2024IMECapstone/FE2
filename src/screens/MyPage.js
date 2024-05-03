import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

export default function MyPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>MyPage</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'black',
  },
});
