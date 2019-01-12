import React from 'react';
import CustomButton from '../customCoponent/CustomButton'
import Storage from 'react-native-storage';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
  Button,
  TextInput,
  Image,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';

const LoginUrl = "http://10.68.100.155:8080/user/loginUser";

export default class SignInScreen extends React.Component {
  static navigationOptions = {
    title: 'Please sign in',
  };

  phoneNo = '';
  validationCode = '';

  onPhoneNoChanged = (phoneNo) => {
   // console.log(phoneNo);//运行后可以在输入框随意输入内容并且查看log验证！
    console.log('phoneNo = ' + phoneNo);
    this.phoneNo = phoneNo;
  };

  onValidationCodeChanged = (validationCode) => {
    //console.log(validationCode);//运行后可以在输入框随意输入内容并且查看log验证！
    this.validationCode = validationCode;
  };

  /**  <TouchableOpacity
          onPress={()=>this.requestValidateCodeBtnClick()}
          style={styles.button}>
          <Text
            style={styles.btText}>注册</Text>
          </TouchableOpacity>*/

          


  render() {
    return ( 
       
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
           <TextInput 
              onChangeText={this.onPhoneNoChanged}
              style={{ flex:1,  marginLeft:14, marginRight:14, color:"#333", fontSize:16, }}  
              placeholderTextColor="#E6" 
               
              placeholder="输入手机号"  />
        </View>

        <View style={{height: 44, borderTopWidth:1, borderBottomWidth:1, borderColor:'#CDCCD0', flexDirection:'row', alignItems:'stretch',}}> 
           <TextInput 
              onChangeText={this.onValidationCodeChanged}
              style={{ flex:1,  marginLeft:14, color:"#333", fontSize:16}}  
              placeholderTextColor="#E6" 

              placeholder="输入验证码"  /> 

          <View style={{borderLeftWidth:1, width:120,   borderColor:'#CDCCD0', justifyContent: 'center', flexDirection:'row', alignItems:'stretch'}}>
             
               <CustomButton
                underlayColor='#FFFFFF'
                underlayTxtColor='#333'
                txtStyle={{color: '#333', fontSize: 18, textAlign: 'center'}}
                style={{ flex:1, backgroundColor: '#fff', }}
                onPress={() => this.requestValidateCodeBtnClick()}>
                  获取验证码
              </CustomButton> 
           </View> 
        </View>

        
        <View style={{marginTop: 30, marginLeft:30, marginRight:30, height: 44, justifyContent: 'center', flexDirection:'row', alignItems:'stretch'}}>
          <CustomButton
          underlayColor='#aa0022'
          underlayTxtColor='#FFFFFF'
          txtStyle={{color: '#FFFFFF', fontSize: 18, textAlign: 'center'}}
          style={{ flex:1, backgroundColor: 'pink',borderRadius: 4, }}
          onPress={() => this.loginBtnClick()}
          >
             登录
        </CustomButton>
        </View> 
      </View> 
      
    );
  }
  

  loginBtnClick(){
    //  alert("phoneNo = "+ this.phoneNo + " code = " + this.validationCode);
       //AsyncStorage.setItem('userToken', 'abc');
       //this.props.navigation.navigate('App');
//[{"key":"Content-Type","value":"application/json","description":"","type":"text","enabled":true}]
/* headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },*/
 
      
      // let params = {"account":this.phoneNo ,"pwd":this.validationCode};  
      // alert(JSON.stringify(params));
      let params = "account="+ this.phoneNo + "&pwd=" + this.validationCode;
      fetch(LoginUrl,
       {
          method: "POST",
           headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: params
       })
        .then(response => response.json())
        .then(responseJson => {
           // alert("json="+responseJson.msg + " == state = "+ responseJson.state + " user=> " + responseJson.user);
             
            var state = responseJson.state
            switch(state){
              case 200:{
                  AsyncStorage.setItem('userToken', 'abc');
                  AsyncStorage.setItem('user', JSON.stringify(responseJson.user));
                  this.props.navigation.navigate('App');
                break;
              };
              case 500:{ 

                  Alert.alert('提示',responseJson.msg,
                    [
                        {text: '确定', onPress: () => console.log('OK Pressed!')},

                        {text: '取消', onPress: () => console.log('OK cancel!')},
                    ])
                break;
              };
              default:{
                alert("登录出错");
              };
            }

        })
        .catch(error => {
          console.error(error);
        });

  }

  requestValidateCodeBtnClick(){
    alert('requestValidateCodeBtnClick');
  }

  _signInAsync = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('App');
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  img: {
    width: 30,
    height: 30,
  },
  input: {
    width: 200,
    height: 40,
    color: '#fff',//输入框输入的文本为白色
  },
  inputBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 280,
    height: 50,
    borderRadius: 8,
    backgroundColor: '#66f',
    marginBottom: 8,
  },
  button: {
    height: 50,
    width: 280,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#66f',    
    marginBottom: 8,
  },
  btText: {
    color: '#fff',
  }
});
 

