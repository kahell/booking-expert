import React from 'react';
import {ActivityIndicator, StyleSheet, KeyboardAvoidingView, ScrollView} from "react-native";
import ScreenContainer from "../../components/ScreenContainer";
import Styles from "../../constants/Styles/Styles";
import logo from '../../assets/images/logo.png';
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scrollview";
import {connect} from "react-redux";
import LoginActions from "../../redux/LoginRedux";
import {MaterialIcons} from "@expo/vector-icons/index";
import Colors from "../../constants/Colors";
import Communications from "react-native-communications";
import AppConfig from "../../config/AppConfig";
import Layout from "../../constants/Layout";
import { View, Text, Caption, Icon, TextInput,Image, TouchableOpacity } from '@shoutem/ui';

class VerifySMSScreen extends React.Component {

    resendTimer;

    constructor (props) {
        super(props);
        this.state = {
            password: '',
            canResend: false,
            secondRemaining: 30,
            resendCount: 1,
            stopResend: false,
        };
    }

    componentWillMount()
    {
        this.resendTimer = setInterval(() => {this._tick()}, 1000);
    }

    componentWillUnmount()
    {
        clearInterval(this.resendTimer);
    }

    componentDidMount()
    {
        //this.refs.password.focus();
    }

    _tick = () =>
    {
        this.setState((state) =>
        {
            if(state.secondRemaining > 1)
            {
                return {secondRemaining: state.secondRemaining - 1}
            }
            else
            {
                if(this.state.resendCount <= 2)
                {
                    this.setState({secondRemaining: 0, canResend: true});
                }
                else
                {
                    this.setState({secondRemaining: 0, canResend: false, stopResend: true});
                }

            }
        });
    };

    submitButton = (loading) => {
        if(loading){
            return <ActivityIndicator animating={true} style={{marginTop: 10}} />;
        }
        else
        {
            if(this.state.password.length === 4)
            {
                return <TouchableOpacity activeOpacity={0.4} style={Styles.button} onPress={this.handlePressSubmit}>
                    <Text style={Styles.buttonText}>SUBMIT</Text>
                </TouchableOpacity>;
            }
            else
            {
                return <View style={Styles.buttonDisabled} onPress={this.handlePressSubmit}>
                    <Text style={Styles.buttonText}>SUBMIT</Text>
                </View>;
            }
        }
    };

    resendButton = (canResend, loading) =>
    {
        if(loading) return;

        if(!this.state.stopResend)
        {
            if(canResend)
            {
                return (
                  <Caption
                      styleName="h-center"
                      style={{color: Colors.tintColor}}
                      onPress={() => { this.handlePressResend() }}
                  >
                      RESEND
                  </Caption>
                );
            }
            else
            {
                const {secondRemaining, resendCount} = this.state;
                const sr = (secondRemaining < 10) ? ("0" + secondRemaining) : secondRemaining;

                return (
                  <Caption
                      styleName="h-center">
                          {(resendCount <= 2) ? 'Resend' : 'Call'} in 00:{sr}
                  </Caption>
                );
            }
        }
        else
        {
            return (
              <Caption
                  styleName="h-center"
                  style={{color: Colors.tintColor}}
                  onPress={() => Communications.phonecall(AppConfig.callPhoneNumber, true)}
              >
                  CALL
              </Caption>
            );
        }
    };

    handlePressResend = () =>
    {
        this.props.attemptResend(this.props.phoneNumber);

        this.setState({resendCount: this.state.resendCount + 1});

        if(this.state.resendCount <= 2)
        {
            this.setState({canResend: false, secondRemaining: 60});
        }
        else
        {
            this.setState({canResend: false, stopResend: true});
        }
    };

    handlePasswordInputChange = (text) =>
    {
        this.setState({password: text});
    };

    handlePressSubmit = () => {
        this.props.attemptVerify(this.props.phoneNumber, this.state.password);
    };

    render() {
        const { password, canResend } = this.state;
        const { phoneNumber, loading, navigation } = this.props;
        return (
            <ScreenContainer>
                <KeyboardAwareScrollView style={Styles.container,  {padding: 20}} scrollEnabled={false}>
                  <ScrollView>
                    <Image
                        source={logo}
                        resizeMode={'contain'}
                        //style={[Styles.logoImage, {height: 70, marginTop: Layout.statusBarMargin}]}
                        style={Styles.logoImage}
                        styleName = "small"
                      />
                    <Caption styleName="h-center md-gutter-bottom">
                        An SMS with verification code has been sent to your registered phone number
                    </Caption>
                    <View styleName="horizontal h-center lg-gutter-bottom">
                      <Text styleName="bold">{phoneNumber} </Text>
                      <Icon
                          name={'edit'}
                          style={{color: Colors.tintColor, fontSize: 18}}
                          onPress={() => { navigation.goBack() }}
                      />
                    </View>
                    <View styleName="md-gutter-bottom">
                        <TextInput
                            ref="password"
                            value={password}
                            onChangeText={this.handlePasswordInputChange}
                            style={StyleSheet.flatten([Styles.input, Styles.number, {textAlign: 'center'}])}
                            styleName="sm-gutter-bottom v-center"
                            placeholder={'Verify Number'}
                            placeholderTextColor={'#999'}
                            keyboardType={'numeric'}
                            maxLength={4}
                            onSubmitEditing={this.handlePressSubmit}
                        />
                        {this.submitButton(loading)}
                    </View>
                    {this.resendButton(canResend, loading)}
                  </ScrollView>
                </KeyboardAwareScrollView>
            </ScreenContainer>
        );
    }
}

const styles = {
    passInput: {
      backgroundColor: '#fff',
      fontSize: 32,
      padding: 10,
      marginBottom: 10,
      textAlign: 'center'
    }
};

const mapStateToProps = (state) => {
    return {
        phoneNumber: state.login.phoneNumber,
        loading: state.login.loading,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        attemptVerify: (phoneNumber, password) => dispatch(LoginActions.verificationRequest(phoneNumber, password)),
        attemptResend: (phoneNumber) => dispatch(LoginActions.loginRequest(phoneNumber))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifySMSScreen);
