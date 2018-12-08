import React, { PureComponent } from 'react'
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native'
import { Container, Content, Form, Item, StyleProvider } from 'native-base'
import Header from '../../components/common/Header/Header'
import Description from '../../components/common/Description/Description'
import getTheme from '../../../native-base-theme/components/index'
import baseTheme from '../../../native-base-theme/variables/platform'
import type { EditableEntity, Navigation, T } from '../../types/Types'

type DescriptionEditViewProps = {|
    editableEntity: EditableEntity,
    setDescription: string => void,
    navigation: Navigation,
    setEditableEntity: Navigation => void,
    saveEditableEntity: EditableEntity => void,
    t: T
|}

export class DescriptionEditView extends PureComponent<DescriptionEditViewProps> {

    componentDidMount() {
        const { navigation, setEditableEntity } = this.props
        setEditableEntity(navigation)
    }

    render() {
        const { editableEntity, setDescription, t } = this.props
        const { description } = editableEntity
        return (
            <StyleProvider style={getTheme(baseTheme)}>
                <Container style={{ backgroundColor: '#f3ece6' }}>
                    <Header title={t('headings.editNotes')} leftButtonLabel={t('labels.back')} onLeftButtonPress={this.handleLeftButtonPress}/>
                    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled={Platform.OS === 'ios'}>
                        <Content contentContainerStyle={{ flex: 1 }}>
                            <Form style={styles.form}>
                                <Item stackedLabel style={styles.formItem}>
                                    <Description autoFocus={false} scrollEnabled={false} value={description} editable onChangeText={setDescription}/>
                                </Item>
                            </Form>
                        </Content>
                    </KeyboardAvoidingView>
                </Container>
            </StyleProvider>
        )
    }

    handleLeftButtonPress = () => {
        const { editableEntity, navigation, saveEditableEntity } = this.props
        const { id, description } = editableEntity
        saveEditableEntity({ id, description })
        navigation.goBack()
    }
}

const styles = StyleSheet.create({
    form: {
        marginRight: 10
    },
    formItem: {
        borderBottomWidth: 0,
        paddingTop: 9,
        paddingBottom: 16,
        height: '100%'
    }
})
