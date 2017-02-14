/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
//Import files
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  ListView,
  Text,
  Image,
  View
} from 'react-native';

import ImageLoader from 'react-native-smart-image-loader'

var REQUEST_URL = 'http://10.195.169.15:8000/feed.json';

//Logic
export default class MovieApp extends Component {

  constructor(props){
    super(props);
    this.state={
      dataSource: new ListView.DataSource({
       rowHasChanged: (row1, row2) => row1 !== row2,
     }),
     loaded: false,
    };
  }

  componentDidMount(){
    this.fetchData();
  }

  fetchData(){
    fetch(REQUEST_URL)
    .then((response)=>response.json())
    .then((responseData)=>{
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(responseData.feeds),
        loaded: true,
      });
    })
    .done();
  }

render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
     <ListView
       dataSource={this.state.dataSource}
       renderRow={this.renderFeeds}
       style={styles.listView}
     />
   );
  }

renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>Loading movies...</Text>
      </View>
    );
  }

renderFeeds(action) {
    return (
      <View style={styles.container}>
        <View style={styles.rightContainer}>
        <Text style={styles.title}>{action.slug}</Text>
        <Text style={styles.title}>{action.title}</Text>
         <ImageLoader
             style={{width: 250, height: 250}}
             options={{
               rowID: "",
               src: action.image,
               placeholder: ""
             }}
         />
        <Text style={styles.title}>{action.slug}</Text>
        <Text style={styles.title}>{action.summary}</Text>
       </View>
      </View>
    );
  }
}

//Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  rightContainer: {
   flex: 1,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  thumbnail: {
  width: 450,
  height: 150,
  },
  listView: {
   paddingTop: 20,
   backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  year: {
    textAlign: 'center',
  },

});

AppRegistry.registerComponent('MovieApp', () => MovieApp);
