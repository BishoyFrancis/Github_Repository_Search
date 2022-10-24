import { StyleSheet, Text, View , Image , Switch } from 'react-native'
import React from 'react'
import Feather from 'react-native-vector-icons/Feather'
import { useEffect , useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { changeTheme } from '../redux/features/themeSlice';


const Header = (props) => {
  const [isEnabled, setIsEnabled] = useState('false');
  const storeTheme = useSelector(state=>state.theme)
  const dispatch = useDispatch()
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const darkMode = ()=>{
    if (storeTheme.theme === 'light'){
      dispatch(changeTheme('dark'))
      setIsEnabled(true)
      console.log("AFTER>>>>>>>>>>>>>>",storeTheme.theme)
    }
    else{
      dispatch(changeTheme('light'))
      setIsEnabled(false)
      console.log("AFTER>>>>>>>>>>>>>>",storeTheme.theme)
    }
  }

  useEffect(()=>{
    console.log('OPTIONS:' , props)
  },[])

  

  return (
    <View style={styles.container}>
      <Image source={require('../assets/imgs/footer_logo.png')} style={styles.image}/>
      <View style={{flexDirection:'row' , alignItems:'center'}}>
        <Switch 
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={()=>{toggleSwitch()
        darkMode()
        }}
        value={isEnabled}
        />
        <Feather name='search' size={23} color={storeTheme.theme ==='light' ? 'black' : '#68ddba'}/>  

      </View>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    container:{
        width:'95%',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    image:{
        width:100,
        height:50,
        resizeMode:'contain',
    },
    dark:{
      margin:0,
        width:'95%',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:'#161b21'
    }
    
})