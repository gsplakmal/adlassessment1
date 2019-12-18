import React from 'react';
import { Text, View, Platform, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import constants from 'expo-constants';
import { fetchUsers, userLoading } from './redux/actionCreators';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            modalData: null
        }
    }

    static navigationOptions = {
        title: 'Home'
    };

    setModalVisible(visible, data) {
        this.setState({
            modalVisible: visible,
            modalData: data
        });
    }
    componentDidMount() {
        this.props.fetchUsers();//Dispatch fetching users from mock service
    }

    FlatListItemSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "100%",
                    backgroundColor: "#000",
                }}
            />
        );
    }

    render() {
        const renderUser = (item) => {
            return (
                <View>
                    <TouchableOpacity onPress={() => {
                        this.setModalVisible(true, item.item);
                    }}>
                        {RenderText('Name', item.item.name)}
                        {RenderText('Email', item.item.email)}
                        {RenderText('Web', item.item.website)}
                        {RenderText('City', item.item.address.city)}
                    </TouchableOpacity>
                </View>
            )
        }
        return (
            <View>
                {!this.props.isLoading ?
                    <FlatList
                        data={this.props.users}
                        renderItem={renderUser}
                        keyExtractor={item => item.id.toString()}
                        ItemSeparatorComponent={this.FlatListItemSeparator}
                    >
                    </FlatList> : <ActivityIndicator size='large'></ActivityIndicator>}
                <Modal
                    isVisible={this.state.modalVisible}
                    backdropOpacity={0.94}
                    backdropColor='white'
                >
                    <View style={{ marginTop: 22 }}>
                        {this.state.modalData ?
                            <View>
                                {RenderText('Name', this.state.modalData.name)}
                                {RenderText('Email', this.state.modalData.email)}
                                {RenderText('Web', this.state.modalData.website)}
                                {RenderText('City', this.state.modalData.address.city)}
                                {RenderText('Phone', this.state.modalData.phone)}
                                {RenderText('Company', this.state.modalData.company.name)}
                                <View style={styles.container}>
                                    <TouchableOpacity style={styles.btn}
                                        onPress={() => {
                                            this.setModalVisible(!this.state.modalVisible);
                                        }}>
                                        <Text>OK</Text>
                                    </TouchableOpacity>
                                </View>
                            </View> : null
                        }
                    </View>
                </Modal>
            </View>
        )
    }
}

export const RenderText = (label, text) => {
    return (
        <Text style={styles.textInput}>{label}: {text}</Text>
    )
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
        alignItems: 'center',
        marginTop: 15
    },
    textInput: {
        borderColor: '#CCCCCC',
        borderTopWidth: 1,
        height: 30,
        fontSize: 15,
        paddingLeft: 10,
        paddingRight: 20
    }
})

const mapStateToProps = state => {
    return {
        users: state.user.users,
        isLoading: state.user.isLoading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchUsers: () => dispatch(userLoading())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);