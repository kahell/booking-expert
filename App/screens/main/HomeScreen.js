import React from 'react';

import { Platform, StyleSheet, TouchableOpacity, Dimensions,ScrollView,FlatList,Image} from 'react-native';

import ScreenContainer from "../../components/ScreenContainer";
import {Col, Grid, Row} from "../../components/Grid";
import Colors from "../../constants/Colors";
import {connect} from "react-redux";
import GutStatusBar from "../../components/GutStatusbar";
import ExpertsActions from "../../redux/ExpertRedux";
import StarRating from "react-native-star-rating/star-rating";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import BookingActions from "../../redux/BookingRedux";

import {Caption, GridRow, Card, View, Title, Subtitle, Heading, Text } from '@shoutem/ui';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

const topExpertsWidth = viewportWidth;
const topExpertsItemWidth = topExpertsWidth * 0.28;
const topExpertImageSize = topExpertsItemWidth - 15;

class HomeScreen extends React.Component {

    static navigationOptions = {
        headerTitleStyle: {
            fontWeight: 'normal',
            color: '#FFF',
            alignSelf: 'center',
            fontFamily: 'Couture',
            fontSize: 26,
            paddingTop: 5,
        }
    };

    constructor (props) {
        super(props);
        this.state = {
            slider1Ref: null,
            slider1ActiveSlide: 0,
        };
    }

    componentDidMount() {
        this.props.getTopExperts();
    }

    _renderItem = ({item}) => {
        const {navigate} = this.props.navigation;
        return (
            <TouchableOpacity
                style={styles.sliderItem}
                onPress={() => navigate('ExpertProfile', {id: item.id, username: item.username})}>
                <View style={styles.profileImageContainer}>
                    <Image
                        style={styles.profileImage}
                        source={{ uri: item.avatar }} />
                </View>
                <View style={{height: 9, backgroundColor: 'transparent'}}>
                    <StarRating
                        disabled={true}
                        maxStars={5}
                        rating={item.rating}
                        starSize={8}
                        starColor={'#2E9BD7'}
                        emptyStarColor={'#2E9BD7'}
                        starStyle={{paddingRight:1}}
                    />
                </View>
                <Text
                    numberOfLines={2}
                    style={styles.expertName}>{item.fullname}</Text>
            </TouchableOpacity>
        );
    };

    render() {
        const { topExperts } = this.props;
        const { navigate } = this.props.navigation;
        const iconSize = 28;
        return (
            <ScreenContainer>
                <GutStatusBar />
                <ScrollView contentContainerStyle={styles.scrollviewContentContainer} decelerationRate={'fast'}>
                  <Grid>
                    <Row>
                      <Col style={styles.categoryCol}>
                        <TouchableOpacity style={styles.categoryItem} onPress={() => { navigate('TypeScreen') }}>
                            <EvilIcons name={'play'} size={iconSize} style={styles.categoryIcon} />
                            <Text style={styles.categoryLabel}>GET MUSIC</Text>
                        </TouchableOpacity>
                      </Col>
                      <Col style={styles.categoryCol}>
                          <View style={StyleSheet.flatten([styles.categoryItem, {backgroundColor: '#DDD'}])}>
                              <EvilIcons name={'camera'} size={iconSize} style={styles.categoryIcon} />
                              <Text style={styles.categoryLabel}>GET SHOT</Text>
                          </View>
                      </Col>
                      <Col style={styles.categoryCol}>
                          <View style={StyleSheet.flatten([styles.categoryItem, {backgroundColor: '#DDD'}])}>
                              <SimpleLineIcons name={'magic-wand'} size={22} style={styles.categoryIcon} />
                              <Text style={styles.categoryLabel}>GET BEAUTY</Text>
                          </View>
                      </Col>
                    </Row>
                  </Grid>
                  <View style={styles.expertSlider}>
                      <Text style={styles.topExpertHeader}>Top Experts</Text>
                      <Text style={styles.topExpertSubtitle}>Popular experts this week</Text>
                      <FlatList
                          contentContainerStyle={styles.slider}
                          data={topExperts}
                          horizontal={true}
                          renderItem={this._renderItem}
                          keyExtractor={item => item.id}
                          refreshing={this.props.fetching}
                          showsHorizontalScrollIndicator={false}
                      />
                  </View>
                </ScrollView>
            </ScreenContainer>
        );
    }
}

const styles = {
    title: {
        color: Colors.tintColor,
        fontSize: 38,
        fontFamily: 'Couture',
        textAlign: 'center',
        marginTop: (Platform.OS === 'ios' ? 30 : 20),
        backgroundColor: 'transparent',
    },
    subtitle: {
        color: '#333',
        marginTop: (Platform.OS === 'ios' ? -15 : 0),
        fontSize: 14,
    },
    categoryGrid: {
        margin: 15,
        marginTop: 20,
        marginBottom: 5,
    },
    categoryCol: {
        marginLeft: 5,
        marginRight: 5,
    },
    categoryItem: {
        backgroundColor: '#fff',
        alignItems: 'center',
        marginBottom: 10,
        height: (viewportWidth / 3) - 20,
        justifyContent: 'center',
        elevation: 2,
        shadowColor: '#999',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
    },
    categoryIcon: {
        color: '#333',
    },
    categoryLabel: {
        fontSize: 10,
        color: '#333',
        fontWeight: 'bold',
    },
    expertSlider: {
        marginTop: 10,
        marginBottom: 30,
    },
    topExpertHeader: {
        fontSize: 18,
        backgroundColor: 'transparent',
        marginLeft: 20,
        fontWeight: 'bold',
        color: '#444',
    },
    topExpertSubtitle: {
        fontSize: 14,
        backgroundColor: 'transparent',
        marginLeft: 20,
        color: '#777',
    },
    slider: {
        marginTop: 10,
        paddingLeft: 15,
    },
    sliderItem: {
        width: topExpertsItemWidth,
        alignItems: 'center',
        marginRight: 5,
    },
    scrollviewContentContainer: {
        paddingBottom: 20
    },
    profileImageContainer: {
        height: topExpertImageSize,
        width: topExpertImageSize,
        borderRadius: topExpertImageSize / 2,
        backgroundColor: '#CCC',
        alignSelf: 'center',
        elevation: 2,
        marginBottom: 5,
        shadowColor: '#999',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    profileImage: {
        height: topExpertImageSize,
        width: topExpertImageSize,
        borderRadius: topExpertImageSize / 2,
        alignSelf: 'center',
    },
    expertName: {
        fontSize: 12,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#333',
        backgroundColor: 'transparent',
    }
};

const mapStateToProps = (state) => {
    return {
        topExperts: state.expert.topExperts,
        fetching: state.expert.fetching
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getTopExperts: () => dispatch(ExpertsActions.topExpertsRequest()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
