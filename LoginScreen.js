import React, {Component} from 'react';
import {Image, StyleSheet, Text, View} from "react-native";
import {AccessToken, GraphRequest, GraphRequestManager, LoginButton} from "react-native-fbsdk";

class LoginScreen extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Image source={require('./logo.png')}/>
                <Text>Welcome to Motive!</Text>
                <Text>A minimalistic application which is going to</Text>
                <Text>defeat your laziness</Text>
                <LoginButton
                    readPermissions={["email"]}
                    onLoginFinished={
                        (error, result) => {
                            if (error) {
                                this.setState({error: error});
                                alert("Login failed with error: " + error.message);
                            } else if (result.isCancelled) {
                                alert("Login was cancelled");
                            } else {
                                AccessToken.getCurrentAccessToken().then(
                                    () => {
                                        const request = new GraphRequest('/me', {
                                            httpMethod: 'GET',
                                            version: 'v2.5'
                                        }, (err, response) => {
                                            const id = response.id;
                                            this.props.navigation.navigate('Home', {user: {id}})
                                        });
                                        new GraphRequestManager().addRequest(request).start();
                                    }
                                )
                            }
                        }
                    }
                    onLogoutFinished={() => alert("User logged out")}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default LoginScreen;