import React, { Component } from 'react';
import { TouchableOpacity, View } from 'react-native';
import styles from './CheckBox.styles';

export class CheckBox extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { isCompleted, onAction } = this.props;

    return (
      <TouchableOpacity onPress={onAction}>
        <View
          style={[
            styles.circle,
            isCompleted ? styles.completeCircle : styles.incompleteCircle
          ]}
        />
      </TouchableOpacity>
    );
  }
}

export default CheckBox;
