import React from 'react';
import {styles} from '../styles/styles'
import {Button} from '../customCoponent/Button'
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
  TextInput,
  Image,
} from 'react-native';
import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';

export default class SignInScreen extends React.Component {
  static navigationOptions = {
    title: 'Please sign in',
  };

  render() {
    return (

       // 尝试把`alignItems`改为`flex-start`看看. stretch
      // 尝试把`justifyContent`改为`flex-end`看看
      // 尝试把`flexDirection`改为`row`看看   // <Button title="Sign in!" onPress={this._signInAsync} />

       // <View style={{backgroundColor:'#19ac21',  height: 44, margin:20, flexDirection:'row', justifyContent: 'center',  alignItems:'center', borderRadius: 5,}}>
        //     <Button style={{ flex:1  }} color="#FFF" title="下一步" onPress = {()=>alert('text')}/>
        //  </View>

      <View style={{
        flex: 1,
        flexDirection: 'column',
        
        alignItems: 'stretch', 
        backgroundColor:"#ffffff",
      }}>
        <View style={{height: 80, marginTop: 80, alignItems: 'center', justifyContent: 'center', flexDirection:'row',}}>
            <Image  roundAsCircle={true}
             resizeMode={'stretch'} source={require('../assets/spiro.png')} style={{width:80, height:80, borderRadius: 40, }}/>
        </View>

        <View style={{marginTop: 30, height: 44, borderTopWidth:1, borderColor:'#CDCCD0',  flexDirection:'row', alignItems:'stretch'}}>
           <TextInput style={{ flex:1,  marginLeft:14, marginRight:14, color:"#333", fontSize:16, }}  placeholderTextColor="#E6" placeholder="输入手机号"  />
        </View>

        <View style={{height: 44, borderTopWidth:1, borderBottomWidth:1, borderColor:'#CDCCD0', flexDirection:'row', alignItems:'stretch',}}> 
           <TextInput style={{ flex:1,  marginLeft:14, color:"#333", fontSize:16}}  placeholderTextColor="#E6" placeholder="输入验证码"  />
           
           <View style={{backgroundColor:'#19ac21', flexDirection:'row', alignItems:'center'}}>
              <Button style={{width:120, height:50,   }} color="#FFF" title="获取验证码" onPress = {()=>alert('text')}/>
           </View>
        </View>

       

        <Button
          underlayColor={Constant.colorTxtPrimary}
          underlayTxtColor='#FFFFFF'
          txtStyle={{color: '#FFFFFF', fontSize: 18, textAlign: 'center'}}
          style={{height: 40, width: width - 80, padding: 0, backgroundColor: 'pink',borderRadius: 4, marginTop: 25}}
          onPress={() => this.loginBtnClick()}>
             登录
        </Button>
 

      </View> 
      
    );
  }

  _signInAsync = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('App');
  };
}