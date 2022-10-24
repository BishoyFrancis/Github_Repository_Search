import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useFonts } from 'expo-font';
import { useEffect , useState} from 'react';
import SelectDropdown from 'react-native-select-dropdown'
import FontAwesome from 'react-native-vector-icons/FontAwesome5'
import { useSelector, useDispatch } from 'react-redux'

import Card from '../components/Card';
import { fetchAPI , starsFormat , elapsedTime} from '../helper/functions';

const Explore = () => {
     const [select , setSelect] = useState('');
     const currentDate = new Date().toISOString()
     const [data,setData]=useState([])
     const {theme} = useSelector(state=>state.theme)

     const [fontsLoaded] =  useFonts({
            'Silka-Regular': require('../assets/fonts/Silka-Regular.otf'),
            'Silka-Meduim' : require('../assets/fonts/Silka-Medium.otf'),
            'Silka-Bold':require('../assets/fonts/Silka-Bold.otf'),
          });
          const count = ['Top 10' , 'Top 50' , 'Top 100']
          const countValue = [10,50,100];
      
      const baseURL = 'https://api.github.com/search/repositories?q=stars:>0&sort=stars&order=desc&per_page='

      const fetchRepos = (base,count)=>{
        let topReposURL = `${base}${count}`
        console.log(topReposURL);
        fetch(topReposURL).then(res=>res.json()).then(json=>setData(json['items']))
      }

      useEffect(()=>{
        fetch(`${baseURL}10`).then(res=>res.json()).then(json=>setData(json['items']))
        console.log("From Explore",theme)
      },[])
  if(fontsLoaded){
    return (
      <View style={theme === 'light' ? styles.container : styles.containerDark}>
          <View style={styles.title}>
              <Text style={theme === 'light' ? {fontFamily:'Silka-Meduim',fontSize:25,marginBottom:25} : styles.textDark}>Explore popular</Text>
              <SelectDropdown
              data={count}
              defaultButtonText={<View style={{flexDirection:'row' , alignItems:'center' , justifyContent:'center'}}><Text style={theme ==='light' ? {color:'gray' , fontSize:18}:{color:'white' , fontSize:18}}>View : </Text><Text style={theme === 'light' ?{fontFamily:'Silka-Bold' , fontSize:18} : {fontFamily:'Silka-Bold' , fontSize:18 , color:'white'}}>{count[0]}</Text></View>}
              onSelect={(selectedItem, index) => {
                  console.log(selectedItem, index);
                  setSelect(selectedItem);
                  fetchRepos(baseURL,countValue[index])
                  console.log(data[0].id , data[0].name)
              }}
              dropdownIconPosition={'right'}
              buttonTextAfterSelection={(selectedItem, index) => {
                  return <View style={{flexDirection:'row' , alignItems:'center' , justifyContent:'center'}}><Text style={theme === 'light' ? {color:'gray' , fontSize:16 , fontFamily:'Silka-Regular'} : {color:'white' , fontSize:16 }}>View : </Text><Text style={theme === 'light' ? {fontFamily:'Silka-Bold' , fontSize:17} : {color:'#FFF' , fontFamily:'Silka-Bold' ,fontSize:17 }}>{selectedItem}</Text></View>
                }}
              renderDropdownIcon={isOpened => {
                  return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={theme === 'light' ? '#444' : '#FFF'} size={18} style={{marginRight:10 , marginLeft:5}}  />;
                }}
                buttonStyle={theme === 'light' ? styles.dropdownBtnStyle : styles.dropdownBtnStyleDark}
                buttonTextStyle={styles.dropdownBtnTxtStyle}
                rowTextStyle={styles.dropdownRowTxtStyle}
  
              />
          </View>
          <ScrollView contentContainerStyle={styles.Scroll}>
              {data?
                data.map((item)=>{return(
                  <Card key={item.id} stars={`${starsFormat(item.stargazers_count)}`} title={item.full_name} body={item.description} elapsed={elapsedTime(item.updated_at , currentDate)} language={item.language} url = {item.html_url} show={true} explore={true}/>
                  )
                }):<ActivityIndicator size={35}/>
              }
          </ScrollView>
      </View>
    )
  }
  
}

export default Explore

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
        backgroundColor: '#FFF',
        borderRadius: 8,
        width:175,
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
      containerDark:{
        width:'100%',
        height:'100%',
        backgroundColor:'black'
      },
      textDark:{
        color:'#FFF',
        fontFamily:'Silka-Meduim' , 
        fontSize:25 , 
        marginBottom:25
      },
      dropdownBtnStyleDark: {
        backgroundColor: '#161b21',
        borderRadius: 8,
        width:175,
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
