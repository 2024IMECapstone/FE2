import React, { useState } from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Timeline from 'react-native-timeline-flatlist';

const TimelineAPI = ({
}) => {
    const [list, setList] = useState([
    {
        title: '타로가 배고픈 것 같아요',
    },
    {
        title: '타로가 졸린 것 같아요',
    },
    {
        title: '타로가 배앓이 중인 것 같아요',
    },
    {
        title: '타로가 트름하고 싶은 것 같아요',
    },
    ]);

    return (
        <Timeline
            data={list}
            circleSize={14}
            circleColor='#FFFACD'
            lineColor='#D9D9D9'
            lineWidth={3}
            descriptionStyle={styles.descriptionStyle}
            timeContainerStyle={{ minWidth: 52, marginTop: -5 }}
            descriptionStyle={{color:'black'}}
            options={{
                style: {paddingTop: 16}
            }}
        />
    )
}

export default function Sound() {
  return (
    <View style={styles.container}>
        <TimelineAPI />
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
  descriptionStyle: {
    color: '#000',
    fontSize: 10,
  },
});
