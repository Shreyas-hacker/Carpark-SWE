import storage from './firebase'
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage';
import uuid from "uuid";
// export async function uploadImage(uri,carpark_no){
//     var filename = carpark_no + '.jpg';
//     const storageRef = ref(storage, 'images/' + filename);
//     const metadata = {
//         contentType: 'image/jpeg',
//     };
//     const uploadTask = uploadBytesResumable(storageRef, uri, metadata);
//     var url = '';

    
//     return new Promise((resolve, reject) => {
//     uploadTask.on('state_changed', (snapshot) => {
//         console.log('snapshot progess ' + (snapshot.bytesTransferred / snapshot.totalBytes) * 100);
//     }, (error) => {
//         console.log(error);
//         reject(error);
//     }, () => {
//         //Upload complete and get download URL
//         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//             url = downloadURL;
//             resolve(url);
//         });
//     });
//     });
// }

export async function uploadImage(uri,carpark_no){
    const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function() {
            resolve(xhr.response);
        };
        xhr.onerror = function(e) {
            console.log(e);
            reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', uri, true);
        xhr.send(null);
    });

    const fileRef = ref(storage, uuid.v4());
    const result = await uploadBytes(fileRef,blob)

    blob.close();
    return await getDownloadURL(fileRef);
}
