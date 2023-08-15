import React from 'react';
import { StyleSheet, View } from 'react-native';

const Card = (props) => {

    return (
        <View style={styles.card}>
            <View style={styles.cardContent}>
                { props.children }
            </View>
        </View>
    )

};

const styles = StyleSheet.create({
    card: {
        borderRadius: 50,
        elevation: 3,
        backgroundColor: '#F0F0F0',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        shadowColor: '#FFD700',
        marginHorizontal: 4,
        marginVertical: 6,
        width: 334,
        height: 128,
    },
    cardContent: {
        marginHorizontal: 18,
        marginVertical: 10,
        alignItems: 'center',
    }
});

export default Card;