import React from "react";
import {connect} from "react-redux";
import {
    BackHandler, ActivityIndicator, Linking, ScrollView,
    KeyboardAvoidingView, StyleSheet
} from "react-native";
import ScreenContainer from "../../components/ScreenContainer";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scrollview";
import logo from '../../assets/images/logo.png';
import Styles from "../../constants/Styles/Styles";
import LoginActions from "../../redux/LoginRedux";
import { NavigationActions } from "react-navigation";
import Layout from "../../constants/Layout";
import { View, Text, Caption, TextInput , TouchableOpacity, Image} from '@shoutem/ui';
import Colors from "../../constants/Colors";

class RegisterScreen extends React.Component
{
    constructor (props) {
        super(props);
        this.state = {
            phoneNumber: '',
            email: '',
            username: '',
        };
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
        this.props.back();
        return true;
    };

    submitButton = (editable) => {
        if(editable){
            return <TouchableOpacity activeOpacity={0.4} style={Styles.button} onPress={this.handlePressSubmit}>
                <Text style={Styles.buttonText}>REGISTER</Text>
            </TouchableOpacity>;
        }
        else
        {
            return <ActivityIndicator animating={true} style={{marginTop: 10}} />;
        }
    };

    handleChangeUsername = (text) => {
        this.setState({ username: text })
    };

    handleChangePhoneNumber = (text) => {
        this.setState({ phoneNumber: text })
    };

    handlePressSubmit = () => {
        const { username, phoneNumber } = this.state;
        this.props.attemptRegister(username, phoneNumber);
    };

    render() {
        const { username, phoneNumber } = this.state;
        const { loading } = this.props;
        const editable = !loading;
        const textInputStyle = editable ? Styles.input : StyleSheet.flatten([Styles.input, Styles.inputReadonly]);
        return (
          <ScreenContainer>
              <KeyboardAvoidingView behavior={'padding'} style={StyleSheet.flatten([Styles.container, {padding: 20}])}>
                  <ScrollView>
                      <Image
                          source={logo}
                          resizeMode={'contain'}
                          style={Styles.logoImage}
                          styleName = "small"
                        />
                      <View styleName="md-gutter-bottom">
                          <TextInput
                              ref='username'
                              value={username}
                              editable={editable}
                              styleName="sm-gutter-bottom"
                              style={textInputStyle}
                              onChangeText={this.handleChangeUsername}
                              underlineColorAndroid={'transparent'}
                              placeholder={'Username'}
                              placeholderTextColor={'#999'}
                              keyboardType={'default'}
                              returnKeyLabel={'REGISTER'}
                              clearButtonMode={'while-editing'}
                              onSubmitEditing={this.handlePressSubmit}
                          />

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
                              returnKeyLabel={'REGISTER'}
                              clearButtonMode={'while-editing'}
                              onSubmitEditing={this.handlePressSubmit}
                          />

                          {this.submitButton(editable)}
                      </View>
                      <Caption styleName="h-center">By registering, I agree to the</Caption>
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
                          <Caption>Already have an account? </Caption>
                          <Caption
                              style={{color: Colors.tintColor}}
                              onPress={() => this.props.back()}
                          >LOGIN</Caption>
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
        back: () => dispatch(NavigationActions.back()),
        attemptRegister: (username, phoneNumber) => dispatch(LoginActions.registerRequest(username, phoneNumber))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);
