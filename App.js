import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from './screens/Splash'
import Home from './screens/Home';
import Header from './components/Header';
import { Appearance, useColorScheme } from 'react-native';

import { store } from './redux/store';
import { Provider } from 'react-redux';

const Stack = createNativeStackNavigator();



export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer >
        <Stack.Navigator>
          <Stack.Screen name="Splash" component={Splash} options={{headerShown:false}}/>
          <Stack.Screen name="Home" component={Home} options={{headerBackVisible:false, headerShadowVisible:false,headerTitle:(props)=><Header {...props}/> 
          ,headerStyle:(props)=><Header {...props}/>
          }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
    
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
