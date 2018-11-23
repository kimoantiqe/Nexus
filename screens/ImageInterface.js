import { ImagePicker, Permissions } from 'expo';
const APIcall      = require("../API_calls/APIs");

export const getImageFromLibrary = async () => {
    const {status} = await Permissions.getAsync(Permissions.CAMERA_ROLL);
    if(status === 'granted'){
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [250, 250],
            quality: 0.5,
            base64: false,
            exif: false,
          });
        if(result.cancelled === false)
            APIcall.sendImage(result.uri);
    }
}

export const getImageFromCamera = async () => {
    const {status} = await Permissions.getAsync(Permissions.CAMERA_ROLL, Permissions.CAMERA);
    if(status === 'granted'){
        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [250, 250],
            quality: 0.5,
            base64: false,
            exif: false,
          });
        if(result.cancelled === false)
            APIcall.sendImage(result.uri);
    }
}