import PropTypes from 'prop-types';
import React from 'react';
import {ActivityIndicator, View, StyleSheet} from 'react-native';

/**
 * Component for Loader
 * @component
 *
 * @param {object} containerStyle
 * @param {boolean} inline
 * @param {string} color
 * @param {string} backgroundColor
 * @param {string} size
 */
const Loader = ({
  backgroundColor = '#fff',
  containerStyle = {},
  color = 'blue',
  //   size = 'large',
  inline = false,
}) => {
  return (
    <View
      style={[
        styles.loader,
        !inline && styles.full,
        {backgroundColor},
        containerStyle,
      ]}>
      <ActivityIndicator color={color} animating />
    </View>
  );
};

Loader.propTypes = {
  backgroundColor: PropTypes.string,
  containerStyle: PropTypes.object,
  color: PropTypes.string,
  size: PropTypes.oneOf(['large', 'small']),
  inline: PropTypes.bool,
};

const styles = StyleSheet.create({
  full: {
    flex: 1,
  },
  loader: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});

export default Loader;
