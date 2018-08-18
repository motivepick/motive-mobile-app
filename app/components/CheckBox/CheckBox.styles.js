import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,

    borderWidth: 3,
    marginRight: 20
  },
  completeCircle: {
    borderColor: '#bbb'
  },
  incompleteCircle: {
    borderColor: '#DA4453'
  }
});

export default styles;
