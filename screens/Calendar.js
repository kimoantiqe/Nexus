import React, { Component } from "react";
import {
  Platform,
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert
} from "react-native";
import { Agenda } from "react-native-calendars";
import {
  Header,
  Left,
  Right,
  Body,
  Container,
  Title,
  Icon,
  Button
} from "native-base";
import GradientButton from "react-native-gradient-buttons";
import { WaveIndicator } from "react-native-indicators";
import { Haptic } from "expo";
import AlertAsync from "react-native-alert-async";


const today = new Date();
const maxHistory = new Date();
maxHistory.setDate(maxHistory.getDate() - 15);
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const APIcall = require("../API_calls/APIs");

var userToken;
//var userToken2;
var apiURL = APIcall.apiURL;

export default class Calendar extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      items: {},
      refresh: false,
      loading: 1
    };
    this.getTasks();
  }

  getTasks = async () => {
    this.setState({
      refresh: true
    });
    let userToken = await Expo.SecureStore.getItemAsync("userToken");

    if (userToken != null) {
      var head = {
        method: "GET",
        headers: {
          Authorization: userToken
        }
      };
      await fetch(apiURL + "/user/task", head)
        .then(response => response.json())
        .then(async response => {
          if (response.success && response.tasks) {
            let tasks = response.tasks;
            tasks.map(task => {
              let cleanedTask = this.renderItemFromDB(task);
              if (
                !this.isTaskPinned(
                  cleanedTask,
                  this.state.items[cleanedTask.strTime]
                )
              ) {
                if (this.state.items[cleanedTask.strTime]) {
                  this.state.items[cleanedTask.strTime].push(cleanedTask);
                } else {
                  this.state.items[cleanedTask.strTime] = [];
                  this.state.items[cleanedTask.strTime].push(cleanedTask);
                }
              }
            });
            const newItems = {};
            Object.keys(this.state.items).forEach(key => {
              newItems[key] = this.state.items[key];
            });
            this.setState({
              items: newItems
            });
          }
          this.setState({
            refresh: false,
            loading: 0
          });
        });
    }
  };




  render() {
    if (this.state.loading) {
      return (
        <Container>
          <Header
            iosBarStyle="light-content"
            androidStatusBarColor="#ffffff"
            style={styles.header}
          >
            <Left />
            <Body>
              <Title style={styles.headerTitle}>CALENDER</Title>
            </Body>
            <Right />
          </Header>
          <WaveIndicator
            size={80}
            color="#2c2638"
            style={{ flex: 0, marginTop: height * 0.3 }}
          />
        </Container>
      );
    } else {
      return (
        <Container>
          <Header
            iosBarStyle="light-content"
            androidStatusBarColor="#ffffff"
            style={styles.header}
          >
            <Left />
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
            refreshing={this.state.refresh}
            onRefresh={() => this.getTasks()}
          />
        </Container>
      );
    }
  }

  async deleteFromDB(taskId,taskDate){
    this.setState({
      refresh: true
    });
   let userToken = await Expo.SecureStore.getItemAsync("userToken");
   if (userToken != null) {
     var head = {
       method: "DELETE",
       headers: {
         Authorization: userToken
       }
     };
     var deleteCall = apiURL+"/user/task/"+taskId;
     await fetch(deleteCall, head)
       .then(() => {
         var cal = this.state.items;
         cal[taskDate] = [];
         this.setState({
           items:cal,
           refresh: false,
           loading: 0
         });
       });
   }
 };
  async deleteItem(taskId, type,taskDate) {

    if (Platform.OS === "ios") {
      Haptic.impact(Haptic.ImpactStyles["Heavy"]);
    }

      const choice = await AlertAsync(
        'Delete',
        'Are you sure you want to Delete this '+type,
        [
          {text: 'Yes', onPress: () => 'yes',style:'cancel'},
          {text: 'No', onPress: () => Promise.resolve('no')},
        ],
        {
          cancelable: false,
          onDismiss: () => 'no',
        },
      );

      if (choice === 'yes') {
        await this.deleteFromDB(taskId,taskDate);
        await this.getTasks();

      }
      else {
      //
      }


  }

  isTaskPinned(elem, array) {
    if (!array || !elem) return false;
    var len = array.length;
    for (var i = 0; i < len; i++) {
      if (array[i].taskId == elem.taskId) {
        return true;
      }
    }
    return false;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split("T")[0];
  }

  loadItems(day) {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        if (!this.state.items[strTime]) {
          this.state.items[strTime] = [];
        }
      }

  
      const newItems = {};
      Object.keys(this.state.items).forEach(key => {
        newItems[key] = this.state.items[key];
      });
      this.setState({
        items: newItems
      });
    }, 1);

  }

  renderItem(item) {
    if (item.type == "Meeting") {
      return (
        <TouchableOpacity
          onLongPress={() => this.deleteItem(item.taskId,item.type,item.strTime)}
          delayLongPress={1000}
        >
          <View style={styles.itemMeeting}>
            <GradientButton
              onPress={() => onPress && onPress()}
              gradientBegin="#e59c97"
              gradientEnd="#e59c97"
              gradientDirection="diagonal"
              height={20}
              width={150}
              radius={50 / 4}
              impact
              impactStyle="Light"
              style={{
                alignItems: "center",
                justifyContent: "center",
                opacity: 1,
                paddingLeft: 0,
                paddingRight: 0,
                marginRight: 0,
                marginLeft: 0
              }}
            >
              <Text
                style={{ color: "#ffffff", fontSize: 12, fontWeight: "400" }}
              >
                Meeting - {item.subTitle}
              </Text>
            </GradientButton>

            <Text style={styles.itemTitleMeeting}>{item.title}</Text>
            <Text style={styles.itemDescMeeting}>{item.desc}</Text>
          </View>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          onLongPress={() => this.deleteItem(item.taskId,item.type,item.strTime)}
          delayLongPress={1000}
        >
          <View style={styles.itemTask}>
            <GradientButton
              onPress={() => onPress && onPress()}
              gradientBegin="#a2ba53"
              gradientEnd="#a2ba53"
              gradientDirection="diagonal"
              height={20}
              width={150}
              radius={50 / 4}
              impact
              impactStyle="Light"
              style={{
                alignItems: "center",
                justifyContent: "center",
                opacity: 1,
                paddingLeft: 0,
                paddingRight: 0,
                marginRight: 0,
                marginLeft: 0
              }}
            >
              <Text
                style={{ color: "#ffffff", fontSize: 12, fontWeight: "400" }}
              >
                Task - {item.subTitle}
              </Text>
            </GradientButton>

            <Text style={styles.itemTitleTask}>{item.title}</Text>
            <Text style={styles.itemDescTask}>{item.desc}</Text>
          </View>
        </TouchableOpacity>
      );
    }
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}>
        <Text>Whew looks empty!</Text>
      </View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.title !== r2.title;
  }

  renderItemFromDB(item) {
    var finalItem = {};
    const date = new Date(item.taskDueDate);
    const ymd = date.toISOString().split("T")[0];
    const time = date.toLocaleTimeString();
    finalItem["strTime"] = ymd;
    finalItem["taskId"] = item._id;
    finalItem["title"] = item.taskTitle;
    finalItem["subTitle"] = time;
    finalItem["desc"] = item.taskInfo;
    finalItem["type"] = item.taskType;
    return finalItem;
  }
}

const styles = StyleSheet.create({
  itemMeeting: {
    backgroundColor: "#efc5c2",
    flex: 1,
    borderRadius: 5,
    padding: 15,
    marginRight: 10,
    marginTop: 17
  },
  itemTask: {
    backgroundColor: "#c8db8a",
    flex: 1,
    borderRadius: 5,
    padding: 15,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 5,
    padding: 10,
    height: 1,
    marginRight: 10,
    marginTop: 17,
    justifyContent: "center",
    alignItems: "center"
  },
  header: {
    backgroundColor: "#2c2638",
    height: height * 0.1
  },
  headerTitle: {
    paddingTop: height * 0.03,
    paddingBottom: 50,
    fontFamily: "BebasNeue",
    fontSize: 25,
    color: "#ffffff"
  },
  itemTitleMeeting: {
    color: "white",
    marginTop: 10,
    marginBottom: 10,
    fontSize: 29
  },
  itemTitleTask: {
    color: "#ffffff",
    marginTop: 10,
    marginBottom: 10,
    fontSize: 29
  },
  itemDescMeeting: {
    fontSize: 14,
    color: "grey"
  },
  itemDescTask: {
    fontSize: 14,
    color: "grey"
  }
});
