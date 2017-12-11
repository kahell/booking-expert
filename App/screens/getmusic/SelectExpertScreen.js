import React from 'react';
import {connect} from "react-redux";
import ScreenContainer from "../../components/ScreenContainer";
import GutStatusBar from "../../components/GutStatusbar";
import {
    StyleSheet,  ScrollView, ActivityIndicator, BackHandler,
    FlatList, Dimensions
} from "react-native";
import Styles from "../../constants/Styles/Styles";
import Colors from "../../constants/Colors";
import StarRating from "react-native-star-rating/star-rating";
import {Column as Col, Row} from 'react-native-flexbox-grid';
import ExpertsActions from "../../redux/ExpertRedux";
import { Text, TouchableOpacity, View,Image} from '@shoutem/ui';

const { width } = Dimensions.get('window');
const equalWidth =  width / 3 - 5;

class SelectExpertScreen extends React.Component {

    static navigationOptions = (nav) => {
        return {
            title: nav.navigation.state.params.categoryLabel,
        };
    };

    constructor(props)
    {
        super(props);
        this.state = {
            query: {}
        };
    }

    componentWillMount() {
        const {section, type, category} = this.props.navigation.state.params;
        this.state.query = {section, type, category};
        this.props.getExperts(this.state.query);
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

    renderExperts = (experts) => {
        if(experts !== null && experts.length > 0)
        {
            return (

                <FlatList
                    data={experts}
                    numColumns={3}
                    renderItem={this.renderExpertItem}
                    keyExtractor={item => item.id}
                    refreshing={this.props.fetching}
                    onRefresh={this.handleRefresh}
                />
            );
        }
        else if(experts !== null && experts.length === 0)
        {
            return (
                <View style={Styles.noResult}>
                    <Text style={Styles.noResultText}>No available experts yet.</Text>
                </View>
            );
        }
    };

    renderExpertItem = ({item}) => {
        const {navigate} = this.props.navigation;
        return(
                <TouchableOpacity style={styles.cardContainer} onPress={() => navigate('ExpertProfile', {id: item.id, username: item.username})}>
                    <View style={styles.card}>
                        <Image
                            source={{ uri: item.avatar }}
                            style={styles.image}
                        />
                        <View style={Styles.inline}>
                            <StarRating
                                disabled={true}
                                maxStars={5}
                                rating={item.rating}
                                starSize={9}
                                starColor={'#2E9BD7'}
                                emptyStarColor={'#2E9BD7'}
                                starStyle={{padding:1}}
                            />
                            <Text style={StyleSheet.flatten([Styles.textCenter, styles.expertRatingText])}>({item.reviews_count})</Text>
                        </View>
                        <Text numberOfLines={1} style={StyleSheet.flatten([Styles.textCenter, styles.expertName])}>{item.fullname}</Text>
                    </View>
                </TouchableOpacity>
        );
    };

    handleRefresh = () => {
        this.props.getExperts(this.state.query);
    };

    render() {
        const experts = this.props.searchExperts;
        console.log(experts)
        return (
            <ScreenContainer>
                <View style={styles.container}>
                    {this.renderExperts(experts)}
                </View>
            </ScreenContainer>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        flexDirection: 'column',
        padding: 2,
    },
    cardContainer: {
        padding: 2,
    },
    card: {
        backgroundColor: '#FFF',
        padding: 5,
        width: equalWidth,
    },
    expertName: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#333',
    },
    expertRatingText: {
        color: '#333',
        fontSize: 10,
        marginLeft: 2,
    },
    image: {
        height: 72,
        width: 72,
        borderRadius: 36,
        alignSelf: 'center',
        margin: 5,
    },
};

const mapStateToProps = (state) => {
    return {
        searchExperts: state.expert.searchExperts,
        fetching: state.expert.fetching
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getExperts: (query) => dispatch(ExpertsActions.searchExpertsRequest(query)),
        back: () => dispatch({ type: 'Navigation/BACK' }),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectExpertScreen);
