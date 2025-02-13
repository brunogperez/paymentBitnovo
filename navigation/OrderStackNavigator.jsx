import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import CreatePayment from '../screens/CreatePayment'
import ApplicationScreen from '../screens/ApplicationScreen'
import PaymentComplete from '../screens/PaymentComplete'

const Stack = createNativeStackNavigator()

const OrderStackNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="CreatePayment"
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="CreatePayment" component={CreatePayment} />
            <Stack.Screen name="Application" component={ApplicationScreen} />
            <Stack.Screen name="PaymentComplete" component={PaymentComplete} />
        </Stack.Navigator>
    )
}

export default OrderStackNavigator
