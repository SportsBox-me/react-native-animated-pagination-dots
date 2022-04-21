import React, { useEffect, useState } from "react";
import {
  Animated,
  StyleSheet,
  useWindowDimensions,
  View,
  ViewStyle,
} from 'react-native';
export interface SlidingDotProps {
  data: Array<Object>;
  scrollX: Animated.Value;
  dotSize?: number;
  containerStyle?: ViewStyle;
  dotStyle?: ViewStyle;
  dotContainerStyle?: ViewStyle;
  slidingIndicatorStyle?: ViewStyle;
  marginHorizontal?: number;
}

let inputRange = [-0, 0, 0];

const SlidingDot = ({
  scrollX,
  data,
  dotSize,
  containerStyle,
  dotStyle,
  slidingIndicatorStyle,
  marginHorizontal,
}: SlidingDotProps) => {

  const defaultProps = {
    dotSize: dotSize || 12,
    marginHorizontal: marginHorizontal || 3,
  };
  
  const [translateX, set_translateX] = useState(inputRange);

  const calculate_translateX = () => {
    set_translateX(
      scrollX.interpolate({
        inputRange,
        outputRange: [
          -defaultProps.dotSize + defaultProps.marginHorizontal * 2,
          0,
          defaultProps.dotSize + defaultProps.marginHorizontal * 2,
        ],
      })
    )
  }

  useEffect(() => {
    calculate_translateX()
  }, [scrollX])

  return (
    <View
      style={[
        { height: defaultProps.dotSize },
        styles.containerStyle,
        containerStyle,
      ]}
      onLayout={(event) => {
        const width = event.nativeEvent.layout?.width
        if (width) {
          inputRange = [-width, 0, width];
          calculate_translateX();
        }
      }}
    >
      <Animated.View
        style={[
          {
            width: defaultProps.dotSize,
            height: defaultProps.dotSize,
            borderRadius: defaultProps.dotSize / 2,
          },
          styles.slidingIndicatorStyle,
          // eslint-disable-next-line react-native/no-inline-styles
          {
            position: 'absolute',
            marginHorizontal: marginHorizontal,
            transform: [{ translateX }],
          },
          slidingIndicatorStyle,
        ]}
      />
      {data.map((_item, index) => {
        return (
          <View
            key={index}
            style={[
              {
                width: defaultProps.dotSize,
                height: defaultProps.dotSize,
                marginHorizontal: defaultProps.marginHorizontal,
                borderRadius: defaultProps.dotSize / 2,
              },
              styles.dotStyle,
              dotStyle,
            ]}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    position: 'absolute',
    bottom: 30,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  dotStyle: {
    backgroundColor: '#347af0',
    opacity: 0.4,
  },
  slidingIndicatorStyle: {
    backgroundColor: '#347af0',
    zIndex: 99,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});

export default SlidingDot;
