import React, { Component } from 'react'
import { View, Image, AsyncStorage, NetInfo, StatusBar } from 'react-native'
import { inject, observer } from 'mobx-react/native'
import { Input, Button } from 'react-native-elements'
import Toast from 'react-native-easy-toast'
import SplashScreen from 'react-native-splash-screen'
import { globalStyle, baseBlueColor } from '../themes'
import { RVW } from '../utils/device'
import MD5 from '../utils/md5'
import constObj from '../store/constant'

const localStyle = {
  wrapper: {
    backgroundColor: baseBlueColor,
  },
}

// @inject('NimStore', 'LinkAction')
@observer
export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      account: '',
      password: '',
    }
  }

  componentWillMount = () => {
    AsyncStorage.getItem('account').then((account) => {
      if (account) {
        this.setState({
          account,
        })
      }
    })
    AsyncStorage.getItem('password').then((password) => {
      if (password) {
        this.setState({
          password,
        })
      }
    })
    // NetInfo.isConnected.fetch().then((isConnected) => {
    //   if (isConnected) {
    //     this.initLogin()
    //   } else {
    //     this.toast.show('网络状况不佳')
    //   }
    // })
    // // this.initLogin()
    // // 很诡异，会出现AsyncStorage不执行的情况
    // this.promiseTimer = setTimeout(() => {
    //   clearTimeout(this.promiseTimer)
    //   this.props.navigation.navigate('Login')
    // }, 2000)
  }

  componentDidMount() {
    this.timer = setTimeout(() => {
      SplashScreen.hide()
    }, 1000)
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer)
    // this.promiseTimer && clearTimeout(this.promiseTimer)
  }

  initLogin() {
    if (constObj.nim) {
      return
    }
    AsyncStorage.getItem('isLogin').then((isLogin) => {
      if (isLogin !== 'true') {
        // this.props.navigation.navigate('Login')
        return Promise.resolve()
      }
      return Promise.all([
        AsyncStorage.getItem('account'),
        AsyncStorage.getItem('password'),
      ]).then((arr) => {
        clearTimeout(this.promiseTimer)
        const [account, password] = arr
        if (!account || !password) {
          this.props.navigation.navigate('Login')
        } else {
          const token = MD5(password)
          this.props.LinkAction.login(account, token, (error) => {
            if (error) {
              // this.toast.show(util.parseDisconnectMsg(error))
              this.props.navigation.navigate('Login')
            } else {
              this.forceUpdate()
            }
          })
        }
      })
    })
  }

  setAccount = (text) => {
    this.setState({
      account: text,
    })
  }
  setToken = (text) => {
    this.setState({
      password: text,
    })
  }
  login = () => {
    NetInfo.isConnected.fetch().then((isConnected) => {
      if (isConnected) {
        this.props.navigation.navigate('Page')
        // this.doLogin()
      } else {
        this.toast.show('网络状况不佳')
      }
    })
  }
  doLogin = () => {
    if (this.props.NimStore.userID && constObj.nim) {
      this.props.navigation.navigate('Page')
      return
    }
    let {account, password} = this.state
    if (account.trim() === '' || password.trim() === '') {
      this.toast.show('请输入账号或密码')
      return
    }
    account = account.toLowerCase()
    AsyncStorage.setItem('account', account)
    AsyncStorage.setItem('password', password)
    // const token = MD5(this.state.password)
    const token = 'bcef56073caf223bd2d64061ce5433fe'

    // if (this.props.)
    this.props.LinkAction.login(account, token, (error) => {
      debugger
      if (error) {
        // if (this.toast) {
        //   this.toast.show(util.parseDisconnectMsg(error))
        // }
        this.props.navigation.navigate('Login')
      } else {
        if (this.props.navigation.state.routeName === 'Login') {
          this.props.navigation.navigate('Page')
        }
        AsyncStorage.setItem('isLogin', 'true')
      }
    })
  }

  render() {
    return (
      // View 用以适配iPhoneX
      <View style={[globalStyle.container, globalStyle.center, localStyle.wrapper]}>
        <StatusBar translucent={true} backgroundColor={'transparent'}/>
        <View style={{width: 80 * RVW}}>
          <View style={{marginVertical: 3 * RVW, flexDirection: 'row', justifyContent: 'center'}}>
            <Image style={{width: 50 * RVW, height: 20 * RVW}} source={require('../asset/images/logo.png')}/>
          </View>
          <Input
            inputContainerStyle={{width: 80 * RVW}}
            inputStyle={{color: '#fff', top: 2}}
            leftIcon={{type: 'font-awesome', name: 'user', color: '#9ac6f7'}}
            placeholder="请输入账号"
            placeholderTextColor="#e0e0e0"
            onChangeText={this.setAccount}
            value={this.state.account}
            selectionColor="#fff"
          />
          <Input
            secureTextEntry
            inputContainerStyle={{width: 80 * RVW}}
            inputStyle={{color: '#fff', top: 2}}
            leftIcon={{type: 'font-awesome', name: 'lock', color: '#9ac6f7'}}
            placeholder="请输入密码"
            placeholderTextColor="#e0e0e0"
            onChangeText={this.setToken}
            value={this.state.password}
            selectionColor="#fff"
          />
          <Button
            title="登录"
            titleStyle={{color: baseBlueColor}}
            onPress={this.login}
            buttonStyle={{
              backgroundColor: '#fff',
              marginVertical: 3 * RVW,
            }}
          />
        </View>
        <Toast ref={(ref) => {
          this.toast = ref
        }} position="bottom"/>
      </View>
    )
  }
}
