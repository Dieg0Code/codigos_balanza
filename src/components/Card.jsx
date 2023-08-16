import React from 'react';
import { StyleSheet, View } from 'react-native';

const Card = (props) => {

    return (
        <View style={styles.card}>
            { props.children }
        </View>
    )

};

const styles = StyleSheet.create({
    card: {
        borderRadius: 50,
        elevation: 7,
        backgroundColor: '#F0F0F0',
        shadowOpacity: 0.3,
        shadowRadius: 9,
        shadowColor: '#19C37D',
        marginHorizontal: 4,
        marginVertical: 6,
        width: 334,
        height: 145,
    },
    cardContent: {
        marginHorizontal: 18,
        marginVertical: 10,
        alignItems: 'center',
    }
});

export default Card;