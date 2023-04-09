import {storage} from './firebase';
import {getDownloadURL, ref, uploadString} from 'firebase/storage';

export async function uploadImage(uri,carpark_no){
    var filename = carpark_no + '.jpg';
    const storageRef = ref(storage, 'images/' + filename);

    var message = 'data:image/jpeg;base64,' + uri;
    const res = await uploadString(storageRef, message, 'data_url').then(function(snapshot) {
        console.log('Uploaded a data_url string!');
    });
    return getDownloadURL(storageRef);
}