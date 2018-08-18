import { StyleSheet, Platform, Dimensions } from 'react-native';

const window = Dimensions.get('window');

export const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    height: 80,
    flex: 1,
    marginTop: 7,
    marginBottom: 12,
    borderRadius: 4,

    ...Platform.select({
      ios: {
        width: window.width - 30 * 2,
        shadowColor: 'rgba(0,0,0,0.2)',
        shadowOpacity: 1,
        shadowOffset: { height: 2, width: 2 },
        shadowRadius: 2
      },

      android: {
        width: window.width - 30 * 2,
        elevation: 0,
        marginHorizontal: 30
      }
    })
  },
  text: {
    fontSize: 24,
    color: '#222222'
  },
  textMuted: {
    // color: '#778899',
    color: '#bbb',
    fontSize: 12
  },
  strikeText: {
    color: '#bbb',
    textDecorationLine: 'line-through'
  },
  unstrikeText: {
    color: '#29323c'
  },
  task: {
    flex: 1,
    flexDirection: 'column',
    alignSelf: 'center'
  }
});

export default styles;
