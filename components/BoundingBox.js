import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function BoundingBox({ width, height, top, left, objectLabel }) {
    return (
        <View style={{ position: 'absolute', top, left, flexDirection: 'row'}}>
            <View
                style={{
                    width,
                    height,
                    borderColor: '#5e0acc',
                    borderWidth: 2,
                }}
            />
            <Text style={{ color: '#5e0acc', position: 'absolute', bottom: height, left: 0, padding: 2, backgroundColor: 'transparent' }}>
                {objectLabel}
            </Text>
        </View>
    );
}

export default BoundingBox;

const styles = StyleSheet.create({

});
