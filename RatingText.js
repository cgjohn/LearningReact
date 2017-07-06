/* @flow */

import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  Platform
 } from 'react-native';

class RatingText extends Component {
  props: {
    value: number;
    count: number;
  };

  render() {
    const {count, value} = this.props;
    const stars = [];
    for (let star = 1; star <= 5; star++) {
      const source = value >= star
        ? require('./img/star_full@2x.png')
        : require('./img/star_empty@2x.png');
      stars.push(<Image key={star} source={source} style={styles.star} />);
    }
    return (
      <Text>
        {stars}
        {' '}
        ({count})
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  star: {
    ...Platform.select({
      android: {
        height: 30,
        width: 30,
      },
    }),
  },
});

export default RatingText;
