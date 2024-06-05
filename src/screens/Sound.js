import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import Timeline from 'react-native-timeline-flatlist';
import axios from 'axios';

const TimelineAPI = ({ data, showAll, onShowMore }) => {
    const renderDetail = (rowData) => {
        const { title, description } = rowData;
        return (
            <View style={styles.rowDetail}>
                <Text style={styles.titleStyle}>{title}</Text>
                <Text style={styles.descriptionStyle}>{description}</Text>
            </View>
        );
    };

    return (
        <View style={[styles.timelineContainer, { height: showAll ? data.length * 42 + 2 : data.length * 42 + 20}]}>
            <Timeline
                showTime={false}
                data={showAll ? data.slice(0, data.length) : data.slice(0, 4)}
                circleSize={14}
                circleColor='#FFFACD'
                lineColor='#D9D9D9'
                lineWidth={3}
                descriptionStyle={{ color: 'black' }}
                renderDetail={renderDetail}
            />
            {data.length > 4 && !showAll && (
                <TouchableHighlight
                    style={styles.buttonContainer}
                    underlayColor="#DDDDDD"
                    onPress={onShowMore}
                >
                    <Text style={styles.buttonText}>오늘의 타임라인 보기</Text>
                </TouchableHighlight>
            )}
        </View>
    );
}

export default function Sound() {
    const [crying, setCrying] = useState([]);
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    'http://ec2-43-200-172-11.ap-northeast-2.compute.amazonaws.com:8080/api/crying'
                );
                const mappedData = response.data.map(item => {
                    let title;
                    switch (item.content) {
                        case '졸림':
                            title = '타로가 졸린 것 같아요';
                            break;
                        case '배고픔':
                            title = '타로가 배고픈 것 같아요';
                            break;
                        case '배앓이':
                            title = '타로가 배앓이 중인 것 같아요';
                            break;
                        case '트름':
                            title = '타로가 트름하고 싶은 것 같아요';
                            break;
                        default:
                            title = item.content;
                    }
                    return {
                        title: title,
                        description: item.created
                    };
                });
                setCrying(mappedData);
            } catch (error) {
                console.error('Error fetching Crying data:', error);
            }
        };

        fetchData();
    }, []);

    const handleShowMore = () => {
        setShowAll(true);
    };
    return (
        <TimelineAPI data={crying} showAll={showAll} onShowMore={handleShowMore} />
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    timelineContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
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
        textAlign: 'right',
        flex: 1,
        marginRight: 16,
    },
    titleStyle: {
        color: 'black',
        fontSize: 12,
        marginRight: 10,
    },
    buttonContainer: {
        padding: 10,
        borderRadius: 4,
        backgroundColor: 'white',
        alignItems: 'center',
        borderWidth: 0.2,
        marginTop: 10,
    },
    buttonText: {
        color: '#000000',
    },
});