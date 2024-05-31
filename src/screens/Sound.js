import React, { useState } from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Timeline from 'react-native-timeline-flatlist';

const TimelineAPI = ({
}) => {
    const [list, setList] = useState([
    {
        title: '타로가 배고픈 것 같아요',
        description: '오후 5:00',
    },
    {
        title: '타로가 졸린 것 같아요',
        description: '오후 3:00',
    },
    {
        title: '타로가 배앓이 중인 것 같아요',
        description: '오후 1:00',
    },
    {
        title: '타로가 트름하고 싶은 것 같아요',
        description: '오후 12:00',
    },
    ]);

    const renderDetail = (rowData) => {
        const { title, description } = rowData;
        return (
            <View style = {styles.rowDetail}>
                <Text style = {styles.titleStyle}>{title}</Text>
                <Text style = {styles.descriptionStyle}>{description}</Text>
            </View>
        )
    }

    return (
        <View style = {styles.timelineContainer}>
            <Timeline
                showTime={false}
                data={list}
                circleSize={14}
                circleColor='#FFFACD'
                lineColor='#D9D9D9'
                lineWidth={3}
                timeContainerStyle={{ minWidth: 0}}
                descriptionStyle={{color:'black'}}
                renderDetail = {renderDetail}

            />
        </View>
    );
}

export default function Sound() {
  return (
        <TimelineAPI />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    // flex: 100,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timelineContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width:0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    height: 179,
    margin: 16,
  },
  detailContainer: {
    flex: 1,
    flexDirection: 'column',
    paddingBottom: 20,
    justifyContent: 'space-between',
  },
  rowDetail: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  descriptionStyle: {
    color: 'gray',
    fontSize: 10,
    // marginTop : 5,
    textAlign: 'right',
    flex: 1,
    marginRight: 16,
  },
  titleStyle: {
    color: 'black',
    fontSize: 12,
    marginRight: 10,
  },
});
