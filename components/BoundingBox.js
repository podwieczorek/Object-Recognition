import React from 'react';
import { View, Text } from 'react-native';

function BoundingBox({ width, height, top, left, objectLabel }) {
    // ratios carefully selected by manual testing
    const RATIO = 1.33; 
    const TOP_RATIO = 2; 

    return (
        <View style={{ position: 'absolute', top: TOP_RATIO*top, left, flexDirection: 'row'}}>
            <View
                style={{
                    width: width*RATIO,
                    height: height*RATIO,
                    borderColor: '#5e0acc',
                    borderWidth: 2,
                }}
            />
            <Text style={{ color: '#5e0acc', position: 'absolute', bottom: height*RATIO, left: 0, padding: 2, backgroundColor: 'transparent' }}>
                {objectLabel}
            </Text>
        </View>
    );
}

export default BoundingBox;
