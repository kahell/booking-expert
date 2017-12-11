import {StackNavigator} from "react-navigation";
import LoginScreen from "../screens/login/LoginScreen";
import VerifySMSScreen from "../screens/login/VerifySMSScreen";
import RegisterScreen from "../screens/login/RegisterScreen";

export default StackNavigator({
    Login: {
        screen: LoginScreen,
        navigationOptions: {
            header: null,
            gesturesEnabled: false,
        }
    },
    VerifySMS: {
        screen: VerifySMSScreen,
        navigationOptions: {
            header: null,
            gesturesEnabled: false,
        }
    },
    Register: {
        screen: RegisterScreen,
        navigationOptions: {
            header: null,
        }
    }
});