import { useContext } from "react";
import { Text,View } from "react-native";
import PrimaryButton from '../../components/PrimaryButton';
import { AuthContext } from "../../store/context/user-context";

function Profile(){
    const authCtx = useContext(AuthContext);
    return (
        <View>
            <Text>Profile page!</Text>
            <PrimaryButton text={"Logout"} onSuccess={true} onAttempt={authCtx.logout}/>
        </View>
    )
}

export default Profile;