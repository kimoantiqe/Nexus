import { ImagePicker, Permissions } from 'expo';
const APIcall      = require("../API_calls/APIs");

export const getImageFromLibrary = async () => {
    return new Promise(async (resolve, reject) => {
    const {status} = await Permissions.getAsync(Permissions.CAMERA_ROLL);
    if(status === 'granted'){
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [250, 250],
            quality: 0.2,
            base64: true,
            exif: false,
          });
        if(result.cancelled === false){
            APIcall.sendImage(result.uri);
            resolve(result.base64)
        }else{
            reject("Cancelled Selection")
        }
    }else{
        reject("Permission not granted")
    }
})
}

export const getImageFromCamera = async () => {
    return new Promise(async (resolve, reject) => {
    const {status} = await Permissions.getAsync(Permissions.CAMERA_ROLL, Permissions.CAMERA);
    if(status === 'granted'){
        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [250, 250],
            quality: 0.2,
            base64: true,
            exif: false,
          });
        if(result.cancelled === false){
            APIcall.sendImage(result.uri);
            resolve(result.base64)
        }else{
            reject("Cancelled Selection")
        }
    }else{
        reject("Permission not granted")
    }
})
}