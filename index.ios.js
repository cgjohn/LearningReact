/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView
} from 'react-native';

import { fetch } from 'fetch';
import { AIRBNB_API } from './data';
import RatingText from './RatingText';
import LikeButton from './LikeButton';

import type { Listing } from './data';

export default class AwesomeProject extends Component {

  state = {
    listings: [],
    liked: new Map(),
  };

  render() {
    const list = this.state.listings.map(
      home =>  <ListingCell 
        isLiked={this.state.liked.get(home.id)}
        key={home.id} 
        listing={home}
        onLike={() => alert(home.name)}/>
    );
    return (
      <ScrollView style={styles.container}>
        <TouchableOpacity>
          <Image style={styles.fox}
            source={require('./img/fox.png')}/>
        </TouchableOpacity>

        <Text style={styles.instructions}>
          {this.state.listings.length}
        </Text>

        {list}
      </ScrollView>
    );
  }

  componentDidMount() {
    fetch(AIRBNB_API)
      .then(response => response.json())
      .then((data) => { 
        this.setState({listings: data});
        console.log('Response from API:', data);
    }); 
  }
}

class ListingCell extends Component {
  props: {
    listing: Listing;
    isLiked: boolean;
    onLike: function; 
  };
  render () {
    const listing = this.props.listing;
    let flash;
    if (listing.instantBook){
      flash = (
        <Image source={require('./img/flash.png')} />
      );
    }
    return ( 
      <View>
        <Image
          style={{height: 170}}
          source ={{ uri: this.props.listing.previewImageURL}}>

          <View style={styles.badge}> 
            <Text style={styles.badgeText}>
              ${listing.price}
            </Text>

            <Text style={styles.units}>
              USD{'\n'}PER NIGHT
            </Text>
            {flash}
          </View>
         </Image>

        <View style={styles.info}>

          <Text style={styles.name}>
            {listing.name}
          </Text>

          <Text style={styles.details}>
            {listing.typeText} 
            { '  ' }
            <RatingText
              count={listing.reviewsCount}
              value={listing.starRating} />
              { '  ' }
          </Text>

          <LikeButton 
            isLiked={this.props.isLiked} 
            onPress={this.props.onLike}/>
        </View>
      </View>
    )
  }
}


var IMAGE_SIZE = 100;
const styles = StyleSheet.create({
  fox: {
    borderRadius: IMAGE_SIZE / 2,
  },
  info: {
    padding: 15,
  },
  name: {
    fontSize: 20,
    marginBottom: 4,
  },
  details: {
    fontSize: 12,
    color: '#888',
  },
  badge: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    position: 'absolute',
    left: 0,
    bottom: 25,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
  units: {
    color: 'white',
    fontSize: 8,
    marginRight: 5,
    marginLeft: 3,
  },
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  instructions: {
    fontSize: 15,
    color: '#351393',
    margin: 15,
  },
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);