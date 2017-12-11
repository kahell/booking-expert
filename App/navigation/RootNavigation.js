import React from 'react';
import {addNavigationHelpers, StackNavigator} from 'react-navigation';
import TabNavigator from './TabNavigator';
import Color from "../constants/Colors";
import LoginNavigator from "./LoginNavigator";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import LoadingScreen from "../screens/LoadingScreen";

export const PrimaryNav =  StackNavigator(
  {
      LoadingScreen: {
          screen: LoadingScreen,
          navigationOptions: {
              header: null,
              gesturesEnabled: false,
          }
      },
      LoginStack: {
        screen: LoginNavigator,
        navigationOptions: {
          gesturesEnabled: false
        }
      },
      MainStack: {
        screen: TabNavigator,
        navigationOptions: {
            gesturesEnabled: false,
        }
      },
  },
  {
      navigationOptions: () => ({
          headerTitleStyle: {
              fontWeight: 'normal',
              color: '#FFF',
              alignSelf: 'center',
          },
          headerStyle: {
              backgroundColor: Color.tintColor,
              elevation: 0,
              borderBottomWidth: 0,
          },
      }),
  }
);

const RootNavigator = ({ dispatch, navigation }) => {
    return (
        <PrimaryNav
            navigation={addNavigationHelpers({ dispatch, state: navigation })}
        />
    )
};

RootNavigator.propTypes = {
    dispatch: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired
};

function mapStateToProps (state) {
    return {
        navigation: state.navigation
    }
}

// export default PrimaryNav
export default connect(mapStateToProps)(RootNavigator)
