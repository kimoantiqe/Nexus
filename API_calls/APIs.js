import {AsyncStorage} from "react-native"
import {sbConnect} from "../sendbirdActions"
import Expo from 'expo';

const apiURL = "http://localhost:1337/api";
module.exports.apiURL = apiURL;

var regUserID;

const _bootstrapAsync = async (props) => {
  const userToken= await Expo.SecureStore.getItemAsync("userToken");
  const userid = await Expo.SecureStore.getItemAsync("userid");

    if (userToken != null) {

    var settings = {
  method: 'GET',
  headers: {
    'Authorization': userToken
  }
  };

  try {
    let response = await fetch(apiURL + '/user', settings)
    .then( (response) =>
      {
        if (response.status === 401)
        {
          props.navigation.navigate('Auth');
        } else
        {
          response.json()
          .then((response) => {
            console.log(" ");
            sbConnect(userid, response.user.firstName)
          });
          props.navigation.navigate('Main');
        }
      }
      );
  } catch (error) {
    console.error(error);
  }

}
 else
{
  props.navigation.navigate('Auth');
}

  };
  module.exports._bootstrapAsync = _bootstrapAsync;

  const login = async function(username, password, props, reload)
  {
      const settings =    {
                              method: "POST",
                              headers: {
                                          "Content-Type": "application/JSON"
                                       },
                              body: JSON.stringify({
                                                      email: username,
                                                      password: password
                                                  })
                          };



        await fetch(apiURL + "/user/login", settings)
          .then(response => response.json())
          .then(async(response) => {
            if (response.success) {
               AsyncStorage.setItem("userToken", response.token)
              .then(AsyncStorage.setItem("userid", response.user.id))
              .then(Expo.SecureStore.setItemAsync("userToken", response.token))
              .then(Expo.SecureStore.setItemAsync("userid", response.user.id))
              .then(populate)
              .then(sbConnect(response.user.id, response.user.firstName + " " + response.user.lastName))
              .then(props.navigation.navigate("Main"))

            } else {
              switch (response.error) {
                case "Not registered":
                  alert('This Username is not registered\nGo to "Register" to make an account');
                  props.navigation.navigate("Login");
                  break;
                case "invalid password":
                  alert("Incorrect password");
                  props.navigation.navigate("Login");
                  break;
                case "Please enter a password to login":
                  alert("Please enter your password");
                  props.navigation.navigate("Login");
                  break;
                case "Please enter an email to login":
                  alert("Please enter your email");
                  props.navigation.navigate("Login");
                  break;
                case "A valid email  was not entered":
                  alert("Please enter a valid email\n(abc@xyz.com)");
                  props.navigation.navigate("Login");
                  break;
              }
            }
          })
          .catch(error => console.error("Error:", error));
  };
  module.exports.login = login;

//Function that is used to populate when the user logs in.
populate = async () =>
{
    userToken = await AsyncStorage.getItem("userToken");

    console.log(userToken + "testing ya basha");

    if (userToken != "") {
      const populate = {
                            method: "GET",
                            headers: {
                                        Authorization: userToken,
                                        "Content-Type": "application/json"
                                    }
                        };

      await fetch(apiURL + "/user/popconn", populate);
    }

};
  module.exports.populate = populate;

const Register = async (inputs, props) =>
{
    ///////////////////////////////REGISTRATION API CALL//////////////////////////////////////
            if (inputs["Username"] == "" || inputs["Username"] == undefined)
            {
                alert("Please enter an email to register");
                props.navigation.navigate("Register");
            } else
            {
                if (inputs["Password"] == "" || inputs["Password"] == undefined)
                {
                    alert("Please enter an password to register");
                    props.navigation.navigate("Register");
                } else
                {
                    if (inputs["Password"] == inputs["Repassword"])
                    {

                        var settings =
                        {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/JSON'
                            },
                            body: JSON.stringify
                            ({
                                'email' : inputs["Username"],
                                'password' : inputs["Password"]
                            })
                        };



                        console.log(inputs);
                        await fetch(apiURL + '/user', settings)
                        .then((response) => response.json())
                        .then((response)  =>
                            {
                                if (response.success)
                                {
                                    AsyncStorage.setItem("userid", response.user.id)
                                    .then(Expo.SecureStore.setItemAsync("userid", response.user.id))
                                    .then(AsyncStorage.setItem('userToken', response.token))
                                    .then(Expo.SecureStore.setItemAsync("userToken", response.token))
                                    .then(props.navigation.navigate('RCP'))
                                    .then(console.log('DDDD'));
                                    regUserID = response.user.id;

                                } else
                                {
                                    switch (response.error)
                                    {
                                        case "A valid email was not entered.":
                                            alert("A valid email was not entered.");
                                            props.navigation.navigate("Register");
                                        break;
                                        case "User already exists with that email":
                                            alert("User already exists with that email");
                                            props.navigation.navigate("Register");
                                        break;
                                    }
                                }
                            }
                        )
                        .catch((error) => console.error('Error:', error));


                    } else
                    {
                        alert("Passwords do not match!\nPlease try again.");
                        props.navigation.navigate("Register");
                    }
                }
            }
            console.log("DONE");
};
module.exports.Register = Register;

const CompleteProfile = async (first, last, interests, industry, LF, bio, props) => {


    if (first == "" || last == "")
    {
        alert("Please enter your first & last name to register");
    } else
    {

    const userToken = await AsyncStorage.getItem('userToken');
    let i = 0;
    let interest = '[';
    let ind = '[';
    let lf = '[';

    Object.keys(interests).map(function(keyName) {

        interest += (i? ',': '') + "\"" + keyName + "\"";
        i++;

      });

    i = 0;
    interest += "]";

    Object.keys(industry).map(function(keyName) {

        ind += (i? ',': '') + "\"" + keyName + "\"";
        i++;

      });

    i = 0;
    ind += "]";

    Object.keys(LF).map(function(keyName) {

        lf += (i? ',': '') + "\"" + keyName + "\"";
        i++;

      });

    i = 0;
    lf += "]";

    interest = JSON.parse(interest);
    ind = JSON.parse(ind);
    lf = JSON.parse(lf);

    var settings = {
        method: 'PUT',
        headers: {
            'Authorization': userToken,
            'Content-Type': 'application/JSON'
        },
        body: JSON.stringify({
            "firstName" : first,
            "lastName" : last,
            "interests" : interest,
            "lookingFor": lf,
            "industry"  : ind,
            "bio" : bio
        })
        };

        console.log(settings);



      await fetch(apiURL + '/user', settings)
        .then((response) => response.json())
        .then(() => populate())
        .then(() => sbConnect(regUserID, first + " " + last))
        .then(() =>  props.navigation.navigate("Main"))

    }

  };
  module.exports.CompleteProfile = CompleteProfile;

  const UpdateProfile = async (first, last, interests, industry, LF, bio, props) => {


    if (first == "" || last == "")
    {
        alert("Please enter your first & last name to register");
    } else
    {

    const userToken = await AsyncStorage.getItem('userToken');
    let i = 0;
    let interest = '[';
    let ind = '[';
    let lf = '[';

    Object.keys(interests).map(function(keyName) {

        interest += (i? ',': '') + "\"" + keyName + "\"";
        i++;

      });

    i = 0;
    interest += "]";

    Object.keys(industry).map(function(keyName) {

        ind += (i? ',': '') + "\"" + keyName + "\"";
        i++;

      });

    i = 0;
    ind += "]";

    Object.keys(LF).map(function(keyName) {

        lf += (i? ',': '') + "\"" + keyName + "\"";
        i++;

      });

    i = 0;
    lf += "]";

    interest = JSON.parse(interest);
    ind = JSON.parse(ind);
    lf = JSON.parse(lf);

    var settings = {
        method: 'PUT',
        headers: {
            'Authorization': userToken,
            'Content-Type': 'application/JSON'
        },
        body: JSON.stringify({
            "firstName" : first,
            "lastName" : last,
            "interests" : interest,
            "lookingFor": lf,
            "industry"  : ind,
            "bio" : bio
        })
        };

        console.log(settings);



      await fetch(apiURL + '/user', settings)

    }

  };
  module.exports.UpdateProfile = UpdateProfile;

  const likedUser = async (currUserID) => {
    userToken= await Expo.SecureStore.getItemAsync("userToken");
    if (userToken != null) {
      console.log("This is liked user " + currUserID);


      var updateUser = {
        method: 'PUT',
        headers: {
          'Authorization': userToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'liked' : [currUserID]
          })
      };
      await fetch(apiURL + '/user', updateUser).then(response => response.json())
      .then(async(response) => {console.log(response);})
    }
  };
  module.exports.likedUser = likedUser;

  //Function that is used to report a dislike to the server
  const dislikedUser = async (currUserID) => {

    userToken= await Expo.SecureStore.getItemAsync("userToken");
    //userToken = await AsyncStorage.getItem('userToken');

    console.log("This is disliked user" + currUserID);

    if (userToken != null) {
      console.log("This is disliked user" + currUserID);
      var updateUser = {
        method: 'PUT',
        headers: {
          'Authorization': userToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'disliked' : [currUserID]
          })
      }
      await fetch(apiURL + '/user', updateUser)
    }
  };
  module.exports.dislikedUser = dislikedUser;

  const loginfb = async (props) => {
    try {
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Expo.Facebook.logInWithReadPermissionsAsync('1220787098061912', {
        permissions: ['public_profile'],
      });
      if (type === 'success') {

        const payload = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'access_token' : token
            })
        }

        const response = await fetch(apiURL+"/user/login/facebook",payload);
        response = await response.json();
        if(response.message == "Successfully created new user." && response.success){ // Means it was a new user need to complete profile
          console.log("New user");
          AsyncStorage.setItem("userid", response.user.id);
          AsyncStorage.setItem('userToken', response.token);
          Expo.SecureStore.setItemAsync("userToken", response.token);
          regUserID = response.user.id;
          props.navigation.navigate('RCP');
        }else if(response.success){//Loged in Successfuly
          console.log("Logged in:");
          AsyncStorage.setItem("userToken", response.token);
              AsyncStorage.setItem("userid", response.user.id);
              Expo.SecureStore.setItemAsync("userToken", response.token);

              populate();

              sbConnect(response.user.id, response.user.firstName + " " + response.user.lastName);

              props.navigation.navigate("Main");
        }else{//Means an error has occoured
          console.log("An error has occourd in facebook back end call");
        }

      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }
  module.exports.loginfb = loginfb;


  const instantMatch = async (UserID) => {
    userToken= await Expo.SecureStore.getItemAsync("userToken");
    if (userToken != null) {

      var updateUser = {
        method: 'PUT',
        headers: {
          'Authorization': userToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'id' : UserID
          })
      };
      await fetch(apiURL + '/user/match', updateUser).then(response => response.json())
      .then(async(response) => {console.log(response);})
    }
  };
  module.exports.instantMatch = instantMatch;


   //need to make sure
   getUser = async userid => {
    let userToken = await AsyncStorage.getItem("userToken");

    if (userToken != null) {
      var user = {
        method: "GET",
        headers: {
          Authorization: userToken
        }
      };
      await fetch(apiURL + "/user/getuser/?id=" + userid, user)
        .then(response => response.json())
        .then(response => {
          console.log(response.user)
          return(response.user)
        });
    }
  };
  module.exports.getUser = getUser;


  sendTaskMeeting = async (taskName, taskDescription, taskDateTime, type, friendId) => {
    let userToken = await AsyncStorage.getItem("userToken");
    console.log(userToken);

    if (userToken != null) {
      var user = {
        method: "POST",
        headers: {
          Authorization: userToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'taskTitle' : taskName,
          'taskInfo': taskDescription,
          'taskType': type,
          'taskDueDate': taskDateTime,
          'participatingUser': friendId,
          })
      };
      await fetch(apiURL + "/user/task", user)
        .then(response => response.json())
        .then(response => {
          console.log(response)
          return(response)
        });
    }
  };
  module.exports.sendTaskMeeting = sendTaskMeeting;

  sendImage = async (PicturePath) => {
    let userToken = await AsyncStorage.getItem("userToken");
    console.log(userToken);

    if (userToken != null) {
      var data = new FormData();
      data.append('file', { uri: PicturePath, name: 'profilePic.jpg' });
      var user = {
        method: "POST",
        headers: {
          Accept: 'application/json',
          Authorization: userToken,
          'Content-Type': 'multipart/form-data',
        },
        body: data
      };
      await fetch(apiURL + "/user/image", user)
        .then(response => response.json())
        .then(response => {
          console.log(response)
          return(response)
        });
    }
  };
  module.exports.sendImage = sendImage;

  getImage = () => {
    return new Promise(async (resolve, reject) => {
      let userToken = await AsyncStorage.getItem("userToken");
      console.log(userToken);

      if (userToken != null) {
        var user = {
          method: "GET",
          headers: {
            Authorization: userToken,
          }
        };
        await fetch(apiURL + "/user/image", user)
        .then(response => response.blob())
        .then(blob => {
          console.log(blob);
          const url = URL.createObjectURL(blob);
          console.log(url);
          const fileReaderInstance = new FileReader();
            fileReaderInstance.readAsDataURL(blob); 
            fileReaderInstance.onload = () => {
            base64data = fileReaderInstance.result;
            console.log(base64data.length)                
            resolve(base64data.toString());
          }
        })
      }
    })
  };
  module.exports.getImage = getImage;