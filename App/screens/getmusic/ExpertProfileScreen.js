import React from 'react';
import {connect} from "react-redux";
import {
    StyleSheet, Dimensions, ScrollView, BackHandler,
    ActivityIndicator
} from "react-native";
import { Text, TouchableOpacity, View,Image } from '@shoutem/ui';
import ExpertsActions from "../../redux/ExpertRedux";
import ScreenContainer from "../../components/ScreenContainer";
import Styles from "../../constants/Styles/Styles";
import StarRating from "react-native-star-rating/star-rating";
import Colors from "../../constants/Colors";
import Carousel from "react-native-snap-carousel/src/carousel/Carousel";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
import BookingActions from "../../redux/BookingRedux";
import Modal from 'react-native-modal';
import Ionicons from "@expo/vector-icons/Ionicons";

const packageWidth = viewportWidth;
const packageItemWidth = viewportWidth / 2.2;
const packageHeight = viewportHeight * 0.24;
const packageDetailsImageHeight = viewportHeight * 0.22;

class ExpertProfileScreen extends React.Component {

    static navigationOptions = (nav) => {
        return {
            title: nav.navigation.state.params.username,
        };
    };

    constructor (props) {
        super(props);
        this.state = {
            sliderSkillSelectedIndex: 0,
            sliderSkillActiveSlide: 0,
            selectedSkill: null,
            showDetail: false,
            selectedDetails: null,
        };
    }

    componentWillMount() {
        const { state } = this.props.navigation;
        this.props.getExpert(state.params.id);
        this.props.bookingInit();
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

    _renderPackages = (packages) => {

        if(typeof packages !== 'undefined')
        {
            return (
                <Carousel
                    data={packages}
                    renderItem={this._renderPackage}
                    sliderWidth={packageWidth}
                    itemWidth={packageItemWidth}
                    inactiveSlideScale={1}
                    inactiveSlideOpacity={1}
                    enableMomentum={false}
                    containerCustomStyle={styles.packageSlide}
                    slideStyle={styles.packageItemContainer}
                    activeSlideAlignment={'start'}
                />
            );
        }
    };

    openDetailsModal = (item) => {
        this.setState({showDetail: true, selectedDetails: item});
    };

    _renderPackage = ({item}) => {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.packageItem}>
                <Image source={{ uri: item.image }}
                       height={packageHeight}
                       style={{ flex: 1, justifyContent: 'flex-end', borderTopLeftRadius: 4, borderTopRightRadius: 4}}
                />
                <View style={styles.packageTextContainer}>
                    <Text style={styles.packageName} numberOfLines={1}>{item.name}</Text>
                    <Text style={styles.packagePrice} numberOfLines={1}>{item.formatted_price}</Text>
                </View>
                <View style={styles.packageButtonContainer}>
                    <TouchableOpacity
                        style={StyleSheet.flatten([styles.packageButton, styles.packageButtonFirst])}
                        onPress={() => this.openDetailsModal(item)}
                    >
                        <Text style={styles.packageButtonText}>Details</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.packageButton} onPress={() => { navigate('BookingForm', { expertPackage: item, expert: this.props.expert }) }}>
                        <Text style={StyleSheet.flatten([styles.packageButtonText, styles.packageOrderButtonText])}>Book</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    renderExpert = (expert) => {
        if(expert)
        {
            return (
                <View>
                    <View style={styles.container}>
                        <View style={styles.profileImageContainer}>
                            <Image
                                source={{ uri: expert.avatar }}
                                style={styles.profileImage}
                            />
                        </View>
                        <Text style={styles.expertFullname}>{expert.fullname}</Text>
                        <View style={StyleSheet.flatten([Styles.inline, {alignItems: 'center'}])}>
                            <StarRating
                                disabled={true}
                                maxStars={5}
                                rating={expert.rating}
                                starSize={10}
                                starColor={'#666'}
                                emptyStarColor={'#666'}
                                starStyle={{paddingRight:1, paddingTop: 2}}
                            />
                            {/*<Text style={styles.profileMetaText}>  -  {expert.reviews_count} reviews</Text>*/}
                        </View>
                        <Text style={StyleSheet.flatten([styles.expertDescription])}>{expert.bio}</Text>
                       {/* <TouchableOpacity style={[Styles.inline, styles.centerButton]}>
                            <Text style={styles.centerButtonText}>CHAT WITH ME  </Text>
                            <MaterialIcons name={'chat-bubble-outline'} size={14} style={styles.chatIcon} />
                        </TouchableOpacity>*/}
                    </View>
                    <View>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionHeaderText}>SERVICES & PRICING</Text>
                        </View>
                        {this._renderPackages(expert.packages)}
                        {/*<View style={styles.sectionHeader}>
                            <Text style={styles.sectionHeaderText}>VIDEOS PORTFOLIO</Text>
                        </View>*/}
                    </View>
                </View>
            );
        }
        else
        {
            return <ActivityIndicator animating={true}  style={{marginTop: 10}}/>;
        }
    };

    renderDetailsModal = (item) => {
        const {navigate} = this.props.navigation;
        if(item)
        {
            return (
                <View>
                    <Image
                        source={{uri: item.image}}
                        style={{ flex: 1, height: packageDetailsImageHeight, borderTopLeftRadius: 4, borderTopRightRadius: 4}}
                    />
                    <TouchableOpacity style={styles.packageDetailsCloseIcon} onPress={() => this.setState({showDetail: false})}>
                        <Ionicons name="md-close" size={26} color={'white'} />
                    </TouchableOpacity>
                    <View style={{padding: 15}}>
                        <Text style={styles.detailsSection}>{item.section}</Text>
                        <Text style={styles.detailsTitle}>{item.name}</Text>
                        <Text style={styles.detailsPrice}>{item.formatted_price}</Text>
                        <View style={Styles.divider}/>
                        <View style={styles.twoCols}>
                            <View style={styles.flex}>
                                <Text style={styles.detailsMetaText}>Expert / Teacher</Text>
                                <Text>{item.type}</Text>
                            </View>
                            <View style={styles.flex}>
                                <Text style={styles.detailsMetaText}>Duration</Text>
                                <Text>{item.duration}</Text>
                            </View>
                        </View>
                        <View style={styles.twoCols}>
                            <View style={styles.flex}>
                                <Text style={styles.detailsMetaText}>Category</Text>
                                <Text>{item.category}</Text>
                            </View>
                            {(item.subcategory) ? (
                                <View style={styles.flex}>
                                    <Text style={styles.detailsMetaText}>Sub Category</Text>
                                    <Text>{item.subcategory}</Text>
                                </View>
                            ) : null}
                        </View>

                        <Text>{item.description}</Text>
                        <TouchableOpacity
                            style={StyleSheet.flatten([styles.centerButton, {marginTop: 30}])}
                            onPress={() => { navigate('BookingForm', { expertPackage: item, expert: this.props.expert }); this.setState({showDetail: false}) }}
                        >
                            <Text style={Styles.buttonText}>Book</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }
    };

    render() {
        const {expert} = this.props;
        const {selectedDetails} = this.state;
        return (
            <ScreenContainer>
                <ScrollView>
                    {this.renderExpert(expert)}
                </ScrollView>
                <Modal
                    isVisible={this.state.showDetail}
                    onBackButtonPress={() => this.setState({showDetail:false})}
                >
                    <View style={styles.detailsContainer}>
                        <ScrollView>
                            {this.renderDetailsModal(selectedDetails)}
                        </ScrollView>
                    </View>
                </Modal>
            </ScreenContainer>
        );
    }

}

const styles = {
    flex: {
        flex: 1,
    },
    container: {
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20,
        alignItems: 'center',
    },
    profileImageContainer: {
        height: 72,
        width: 72,
        borderRadius: 36,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 3,
        elevation: 2,
        marginBottom: 5,
    },
    profileImage: {
        height: 72,
        width: 72,
        borderRadius: 36,
    },
    profileMetaText: {
        fontSize: 12,
        color: '#666'
    },
    profileMetaSubText: {
        textAlign: 'center',
        color: '#666',
        fontSize: 12,
    },
    centerButton: {
        marginTop: 10,
        backgroundColor: Colors.tintColor,
        alignSelf: 'center',
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
        elevation: 2,
        borderRadius: 4,
        alignItems: 'center'
    },
    centerButtonText: {
        color: 'white',
        fontSize: 10,
    },
    chatIcon: {
        color: 'white',
    },
    expertFullname: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
    },
    expertUsername: {
        fontSize: 12,
        color: '#333',
    },
    expertDescription: {
        fontSize: 12,
        marginTop: 5,
        color: '#333',
        textAlign: 'center'
    },
    packageSlide: {
        paddingLeft: 20,
        paddingTop: 5,
    },
    packageItemContainer: {
        width: packageItemWidth,
        height: packageHeight,
        paddingRight: 10,
    },
    packageItem: {
        flex:1,
        borderRadius: 4,
        backgroundColor: 'white',
    },
    packageTextContainer: {
        padding: 5,
    },
    packageName: {
        fontFamily: Styles.Raleway,
        color: '#333',
        fontWeight: 'bold',
        fontSize: 12,
        backgroundColor: 'transparent'
    },
    packagePrice: {
        fontFamily: Styles.Roboto,
        color: '#666',
        fontSize: 12,
        backgroundColor: 'transparent'
    },
    packageButtonContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        borderTopWidth: 1,
        borderTopColor: '#DDD',
    },
    twoCols: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginBottom: 10,
    },
    packageButton: {
        flex: 1,
        padding: 8,
    },
    packageButtonFirst: {
        borderRightWidth: 1,
        borderRightColor: '#DDD',
    },
    packageButtonText: {
        color: '#333',
        fontSize: 14,
        textAlign: 'center',
    },
    packageOrderButtonText: {
        color: Colors.tintColor,
    },
    sectionHeader: {
        backgroundColor: '#FFF',
        marginTop: 15,
        marginBottom: 10,
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#CCC',
    },
    sectionHeaderText: {
        fontSize: 12,
        fontWeight: 'bold',
        fontFamily: Styles.Raleway,
    },
    detailsContainer: {
        flex: 1,
        backgroundColor: '#FFF',
        borderRadius: 4,
    },
    packageDetailsCloseIcon: {
        position: 'absolute',
        top: 10,
        right: 15,
        elevation: 2,
    },
    detailsTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    detailsPrice: {
        color: Colors.tintColor,
        fontWeight: 'bold',
    },
    detailsSection: {
        color: '#666',
        fontSize: 12,
    },
    detailsMetaText: {
        color: '#666',
        fontSize: 11,
    }
};

const mapStateToProps = (state) => {
    return {
        expert: state.expert.expert
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getExpert: (id) => dispatch(ExpertsActions.expertRequest(id)),
        bookingInit: () => dispatch(BookingActions.bookingInit()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpertProfileScreen);
