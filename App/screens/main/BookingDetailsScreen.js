import React from 'react';
import {connect} from "react-redux";
import {ScrollView, StyleSheet} from "react-native";
import {Text,TouchableOpacity,Image,View } from '@shoutem/ui';
import ScreenContainer from "../../components/ScreenContainer";
import Styles from "../../constants/Styles/Styles";

class BookingDetailsScreen extends React.Component {

    constructor(props)
    {
        super(props);
        this.state = {
            booking: {}
        };
    }

    componentWillMount() {
        const { booking } = this.props.navigation.state.params;
        this.setState({booking});
    }

    render()
    {
        const { booking } = this.state;
        return (
            <ScreenContainer>
                <ScrollView>
                    <View style={styles.container}>
                        <View>
                            <View style={{flexDirection: 'row', marginBottom: 10}}>
                                <Image
                                    source={{uri: booking.expert.avatar}}
                                    style={styles.profileImage}
                                />
                                <Text style={styles.username}>{booking.expert.fullname}</Text>
                            </View>
                            <View style={styles.packageContainer}>
                                <Text style={Styles.textBold}>{booking.package_name}</Text>
                                <Text style={StyleSheet.flatten([Styles.textBold, Styles.priceText])}>{booking.formatted_price}</Text>
                                <View style={Styles.divider} />
                                <View style={styles.twoCols}>
                                    <View style={styles.flex}>
                                        <Text style={styles.detailsMetaText}>Expert / Teacher</Text>
                                        <Text>{booking.type}</Text>
                                    </View>
                                    <View style={styles.flex}>
                                        <Text style={styles.detailsMetaText}>Duration</Text>
                                        <Text>{booking.duration}</Text>
                                    </View>
                                </View>
                                <View style={styles.twoCols}>
                                    <View style={styles.flex}>
                                        <Text style={styles.detailsMetaText}>Category</Text>
                                        <Text>{booking.category}</Text>
                                    </View>
                                    {(booking.subcategory) ? (
                                        <View style={styles.flex}>
                                            <Text style={styles.detailsMetaText}>Sub Category</Text>
                                            <Text>{booking.subcategory}</Text>
                                        </View>
                                    ) : null}
                                </View>
                                <Text style={styles.descriptionText}>{booking.description}</Text>
                            </View>
                            <View style={styles.packageContainer}>
                                <View style={styles.twoCols}>
                                    <View style={styles.flex}>
                                        <Text style={styles.detailsMetaText}>Booking Status</Text>
                                        <Text>{booking.status}</Text>
                                    </View>
                                </View>
                                <View style={styles.twoCols}>
                                    <View style={styles.flex}>
                                        <Text style={styles.detailsMetaText}>Date</Text>
                                        <Text>{booking.formatted_event_date}</Text>
                                    </View>
                                    <View style={styles.flex}>
                                        <Text style={styles.detailsMetaText}>Time</Text>
                                        <Text>{booking.formatted_event_time}</Text>
                                    </View>
                                </View>
                                <Text style={styles.detailsMetaText}>Location</Text>
                                <Text style={{marginBottom: 10}}>{booking.location}</Text>
                                <Text style={styles.detailsMetaText}>Additional Notes</Text>
                                <Text style={{marginBottom: 10}}>{(booking.additional_notes) ? booking.additional_notes : '-'}</Text>
                            </View>
                            <TouchableOpacity style={Styles.buttonAlert}>
                                <Text style={Styles.buttonText}>Cancel Order</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </ScreenContainer>
        );
    }
}

const styles = {
    flex: {
        flex: 1,
    },
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
        marginBottom: 10,
    },
    descriptionText: {
        fontSize: 14,
        color: '#666',
    },
    twoCols: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginBottom: 10,
    },
    detailsMetaText: {
        color: '#666',
        fontSize: 11,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
    }
};

export default connect(null, mapDispatchToProps)(BookingDetailsScreen);
