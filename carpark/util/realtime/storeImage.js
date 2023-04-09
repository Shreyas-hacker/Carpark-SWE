import storage from './firebase'
import {getDownloadURL, ref, uploadBytesResumable} from 'firebase/storage';

export async function uploadImage(uri,carpark_no){
    var filename = carpark_no + '.jpg';
    const storageRef = ref(storage, 'images/' + filename);

    const uploadTask = uploadBytesResumable(storageRef, uri);
    var url = '';

    
    return new Promise((resolve, reject) => {
    uploadTask.on('state_changed', (snapshot) => {
        console.log('snapshot progess ' + (snapshot.bytesTransferred / snapshot.totalBytes) * 100);
    }, (error) => {
        console.log(error);
        reject(error);
    }, () => {
        //Upload complete and get download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            url = downloadURL;
            resolve(url);
        });
    });
    });
}