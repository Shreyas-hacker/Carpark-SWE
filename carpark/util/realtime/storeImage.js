import { firebase } from "./firebase";

export async function uploadImage(uri){
    const response = await fetch(uri);
    const blob = await response.blob();
    const filename = uri.substring(uri.lastIndexOf('/')+1);
    var ref = firebase.storage().ref().child(filename).put(blob);
    try{
        await ref;
    }catch(error){
        console.log(error);
    }
    return ref.downloadURL;
}