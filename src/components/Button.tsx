/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-native/no-inline-styles */
import {TouchableOpacity, ActivityIndicator, Text} from 'react-native';

import PropTypes from 'prop-types';
import {borderGrey, textSecondary} from '../constants/colors';

/**
 * Component for Button
 * @component
 *
 * @param {string} text
 * @param {function} onPress
 * @param {boolean} disabled
 * @param {string} backgroundColor
 * @param {string} color
 * @param {boolean} loading
 * @param {object} style
 * @param {object} textStyle
 * @param {TSX.Element} children
 *
 * @returns {TSX.Element}
 */
type ButtonProps = {
  text: string;
  onPress: () => void;
  style: {};
  textStyle: {};
  loading: false;
  disabled: false;
  outlined: false;
  dottedOutline: false;
  borderColor: string;
  backgroundColor: string;
  color: string;
};
const Button = (Props: ButtonProps) => {
  return (
    <TouchableOpacity
      style={{
        height: 45,
        backgroundColor: Props.outlined
          ? 'transparent'
          : Props.disabled
          ? borderGrey
          : Props.backgroundColor,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        borderRadius: 4,
        width: '100%',
        opacity: 1,
        borderWidth: Props.outlined ? 1 : 0,
        borderStyle: Props.dottedOutline ? 'dashed' : 'solid',
        borderColor: Props.borderColor || Props.backgroundColor,
        ...Props.style,
      }}
      onPress={Props.onPress}
      activeOpacity={0.5}
      disabled={Props.disabled || Props.loading}>
      {Props.loading ? (
        <ActivityIndicator size="small" animating color={Props.color} />
      ) : (
        <Text
          style={{
            color: Props.disabled
              ? textSecondary
              : Props.outlined
              ? Props.backgroundColor
              : Props.color,
            fontSize: 14,
            fontWeight: 'bold',
            textAlign: 'center',
            ...Props.textStyle,
          }}>
          {Props.text}
        </Text>
      )}
    </TouchableOpacity>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  style: PropTypes.object,
  textStyle: PropTypes.object,
  loading: PropTypes.bool,
  outlined: PropTypes.bool,
  dottedOutline: PropTypes.bool,
  borderColor: PropTypes.string,
  disabled: PropTypes.bool,
  backgroundColor: PropTypes.string,
  children: PropTypes.element,
  color: PropTypes.string,
};

export default Button;
