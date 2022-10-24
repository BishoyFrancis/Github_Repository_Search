import { StyleSheet, Text, View , ScrollView , TouchableNativeFeedback , ActivityIndicator } from 'react-native'
import React from 'react'
import { useFonts } from 'expo-font';
import { useEffect , useState} from 'react';
import SelectDropdown from 'react-native-select-dropdown'
import FontAwesome from 'react-native-vector-icons/FontAwesome5'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { dateFormat } from '../helper/functions';
import Card from '../components/Card';
import {starsFormat , elapsedTime} from '../helper/functions';
import { useSelector, useDispatch } from 'react-redux'


const Repos = () => {

  const [date, setDate] = useState(new Date(1598051730000));
  const [isOpen,setOpen] = useState(false);
  const [select , setSelect] = useState('');
  const [data , setData] = useState([])
  const {theme} = useSelector(state=>state.theme)

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
    setOpen(false);
    generateURL(date,select)
  };

  const generateURL = (queryDate,queryLanguage)=>{
    queryDate = queryDate.toISOString().slice(0,10)
    console.log(queryDate)
    if(queryLanguage === '' || queryLanguage === 'Any'){
      console.log("NO Language")
      fetch(`https://api.github.com/search/repositories?q=created:>${queryDate}&stars:>0&sort=stars&order=desc&per_page=100`).then(res=>res.json()).then(json=>setData(json['items']))
    }
  }

  const fetchWithLanguage = (qDate , qLanguage)=>{
    fetch(`https://api.github.com/search/repositories?q=language:${qLanguage}&created:>${qDate}&stars:>0&order=desc&per_page=50`).then(res=>res.json()).then(json=>setData(json['items']))
  }

  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = () => {
    showMode('date');
    setOpen(true)
  };

  useEffect(()=>{
    generateURL(date,select)
    console.log('From Repos',theme)
  },[])

  const languages = ['Any','C++' , 'Java' , 'Javascript' , 'HTML' , 'Python' , 'PHP' , 'Typescript' , 'Swift' , 'C' , 'Rust' , 'Go' , 'C#' , 'Kotlin' , 'R' , 'Perl' , 'Dart' , 'Scala' , 'Ruby']
  const [fontsLoaded] =  useFonts({
    'Silka-Regular': require('../assets/fonts/Silka-Regular.otf'),
    'Silka-Meduim' : require('../assets/fonts/Silka-Medium.otf'),
    'Silka-Bold':require('../assets/fonts/Silka-Bold.otf'),
  });
  if(fontsLoaded){
    return (
      <View style={theme==='light' ? styles.container : styles.containerDark}>
        <View style={styles.title}>
              <Text style={theme ==='light' ? {fontFamily:'Silka-Meduim' , fontSize:25 , marginBottom:25} : {fontFamily:'Silka-Meduim' , fontSize:25 , marginBottom:25 , color:'#ffffff'}}>Repositories</Text>
              <View style={styles.flexRow}>
                <SelectDropdown
                data={languages}
                onSelect={(selectedItem, index) => {
                    console.log(selectedItem, index);
                    setSelect(selectedItem);
                    fetchWithLanguage(date , selectedItem)
                }}
                defaultButtonText={<View style={{flexDirection:'row' , alignItems:'center' , justifyContent:'center'}}><Text style={theme === 'light' ? {color:'gray' , fontSize:13} : {color:'#FFF' , fontSize:13} }>Language : </Text><Text style={theme === 'light'?{fontFamily:'Silka-Bold' , fontSize:15} : {fontFamily:'Silka-Bold' , fontSize:15 , color:'white'} }>Any</Text></View>}
                dropdownIconPosition={'right'}
                buttonTextAfterSelection={(selectedItem, index) => {
                    return <View style={{flexDirection:'row' , alignItems:'center' , justifyContent:'center'}}><Text style={theme === 'light' ? {color:'gray' , fontSize:12} : {color:'white' , fontSize:12} }>Language : </Text><Text style={theme === 'light' ?{fontFamily:'Silka-Bold' , fontSize:15} : {fontFamily:'Silka-Bold' , fontSize:15 , color:'#FFFFFF'}}>{selectedItem}</Text></View>
                  }}
                renderDropdownIcon={isOpened => {
                    return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={theme === 'light' ? '#444' : '#FFF'} size={18} style={{marginRight:5}}  />;
                  }}
                 buttonStyle={theme === 'light' ? styles.dropdownBtnStyle : styles.dropdownBtnStyleDark}
                 buttonTextStyle={styles.dropdownBtnTxtStyle}
                 rowTextStyle={styles.dropdownRowTxtStyle}
                 search
                 searchPlaceHolder={'Filter Languages'}
                 searchPlaceHolderColor={'darkgrey'}
                 renderSearchInputLeftIcon={() => {
                  return <FontAwesome name={'search'} color={'#444'} size={18} />;
                  }}
                />
                <TouchableNativeFeedback onPress={showDatepicker}>
                  <View style={theme==='light'? styles.dateStyle : styles.dateStyleDark}>
                    <View style={{paddingHorizontal:10}}>
                      <View style={{flexDirection:'row' , alignItems:'center' , justifyContent:'center'}}><Text style={theme==='light' ? {color:'gray' , fontSize:12} : {color:'gray' , fontSize:12 , color:'#FFF'}}>Date : </Text><Text style={theme==='light' ? {fontFamily:'Silka-Bold' , fontSize:15} : {fontFamily:'Silka-Bold' , fontSize:15 , color:'#FFF'} }>{dateFormat(date.toLocaleString())}</Text></View>  
                      </View>
                      <View style={{paddingRight:10}}><FontAwesome name={isOpen ? 'chevron-up' : 'chevron-down'} color={theme === 'light' ? '#444' : '#FFF'} size={18} /></View>
                    </View>
                </TouchableNativeFeedback>
            </View> 
      </View>
      <ScrollView contentContainerStyle={styles.Scroll}>
      {data?
                data.map((item)=>{return(
                  <Card key={item.id} stars={`${starsFormat(item.stargazers_count)}`} title={item.full_name} body={item.description} language={item.language} url = {item.html_url} show={false} forks={`${starsFormat(item.forks_count)}`} explore={false}/>
                  )
                }):<ActivityIndicator size={35}/>
              }
      </ScrollView>
  </View>
    )
  }
}

export default Repos

const styles = StyleSheet.create({
  container:{
      width:'100%',
      height:'100%',
  },
  title:{
      alignSelf:'center',
      width:'90%',
      marginTop:25,
      marginBottom:25,
  },
  dropdownBtnStyle: {
    width:'55%',
    height:50,
      backgroundColor: '#FFF',
      borderRadius: 8,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    dropdownBtnTxtStyle: {
      color: '#444',
      textAlign: 'left',
      fontFamily:'Silka-Bold',
    },
    dropdownRowTxtStyle:{
      fontFamily:'Silka-Regular',
    },
    Scroll:{
      width:'100%',
      paddingBottom:50,
      flexDirection:'column',
      justifyContent:'center',
      alignItems:'center',
    },
    flexRow:{
      flexDirection:'row',
      alignItems:'center',
      width:'100%',
    },
    dateStyle:{
      height:50,
      width:'42%',
      borderRadius:8,
      backgroundColor:'white',
      marginLeft:10,
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center',
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    containerDark:{
      width:'100%',
      height:'100%',
      backgroundColor:'black'
  },
  dropdownBtnStyleDark: {
    width:'55%',
    height:50,
      backgroundColor: '#161b21',
      borderRadius: 8,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    dateStyleDark:{
      height:50,
      width:'42%',
      borderRadius:8,
      backgroundColor:'#161b21',
      marginLeft:10,
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center',
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
})
