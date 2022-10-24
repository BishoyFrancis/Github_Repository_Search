import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Explore from './Explore'
import Repos from './Repos';
import Favourites from './Favourites';
import { useSelector, useDispatch } from 'react-redux'



const Tab = createMaterialTopTabNavigator();

const Home = () => {
  const {theme} = useSelector(state=>state.theme)
  return (
    <Tab.Navigator screenOptions={{tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',tabBarLabelStyle:{fontSize:12}}}>
        <Tab.Screen name="Explore" component={Explore}/>
        <Tab.Screen name="Repositories" component={Repos}/>
        {/* <Tab.Screen name="Favourites" component={Favourites}/> */}
    </Tab.Navigator>
  )
}

export default Home

const styles = StyleSheet.create({
  dark:{
    backgroundColor:'black'
  },
})