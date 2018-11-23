import React, { Component } from "react";
import { Text, View, StyleSheet,Dimensions } from "react-native";
import { Agenda } from "react-native-calendars";
import {Header,Left,Right,Body,Container,Title} from "native-base"
const today = new Date();
const maxHistory = new Date();
maxHistory.setDate(maxHistory.getDate() - 15);
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
export default class Calendar extends React.Component {
  static navigationOptions = {
header: null,
};
  constructor(props) {
    super(props);
    this.state = {
      items: {}
    };
  }

  render() {
    return (
      <Container>
      <Header  iosBarStyle='light-content' androidStatusBarColor='#ffffff' style={styles.header}>
      <Left/>
      <Body>
        <Title style={styles.headerTitle}>CALENDER</Title>
      </Body>
      <Right />
      </Header>
      <Agenda
        items={this.state.items}
        loadItemsForMonth={this.loadItems.bind(this)}
        selected={today}
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
        minDate={maxHistory}
        theme={{
          selectedDayBackgroundColor: "#84537d",
          selectedDayTextColor: "#ffffff",
          todayTextColor: "#84537d",
          textDisabledColor: "#d9e1e8",
          dotColor: "#84537d",
          selectedDotColor: "#ffffff",
          agendaDayTextColor: "black",
          agendaDayNumColor: "black",
          agendaTodayColor: "#84537d",
          agendaKnobColor: "#463143"
        }}
        onRefresh={() => console.log('refreshing...')}
      />
    </Container>
    );
  }

  loadItems(day) {

    //plugin fetch call here
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        if (!this.state.items[strTime]) {
          this.state.items[strTime] = [];
          const numItems = Math.floor(Math.random() * 5);
          for (let j = 0; j < numItems; j++) {
            this.state.items[strTime].push({
              name: "Item for " + strTime,
              height: Math.max(50, Math.floor(Math.random() * 150))
            });
          }
        }
      }
      //console.log(this.state.items);
      const newItems = {};
      Object.keys(this.state.items).forEach(key => {
        newItems[key] = this.state.items[key];
      });
      this.setState({
        items: newItems
      });
    }, 1000);
    // console.log(`Load Items for ${day.year}-${day.month}`);
  }

  renderItem(item) {
    var itemTest = {
      taskTitle: "Ashraf",
      taskDueDate:Date.now(),
      taskInfo: "Bioo"

    };
    console.log(this.renderItemFromDB(itemTest));
    return (
      <View style={styles.item}>
        <Text style={styles.itemSubtitle}>Time + Type</Text>
        <Text style={styles.itemTitle}>Title</Text>
        <Text style={styles.itemDesc}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nibh arcu, malesuada nec nibh nec, congue dictum sapien. Nunc sagittis, ex et suscipit iaculis, mauris est semper sem, vel commodo diam magna ac mauris. </Text>
      </View>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}>
      <Text>Whew looks empty!</Text>
      </View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split("T")[0];
  }

  renderItemFromDB(item) {
    var finalItem = {};
    const date = new Date(item.taskDueDate);
    var time =date.toISOString().split("T")[0];
    finalItem["strTime"] = time;
    finalItem["title"] = item.taskTitle;
    finalItem["subTitle"] = time + " - Meeting";
    finalItem["desc"] = item.taskInfo;

    return finalItem;
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 5,
    padding:  15,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 5,
    padding:  10,
    height: 1,
    marginRight: 10,
    marginTop: 17,
    justifyContent: 'center',
alignItems: 'center'
},header:{
  backgroundColor: '#2c2638',
  height: height*0.1
},
headerTitle:{
  paddingTop:height*0.03,
  paddingBottom:50,
  fontFamily: 'BebasNeue',
  fontSize : 25,
  color: '#ffffff'
},
itemTitle:{
  color:'#25212d',
  marginTop:10,
  marginBottom : 10,
  fontSize:29
},
itemDesc:{
  fontSize:14,
  color:'grey'
},
itemSubtitle:{
  fontSize:16,
  color:'#494949'
}
});
