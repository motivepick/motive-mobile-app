import { StyleSheet, Platform, Dimensions } from 'react-native';

const window = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',

    ...Platform.select({
      ios: {
        paddingTop: 20
      }
    })
  },
  title: {
    fontSize: 20,
    paddingVertical: 20,
    color: '#999999'
  },
  list: {
    flex: 1
  },
  contentContainer: {
    width: window.width,

    ...Platform.select({
      ios: {
        paddingHorizontal: 30
      },

      android: {
        paddingHorizontal: 0
      }
    })
  }
});

export default styles;
