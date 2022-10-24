import { Linking, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MCI from 'react-native-vector-icons/MaterialCommunityIcons'
import OCT from 'react-native-vector-icons/Octicons'
import Foundation from 'react-native-vector-icons/Foundation'
import { useFonts } from 'expo-font';
import { useSelector, useDispatch } from 'react-redux'

const Card = (props) => {
    const [fontsLoaded] =  useFonts({
        'Silka-Regular': require('../assets/fonts/Silka-Regular.otf'),
        'Silka-Meduim' : require('../assets/fonts/Silka-Medium.otf'),
        'Silka-Bold':require('../assets/fonts/Silka-Bold.otf'),
        'Silka-SemiBold':require('../assets/fonts/Silka-SemiBold.otf'),
      });

      const {theme} = useSelector(state=>state.theme)
          
  if(fontsLoaded){
    return (
      <View style={theme === 'light' ? styles.box : styles.boxDark}>
          <View style={styles.innerBox}>
              {
                props.show ? <View style={styles.innerHeader}>
                <Text style={theme === 'light' ? {color:'#7b848d' , fontFamily:'Silka-SemiBold'} : {color:'#ccd4dd' , fontFamily:'Silka-SemiBold'} }>Trending repository</Text>
                <View style={{flexDirection:'row' , alignItems:'center'}}>
                    <MCI name='star-outline' size={23} color='#68ddba' style={{marginRight:5}}/>
                    <View style={theme === 'light' ? styles.countBox : styles.countBoxDark}>
                        <Text style={theme ==='light' ? {color:'#2b1190'}: {color:'#68ddba'}}>
                            {props.stars ? props.stars : <Text>45.3K</Text>}
                        </Text>
                    </View>
                </View>
              </View> : null
              }
              <View style={styles.innerHeader}>
                  <View style={{flexDirection:'row',alignItems:'center'  , width:'100%'}}>
                      <Foundation name='book-bookmark' size={20} color='#68ddba'/>
                      <Text style={theme === 'light' ? {fontFamily:'Silka-SemiBold' , color:'#2b1190' , fontSize:17 , marginHorizontal:5}:{fontFamily:'Silka-SemiBold' , color:'#ffffff' , fontSize:17 , marginHorizontal:5}} onPress={()=>{Linking.openURL(props.url)}}>{props.title}</Text>
                  </View>
                  
              </View>
              <View style={{marginBottom:15}}>
                  <Text style={theme === 'light' ? {fontFamily:'Silka-Regular' ,color:'#000000'}:{fontFamily:'Silka-Regular' ,color:'#FFF'}}>{props.body}</Text>
              </View>
              <View style={styles.hr}></View>
              {
                props.explore ?
                 <View style={styles.boxFooter}>
                  <Text style={theme ==='light' ? {marginRight:15 , fontFamily:'Silka-Regular' , fontSize:13}:{marginRight:15 , fontFamily:'Silka-Regular' , fontSize:13 , color:'#ccd4dd'}}>{`Updated ${props.  elapsed} hours ago`}</Text>
                  <Text style={theme === 'light' ? {fontFamily:'Silka-Regular', fontSize:13}: {fontFamily:'Silka-Regular', fontSize:13 , color:'#ccd4dd'}}>{props.language}</Text>
                 </View> 
                : 
                <View style={styles.boxFooter}>
                  <Text style={theme === 'light' ? {fontFamily:'Silka-Regular', fontSize:13}: {fontFamily:'Silka-Regular', fontSize:13 , color:'#ccd4dd'}}>{props.language}</Text>
                  <View style={{flexDirection:'row' , alignItems:'center' , marginLeft:30}}>
                    <MCI name='star-outline' size={20} color='#68ddba' style={{marginRight:5}}/>
                    <Text style={theme === 'light' ? {fontFamily:'Silka-Regular', fontSize:13}: {fontFamily:'Silka-Regular', fontSize:13 , color:'#ccd4dd'}}>{props.stars}</Text>
                  </View>
                  <View style={{flexDirection:'row' , alignItems:'center' , marginLeft:30}}>
                    <OCT name='repo-forked' size={20} color='#68ddba' style={{marginRight:5}}/>
                    <Text style={theme === 'light' ? {fontFamily:'Silka-Regular', fontSize:13}: {fontFamily:'Silka-Regular', fontSize:13 , color:'#ccd4dd'}}>{props.forks}</Text>
                  </View>
                 </View>
              }
              
          </View>
      </View>
    )
  }
  
}

export default Card

const styles = StyleSheet.create({
    box:{
        width:'90%',
        backgroundColor:'#FFF',
        borderRadius:12,
        marginBottom:25,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
      innerBox:{
        margin:20,
      },
      innerHeader:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingBottom:15,
      },
      countBox:{
        paddingVertical:6,
        paddingHorizontal:8,
        borderRadius:10,
        backgroundColor:'rgba(43,17,144,0.11372549019607843)',
      },
      hr:{
        width:'100%',
        height:0.5,
        backgroundColor:'rgba(204,212,221,0.6392156862745098 )',
        marginBottom:15
      },
      boxFooter:{
        flexDirection:'row',
        alignItems:'center'
      },
      boxDark:{
        width:'90%',
        backgroundColor:'#161b21',
        borderRadius:12,
        marginBottom:25,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
      countBoxDark:{
        paddingVertical:6,
        paddingHorizontal:8,
        borderRadius:10,
        backgroundColor:'rgba(104,221,186,0.19552800059318542)',
      },
})