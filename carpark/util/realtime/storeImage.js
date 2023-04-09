import storage from './firebase'
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage';

export async function uploadImage(uri,carpark_no){
    console.log(uri);
    var filename = carpark_no + '.jpg';
    const storageRef = ref(storage, 'images/' + filename);

    const res = uploadBytes(storageRef, uri).then((snapshot) => {
        console.log('Uploaded a blob or file!');
    });
    
    const url = await getDownloadURL(storageRef);
    return url;
}