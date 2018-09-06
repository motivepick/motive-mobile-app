import React, { Component } from 'react'
import { ListView, View } from 'react-native'

import { List } from 'native-base'
import styles from './List.styles'

export class ListComponent extends Component {
    constructor(props) {
        super(props)
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    }

    render() {
        const { data, renderRow, renderRightHiddenRow } = this.props

        return (
            <View style={styles.container}>
                <List
                    style={styles.list}
                    contentContainerStyle={styles.contentContainer}
                    rightOpenValue={-140}
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