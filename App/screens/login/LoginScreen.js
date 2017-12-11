import React from 'react';
import {
    Keyboard, Animated,
    Linking, ActivityIndicator,KeyboardAvoidingView,ScrollView, StyleSheet
} from 'react-native';
import logo from '../../assets/images/logo.png';
import Styles from "../../constants/Styles/Styles";
import ScreenContainer from "../../components/ScreenContainer";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scrollview";
import {connect} from "react-redux";
import LoginActions from "../../redux/LoginRedux";
import Layout from "../../constants/Layout";
import { View, Text, Caption, TextInput,TouchableOpacity } from '@shoutem/ui';
import Colors from "../../constants/Colors";

class LoginScreen extends React.Component {

    constructor (props) {
        super(props);
        this.imageHeight = new Animated.Value(170);
        this.animMargin = new Animated.Value(30);
        this.state = {
            phoneNumber: '',
        };
    }

    componentWillMount () {
        this.keyboardWillShowSub = Keyboard.addListener('keyboardDidShow', this.keyboardWillShow);
        this.keyboardWillHideSub = Keyboard.addListener('keyboardDidHide', this.keyboardWillHide);
    }

    componentWillUnmount() {
        this.keyboardWillShowSub.remove();
        this.keyboardWillHideSub.remove();
    }

    keyboardWillShow = () => {
        Animated.timing(this.imageHeight, {
            duration: 250,
            toValue: 80,
        }).start();
        Animated.timing(this.animMargin, {
            duration: 250,
            toValue: 10,
        }).start();
    };

    keyboardWillHide = () => {
        Animated.timing(this.imageHeight, {
            duration: 250,
            toValue: 170,
        }).start();
        Animated.timing(this.animMargin, {
            duration: 250,
            toValue: 30,
        }).start();
    };

    handlePressLogin = () => {
        const { phoneNumber } = this.state;
        if(phoneNumber !== '')
        {
            this.props.attemptLogin(phoneNumber);
        }
    };

    handleChangePhoneNumber = (text) => {
        this.setState({ phoneNumber: text });
    };

    loginButton = (editable) => {
        if(editable){
            return <TouchableOpacity activeOpacity={0.4} style={Styles.button} onPress={this.handlePressLogin}>
                <Text style={Styles.buttonText}>LOGIN</Text>
            </TouchableOpacity>;
        }
        else
        {
            return <ActivityIndicator animating={true}  style={{marginTop: 10}}/>;
        }
    };

    render() {
        const { phoneNumber } = this.state;
        const { loading } = this.props;
        const editable = !loading;
        const textInputStyle = editable ? StyleSheet.flatten([Styles.input, Styles.number, {textAlign: 'center'}]) : StyleSheet.flatten([Styles.input, Styles.number, Styles.inputReadonly, {textAlign: 'center'}]);

        return (
          <ScreenContainer>
            <KeyboardAvoidingView behavior={'padding'} style={[Styles.container, {padding: 20}]}>
              <ScrollView>
                  <Animated.Image
                      source={logo}
                      resizeMode={'contain'}
                      style={[Styles.logoImage, {height: this.imageHeight, marginTop: Layout.statusBarMargin, marginBottom: this.animMargin}]} />
                  <Caption styleName="h-center md-gutter-bottom">Enter your registered phone number to login</Caption>
                  <View styleName="md-gutter-bottom">
                      <TextInput
                          ref='phoneNumber'
                          value={phoneNumber}
                          editable={editable}
                          styleName="sm-gutter-bottom"
                          style={textInputStyle}
                          onChangeText={this.handleChangePhoneNumber}
                          underlineColorAndroid={'transparent'}
                          placeholder={'Phone number'}
                          placeholderTextColor={'#999'}
                          keyboardType={'phone-pad'}
                          returnKeyLabel={'LOGIN'}
                          clearButtonMode={'while-editing'}
                          onSubmitEditing={this.handlePressLogin}
                      />
                  {this.loginButton(editable)}
                  </View>
                  <Caption styleName="h-center">By login, I agree to the</Caption>
                  <View styleName="horizontal h-center">
                      <Caption
                          style={{color: Colors.tintColor}}
                          onPress={() => {Linking.openURL('https://getgut.com/terms/')}}
                      >
                          TERM OF SERVICE
                      </Caption>
                      <Caption> and </Caption>
                      <Caption
                          style={{color: Colors.tintColor}}
                          onPress={() => {Linking.openURL('https://getgut.com/privacy-policy/')}}
                      >
                          PRIVACY POLICY
                      </Caption>
                  </View>
              </ScrollView>
            </KeyboardAvoidingView>
            <View style={Styles.footerContainer}>
                <View style={Styles.footer}>
                    <View styleName="horizontal h-center">
                        <Caption>Don't have an account? </Caption>
                        <Caption
                            style={{color: Colors.tintColor}}
                            onPress={() => this.props.navigation.navigate('Register')}
                        >REGISTER</Caption>
                    </View>
                </View>
            </View>
          </ScreenContainer>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.login.loading
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        attemptLogin: (phoneNumber) => dispatch(LoginActions.loginRequest(phoneNumber))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
