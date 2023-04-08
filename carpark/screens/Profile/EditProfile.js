import { useContext, useEffect, useState } from "react";
import { Alert, Dimensions, ScrollView, StyleSheet, TextInput, View } from "react-native";
import { Text } from "react-native";
import { AuthContext } from "../../store/context/user-context";
import { updateAccount } from "../../util/AuthManager";
import PrimaryButton from "../../components/PrimaryButton";


let componentWidth = 0;
const width = Dimensions.get('window').width;
const height = Dimensions.get("window").height;

function EditProfile({navigation}){
    const [fullName,setFullName] = useState('')
    const [phoneNumber,setPhoneNumber] = useState('');
    const [filled, setFilled] = useState(false);
    const authCtx = useContext(AuthContext);
    
    useEffect(()=>{
        if(fullName !=='' && phoneNumber !==''){
            setFilled(true);
        } 
    },[fullName,phoneNumber]);

    //changing state function
    function fullNameHandler(enteredName){
        setFullName(enteredName)
    }

    function phoneNumberHandler(enteredPhoneNumber){
        setPhoneNumber(enteredPhoneNumber);
    }

    function measureView(event){
        componentWidth = event.nativeEvent.layout.width
    }

    //create profile fuction
    async function updateProfileAttempt(){
        if(fullName !=='' && phoneNumber !==''){
            const token = await updateAccount(authCtx.token,fullName);
            authCtx.handleDisplayName(fullName);
            navigation.navigate('Profile');
        }
        console.log('Profile updated');
    }
    return (
        <ScrollView style={styles.page} keyboardShouldPersistTaps='handled'>
            <View>
                <View style={styles.topContent}>
                    <Text style={styles.title} onLayout={(event)=>{
                        measureView(event);
                    }}>Edit Profile</Text>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.inputText} onChangeText={fullNameHandler} placeholder='New Display Name here..' value={fullName}/>
                    <TextInput style={styles.inputText} onChangeText={phoneNumberHandler} placeholder='New Phone Number here..' value={phoneNumber} keyboardType="decimal-pad" maxLength={8}/>
                </View>
                <View style={styles.buttonContainer}>
                    <PrimaryButton onSuccess={filled} onAttempt={updateProfileAttempt} text="Update Profile"/>
                </View>
            </View>
        </ScrollView>
    )
}

export default EditProfile;

const styles = StyleSheet.create({
    page:{
        backgroundColor: 'white',
        flex: 1
    },
    topContent:{
        flexDirection: 'row',
        marginTop: 30,
        alignContent: 'center',
        width: '100%',
        flexDirection: "row",
        top: height / 50,
        marginRight: width / 5,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        textAlignVertical: 'center',
        alignContent: 'center',
        marginBottom: 50,
    },
    title:{
        marginLeft: (width-componentWidth)/5,
        marginTop: 40,
        fontSize: 24
    },
    inputContainer:{
        marginTop: 30
    },
    inputText:{
        width: '95%',
        backgroundColor: 'white',
        borderColor: '#A7B2BA',
        borderWidth: 2,
        color: 'grey',
        padding: 15,
        borderRadius: 12,
        fontSize: 15,
        marginHorizontal: 10,
        marginBottom: 40,
    },
    buttonContainer:{

    }

});