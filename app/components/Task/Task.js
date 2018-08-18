import React, { Component } from 'react';
import {
  Animated,
  Easing,
  Platform,
  TouchableOpacity,
  Text
} from 'react-native';
import moment from 'moment';
import { handleDueDateOf } from '../../utils/parser';
import Config from 'react-native-config';

import CheckBox from '../CheckBox/CheckBox';
import ColorIndicator from '../ColorIndicator/ColorIndicator';

import styles from './Task.styles';

class Task extends Component {
  state = {
    name: this.props.data.name,
    description: this.props.data.description || '',
    dueDate: this.props.data.dueDate ? moment(this.props.data.dueDate, moment.ISO_8601) : null,
    opened: false
  };

  constructor(props) {
    super(props);

    this._active = new Animated.Value(0);

    this._style = {
      ...Platform.select({
        ios: {
          transform: [
            {
              scale: this._active.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 1.1]
              })
            }
          ],
          shadowRadius: this._active.interpolate({
            inputRange: [0, 1],
            outputRange: [2, 10]
          })
        },

        android: {
          transform: [
            {
              scale: this._active.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 1.07]
              })
            }
          ],
          elevation: this._active.interpolate({
            inputRange: [0, 1],
            outputRange: [2, 6]
          })
        }
      })
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.active !== nextProps.active) {
      Animated.timing(this._active, {
        duration: 300,
        easing: Easing.bounce,
        toValue: Number(nextProps.active)
      }).start();
    }
  }

  render() {
    const {
      data: { closed, dueDate, name, goal, id },
      onClose
    } = this.props;

    return (
      <Animated.View style={[styles.row, this._style]}>
        <CheckBox isCompleted={closed} onAction={() => onClose(id)} />
        <TouchableOpacity style={styles.task} onPress={this.handleTaskClick}>
          <Text
            ellipsizeMode='tail'
            numberOfLines={1}
            style={[
              styles.text,
              closed ? styles.strikeText : styles.unstrikeText
            ]}
          >
            {name}
          </Text>
          {dueDate && <Text style={[styles.textMuted]}>{dueDate}</Text>}
        </TouchableOpacity>
        <ColorIndicator color={goal ? 'blue' : null} />
      </Animated.View>
    );
  }

  handleTaskClick = () => {
    const { opened } = this.state;
    this.setState({ opened: !opened });
  };

  handleNameChange = ({ target }) => {
    this.setState({ name: target.value });
  };

  handleDescriptionChange = ({ target }) => {
    this.setState({ description: target.value });
  };

  saveName = () => {
    const { value } = this.props;
    const task = handleDueDateOf({ name: this.state.name.trim() });
    this.setState({
      name: task.name,
      dueDate: task.dueDate || this.state.dueDate
    });
    Task.updateTask(value.id, { ...task });
  };

  saveDescription = () => {
    const { value } = this.props;
    this.setState({ description: this.state.description.trim() });
    Task.updateTask(value.id, { description: this.state.description });
  };

  static updateTask(id, newTask) {
    fetch(`${Config.API_URL}/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(newTask)
    });
  }

  static classOf(dueDate) {
    if (dueDate) {
      const now = new Date();
      if (dueDate.isBefore(now, 'day')) {
        return 'text-danger';
      } else if (dueDate.isSame(now, 'day')) {
        return 'text-primary';
      } else {
        return '';
      }
    } else {
      return '';
    }
  }

  static format(dueDate) {
    return dueDate.local().calendar();
  }
}

export default Task;
