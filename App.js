import { useFonts } from "expo-font";
import {
  Mulish_200ExtraLight,
  Mulish_300Light,
  Mulish_400Regular,
  Mulish_500Medium,
  Mulish_600SemiBold,
  Mulish_700Bold,
  Mulish_800ExtraBold,
  Mulish_900Black,
  Mulish_200ExtraLight_Italic,
  Mulish_300Light_Italic,
  Mulish_400Regular_Italic,
  Mulish_500Medium_Italic,
  Mulish_600SemiBold_Italic,
  Mulish_700Bold_Italic,
  Mulish_800ExtraBold_Italic,
  Mulish_900Black_Italic,
} from "@expo-google-fonts/mulish";

import { StyleSheet } from "react-native";
import CreatePayment from "./screens/CreatePayment";
import { NavigationContainer } from "@react-navigation/native";
import ApplicationScreen from "./screens/ApplicationScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PaymentComplete from "./screens/PaymentComplete";

const Stack = createNativeStackNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    Mulish_200ExtraLight,
    Mulish_300Light,
    Mulish_400Regular,
    Mulish_500Medium,
    Mulish_600SemiBold,
    Mulish_700Bold,
    Mulish_800ExtraBold,
    Mulish_900Black,
    Mulish_200ExtraLight_Italic,
    Mulish_300Light_Italic,
    Mulish_400Regular_Italic,
    Mulish_500Medium_Italic,
    Mulish_600SemiBold_Italic,
    Mulish_700Bold_Italic,
    Mulish_800ExtraBold_Italic,
    Mulish_900Black_Italic,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="CreatePayment"
          component={CreatePayment}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Application"
          component={ApplicationScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PaymentComplete"
          component={PaymentComplete}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: " #FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
});
