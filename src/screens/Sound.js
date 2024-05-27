import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Timeline from 'react-native-timeline-flatlist';

const TimelineAPI = ({
}) => {
    const [list, setList] = useState([
    {
        time: <Text> 아침 </Text>,
        title: <Text> 오늘 </Text>,
        description: <Text> 아놔 </Text>
    },
    {
        time: <Text> 점심 </Text>,
        title: <Text> 오늘 </Text>,
        description: <Text> 오므라이스 </Text>
    }]);
}

export default function Sound() {
  return (
    <View style={styles.container}>
      <Text>수정수정</Text>
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
});
