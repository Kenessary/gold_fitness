import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Onboarding from "../screens/Authorization/Onboarding/Onboarding";
import RegistrationScreen from "../screens/Authorization/Registration/RegistrationScreen";

const Stack = createNativeStackNavigator()

const AuthStack = () => {
    return(
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Onboarding" component={Onboarding} options={{customAnimationOnGesture:false, animation:'fade', animationDuration:400}}/>
            <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} options={{
                       animation:'slide_from_bottom', animationDuration:500,
                       headerShown: true, 
                       headerTitle: 'Регистрация', 
                       headerTitleStyle:{
                           fontSize:18,
                           color: 'white',
                           fontFamily:'TTNormsPro-Bold'
                       }, 
                       headerTitleAlign: 'center',
                       headerBackTitleVisible: false,
                       headerTintColor: 'white',
                       headerStyle:{backgroundColor: '#202226'}
            }}/>
        </Stack.Navigator>
    )
}

export default AuthStack