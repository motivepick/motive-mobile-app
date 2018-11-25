import React, { Component } from 'react'
import { ListView, View } from 'react-native'

import { List } from 'native-base'
import styles from './List.styles'

class ListComponent extends Component {

    constructor(props) {
        super(props)
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    }

    render() {
        const { data, renderRow, renderRightHiddenRow, onScroll } = this.props

        return (
            <View style={styles.container}>
                <List
                    showsVerticalScrollIndicator={false}
                    scrollEventThrottle={16}
                    onScroll={onScroll}
                    contentContainerStyle={styles.contentContainer}
                    rightOpenValue={-115}
                    disableRightSwipe={true}
                    closeOnRowBeginSwipe={true}
                    dataSource={this.ds.cloneWithRows(data)}
                    renderRow={renderRow}
                    renderRightHiddenRow={renderRightHiddenRow}
                />
            </View>
        )
    }
}

export default ListComponent
