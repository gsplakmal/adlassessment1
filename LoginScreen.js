import React from 'react';
import { Text, View, Platform, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import Main from './MainComponent';
import { authenticateUser, userLoggingIn } from './redux/actionCreators';
import { connect } from 'react-redux';
import { TextInput } from 'react-native-gesture-handler';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isInvalidEmail: false,
            isEmptyPassword: false,
            errorText: null,
            email: null,
            password: null
        }
        this.baseState = this.state;
    }

    static navigationOptions = {
        title: 'User Information App'
    };

    render() {
        return (
            <View style={styles.container}>
                <TextInput style={styles.input} placeholder='Enter Email' type='email' value={this.state.email} onChangeText={(text) => this.setEmailText(text)}></TextInput>
                <TextInput style={styles.input} placeholder='Enter Password' value={this.state.password} secureTextEntry onChangeText={(text) => this.setPasswordText(text)}></TextInput>
                {(this.state.isInvalidEmail || this.state.isEmptyPassword) ?
                    <Text style={styles.error}>{this.state.errorText}</Text> : null}
                {this.props.isLoggingIn ?
                    <ActivityIndicator size='large'></ActivityIndicator> : null}
                <TouchableOpacity style={styles.btn} onPress={() => this.validateLogin()}>
                    <Text>Login</Text>
                </TouchableOpacity>
            </View>
        )
    }

    componentDidUpdate(prevProps) {
        if (prevProps.isAuthenticated != this.props.isAuthenticated) {
            if (this.props.isAuthenticated) {
                const { navigate } = this.props.navigation;
                navigate('UserListNav');//Navigate if authenticated and store is updated after dispatch
                this.setState(this.baseState);
            }
        }
    }

    validateLogin() {
        if (!this.validateEmail(this.state.email)) {
            this.setState({
                errorText: 'Please enter a valid email address.',
                isInvalidEmail: true
            });
            return;
        }
        if (!this.validatePassword(this.state.password)) {
            this.setState({
                errorText: 'Password cannot be empty.',
                isEmptyPassword: true
            });
            return;
        }
        this.props.authenticateUser();//Dispatch authentication
    }

    validateEmail = (email) => {
        var expression = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        return expression.test(String(email).toLowerCase())
    }

    validatePassword = (password) => {
        return password == null ? false : true;
    }

    setEmailText = (text) => {
        this.setState({
            errorText: null,
            isInvalidEmail: false,
            email: text
        })
    }

    setPasswordText = (text) => {
        this.setState({
            errorText: null,
            isEmptyPassword: false,
            password: text
        })
    }
}

const styles = StyleSheet.create({
    btn: {
        width: 200,
        height: 50,
        backgroundColor: 'deepskyblue',
        textAlign: 'center',
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        marginTop: 50
    },
    input: {
        height: 40,
        width: '90%',
        borderRadius: 20,
        borderColor: 'black',
        borderWidth: 2,
        padding: 10,
        margin: 20
    },
    error: {
        color: 'red'
    }
})

const mapStateToProps = state => {
    return {
        isAuthenticated: state.login.isAuthenticated,
        isLoggingIn: state.login.isLoggingIn
    }
}

const mapDispatchToProps = dispatch => {
    return {
        authenticateUser: () => dispatch(userLoggingIn())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);