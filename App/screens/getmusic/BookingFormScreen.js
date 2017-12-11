import React from 'react';
import ScreenContainer from '../../components/ScreenContainer';
import {
    ActivityIndicator,
    KeyboardAvoidingView, ScrollView,
    StyleSheet, BackHandler
} from 'react-native';
import { Text, TouchableOpacity, TextInput, View,Image } from '@shoutem/ui';
import {connect} from "react-redux";
import BookingActions from "../../redux/BookingRedux";
import Styles from "../../constants/Styles/Styles";
import DatePicker from "react-native-datepicker";
import Modal from 'react-native-modal';
import Colors from "../../constants/Colors";

class BookingFormScreen extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            expert: null,
            expertPackage: null,
            date:'',
            time:'',
            location: '',
            additional_notes: '',
        };
    }

    componentWillMount() {
        const {state} = this.props.navigation;
        this.setState({
            expert: state.params.expert,
            expertPackage: state.params.expertPackage,
        });
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    }

    onBackPress = () => {
        const { navigation } = this.props;
        if (navigation.index === 0) {
            return false;
        }
        navigation.goBack();
        return true;
    };

    _bookSubmit = () => {
        const query = {
            package_id: this.state.expertPackage.id,
            event_at: this.state.date + ' ' + this.state.time,
            event_time: this.state.time,
            location: this.state.location,
            additional_notes: this.state.additional_notes,
        };
        this.props.attemptBooking(query);
    };

    submitButton = (editable) => {
        if(editable){
            return <TouchableOpacity activeOpacity={0.4} style={Styles.button} onPress={this._bookSubmit}>
                <Text style={Styles.buttonText}>Place Order</Text>
            </TouchableOpacity>;
        }
        else
        {
            return <ActivityIndicator animating={true}  style={{marginTop: 10}}/>;
        }
    };

    render()
    {
        const { expert, expertPackage } = this.state;
        const { loading } = this.props;
        const editable = !loading;
        const textInputStyle = editable ? StyleSheet.flatten([Styles.input]) : StyleSheet.flatten([Styles.input, Styles.inputReadonly]);
        const datePickerStyle = {
            dateInput: {
                backgroundColor: '#FFF',
                borderWidth: 0,
                alignItems: 'flex-start',
                padding: 10,
                paddingTop: 15,
                paddingBottom: 15,
                height: null,
            },
            dateTouchBody: {
                alignSelf: 'stretch',
                height: null,
                marginBottom: 5,
            },
            placeholderText: {
                color: '#999'
            },
            disabled: {
                backgroundColor: '#DDD'
            }
        };

        return (
            <ScreenContainer>
                <KeyboardAvoidingView behavior={'padding'}>
                    <ScrollView>
                        <View style={styles.container}>
                            <View>
                                <View style={{flexDirection: 'row', marginBottom: 10}}>
                                    <Image
                                        source={{uri: expert.avatar}}
                                        style={styles.profileImage}
                                    />
                                    <Text style={styles.username}>{expert.fullname}</Text>
                                </View>
                                <View style={styles.packageContainer}>
                                    <Text style={Styles.textBold}>{expertPackage.name}</Text>
                                    <Text style={StyleSheet.flatten([Styles.textBold, Styles.priceText])}>{expertPackage.formatted_price}</Text>
                                    <Text style={styles.descriptionText}>{expertPackage.description}</Text>
                                </View>
                            </View>
                            <View style={Styles.divider} />
                            <View style={{marginBottom:10}}>
                                <Text style={{color: '#333'}}>Please fill the form for your order</Text>
                            </View>
                            <View>
                                <DatePicker
                                    date={this.state.date}
                                    mode="date"
                                    placeholder="Select date"
                                    format="YYYY-MM-DD"
                                    minDate={new Date}
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    showIcon={false}
                                    customStyles={datePickerStyle}
                                    disabled={!editable}
                                    onDateChange={(date) => {this.setState({date: date})}}
                                />
                                <DatePicker
                                    date={this.state.time}
                                    mode="time"
                                    placeholder="Select time"
                                    format="HH:mm"
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    showIcon={false}
                                    customStyles={datePickerStyle}
                                    disabled={!editable}
                                    minuteInterval={5}
                                    onDateChange={(time) => {this.setState({time: time});}}
                                />
                                <TextInput
                                    ref='location'
                                    value={this.state.location}
                                    editable={editable}
                                    style={StyleSheet.flatten([textInputStyle, {height: 70, textAlignVertical:'top'}])}
                                    onChangeText={(text) => this.setState({location: text})}
                                    underlineColorAndroid={'transparent'}
                                    placeholder={'Location'}
                                    placeholderTextColor={'#999'}
                                    multiline={true}
                                />
                                <TextInput
                                    ref='detail'
                                    value={this.state.additional_notes}
                                    editable={editable}
                                    style={StyleSheet.flatten([textInputStyle, {height: 70, textAlignVertical:'top'}])}
                                    onChangeText={(text) => this.setState({additional_notes: text})}
                                    underlineColorAndroid={'transparent'}
                                    placeholder={'Additional notes'}
                                    placeholderTextColor={'#999'}
                                    multiline={true}
                                />
                                {this.submitButton(editable)}
                            </View>
                        </View>
                        <View style={{height: 80}}/>
                    </ScrollView>
                </KeyboardAvoidingView>
                <Modal
                    isVisible={this.props.isBookingComplete}
                    backdropColor={Colors.tintColor}
                >
                    <View style={styles.bookingCompleteContainer}>
                        <View style={styles.bookingCompleteModal}>
                            <Text style={StyleSheet.flatten([Styles.textCenter, Styles.textLight, {marginBottom: 10}])}>Thank You!</Text>
                            <Text style={StyleSheet.flatten([Styles.textCenter, Styles.textLight])}>Your order has been placed.</Text>
                            <Text style={StyleSheet.flatten([Styles.textCenter, Styles.textLight, {marginBottom: 15}])}>We will get back to you when
                                the expert confirm your order.</Text>
                            {/*<TouchableOpacity>
                                <View style={Styles.buttonLight}>
                                    <Text style={Styles.textCenter}>View My Orders</Text>
                                </View>
                            </TouchableOpacity>*/}
                            <TouchableOpacity onPress={() => this.props.bookingClose() }>
                                <View style={Styles.button}>
                                    <Text style={Styles.buttonText}>Back To Home</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </ScreenContainer>
        );
    }
}

const styles = {
    container: {
        margin: 20,
        marginTop: 10,
    },
    profileImage: {
        height: 30,
        width: 30,
        borderRadius: 15,
        marginRight: 10,
    },
    username: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        alignSelf: 'center',
    },
    packageContainer: {
        backgroundColor: '#FFF',
        padding: 10,
        elevation: 1,
    },
    descriptionText: {
        fontSize: 14,
        color: '#666',
    },
    bookingCompleteContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    bookingCompleteModal: {
        backgroundColor: '#222',
        borderRadius: 4,
        margin: 20,
        padding: 15,
    }
};

const mapStateToProps = (state) => {
    return {
        loading: state.booking.fetching,
        isBookingComplete: state.booking.isBookingComplete,
        booking: state.booking.booking,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        attemptBooking: (query) => dispatch(BookingActions.bookingRequest(query)),
        bookingInit: () => dispatch(BookingActions.bookingInit()),
        bookingClose: () => dispatch(BookingActions.bookingClose()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingFormScreen);
