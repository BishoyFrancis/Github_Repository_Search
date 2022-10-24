import { StyleSheet, Text, View , Image , ActivityIndicator } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react';

const Splash = ({navigation}) => {
  
    useEffect(()=>{
        setTimeout(()=>navigation.navigate('Home'),2000)
    },[])

  return (
    <View style={styles.container}>
      <Image source={require('../assets/imgs/footer_logo.png')} style={styles.image}/>
      <ActivityIndicator style={styles.loader} size='large' color='#68ddba'/>
    </View>
  )
}

export default Splash

const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
        // backgroundColor:'#1363DF',
        alignItems:'center',
        justifyContent:'center'
    },
    image:{
        width: 150,
        height: 150,
        resizeMode: 'contain',
    },
    loader:{
        position:'relative',
        top:-35,
    }
})