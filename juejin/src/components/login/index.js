/*
* author: 皮新雷
* day: 2020-12-31
* description: index首页文件
*  */
import React, {useState} from 'react';
import style from './index.module.css'
import {connect} from 'react-redux'
import store from "../../store/index"
import {changePage, closePage, myChangeLoginType} from './action'
import axios from 'axios'

import 'antd/dist/antd.css';
import {Button, notification} from 'antd';

const openNotification = () => {
    notification.open({
        duration: 1,
        message: '',
        description:
            '请输入用户名或密码',
        className: 'custom-class',
        style: {
            background: 'rgb(231,243,255)',
            width: '200px',
            color: 'rgb(8,130,254)',
        },
    });
};
const openNotificationRegisterSuccess = () => {
    notification.open({
        duration: 1,
        message: '',
        description:
            '注册成功',
        className: 'custom-class',
        style: {
            background: 'rgb(231,243,255)',
            width: '200px',
            color: 'rgb(8,130,254)',
        },
    });
};
const openNotificationRegisterHas = () => {
    notification.open({
        duration: 1,
        message: '',
        description:
            '用户名已存在',
        className: 'custom-class',
        style: {
            background: 'rgb(231,243,255)',
            width: '200px',
            color: 'rgb(8,130,254)',
        },
    });
};
const openNotificationLoginSuccess = () => {
    notification.open({
        duration: 1,
        message: '',
        description:
            '登录成功',
        className: 'custom-class',
        style: {
            background: 'rgb(231,243,255)',
            width: '200px',
            color: 'rgb(8,130,254)',
        },
    });
};
const openNotificationLoginFail = () => {
    notification.open({
        duration: 1,
        message: '',
        description:
            '用户名或密码错误',
        className: 'custom-class',
        style: {
            background: 'rgb(231,243,255)',
            width: '200px',
            color: 'rgb(8,130,254)',
        },
    });
};

function Index(props) {
    let {turnToRegister, isLogin, startLogin} = props
    // 用户名
    let [username, SetUsername] = useState('')
    let [password, SetPassword] = useState('')

    // 注册界面的用户名与密码
    let [registerUsername, SetRegisterUsername] = useState('')
    let [registerPassword, SetRegisterPassword] = useState('')

    // 获取用户名
    function getUsername(e) {
        SetUsername(e.target.value)
    }

    // 获取密码
    function getPassword(e) {
        SetPassword(e.target.value)
    }

    // 获取注册界面用户名
    function getRegisterUsername(e) {
        SetRegisterUsername(e.target.value)
    }

    // 获取注册界面密码
    function getRegisterPassword(e) {
        SetRegisterPassword(e.target.value)
    }

    // 登录
    function login() {
        if (username.trim() === '' || password.trim() === '') {
            openNotification()
            return
        }
        axios({
            method: 'post',
            url: 'http://localhost:3000/users/userLogin',
            data: {
                username: username.trim(),
                userpwd: password.trim()
            }
        }).then(res => {
            if (res.data.code === '80003') {
                openNotificationLoginFail()
                return
            }
            if (res.data.code === '80000') {
                props.changeLoginType()
                localStorage.setItem('userData', JSON.stringify(password.trim()));
                openNotificationLoginSuccess()
                props.closePage()
                return
            }
        })
    }

    // 注册
    function register() {
        if (registerUsername.trim() === '' || registerPassword.trim() === '') {
            openNotification()
            return
        }
        axios({
            method: 'post',
            url: 'http://localhost:3000/users/userRegister',
            data: {
                username: registerUsername.trim(),
                userpwd: registerPassword.trim()
            }
        }).then(res => {
            console.log(res)
            if (res.data.code === '80003') {
                openNotificationRegisterHas()
                return
            }
            if (res.data.code === '80000') {
                openNotificationRegisterSuccess()
                props.closePage()
                return
            }
        })

    }

    // 登录页面
    function loginPage() {
        return (
            <div className={style.block}>
                <div className={style.title}><span>用户登录</span><span onClick={props.closePage}
                                                                    className={style.close}>X</span></div>
                <div className={style.username}>
                    <input onChange={getUsername} className={style.username}
                           style={{border: '1px solid #b2bac2', paddingLeft: '20px'}} type="text" placeholder="请输入用户名"/>
                </div>
                <div className={style.username}>
                    <input onChange={getPassword} className={style.username}
                           style={{border: '1px solid #b2bac2', paddingLeft: '20px'}} type="text" placeholder="请输入密码"/>
                </div>
                <div className={style.login} onClick={login}>
                    登录
                </div>
                <div className={style.otherWay}>
                    <span><a href="https://github.com/login/oauth/authorize?client_id=f14ea1d104eaa5638be8
&state=STATE&redirect_uri=http://localhost:3001/;">github登录</a></span>
                    <span onClick={() => {
                        props.changePage();
                    }}>注册</span>
                </div>
            </div>
        )
    }

    // 关闭页面传值
    function myClosePage() {
        return !startLogin
    }

    // 注册界面
    function registerPage() {
        return (
            <div className={style.block}>
                <div className={style.title}><span>用户注册</span><span onClick={props.closePage}
                                                                    className={style.close}>X</span></div>
                <div className={style.username}>
                    <input onChange={getRegisterUsername} className={style.username}
                           style={{border: '1px solid #b2bac2', paddingLeft: '20px'}} type="text" placeholder="请输入用户名"/>
                </div>
                <div className={style.username}>
                    <input onChange={getRegisterPassword} className={style.username}
                           style={{border: '1px solid #b2bac2', paddingLeft: '20px'}} type="text" placeholder="请输入密码"/>
                </div>
                <div className={style.login} onClick={register}>
                    注册
                </div>
                <div className={style.otherWay}>
                    <span>其他登录方式</span>
                    <span onClick={() => {
                        props.changePage();
                    }}>返回登录</span>
                </div>
            </div>
        )
    }

    return (
        <div className={style.page}>
            {turnToRegister ? registerPage() : loginPage()}
        </div>
    )
}

function mapStateToProps(state) {
    return {
        turnToRegister: state.loginReducer.turnToRegister,
        isLogin: state.loginReducer.isLogin,
        startLogin: state.indexReducer.startLogin,
        loginSuccess: state.indexReducer.loginSuccess
    };
}

const dispatchToProps = (dispatch) => {
    return {
        // 前往另一个界面
        changePage() {
            dispatch(changePage())
        },
        // 关闭登录注册
        closePage() {
            dispatch(closePage())
        },
        // 改变登录状态
        changeLoginType() {
            dispatch(myChangeLoginType())
        }
    }
}

export default connect(mapStateToProps, dispatchToProps)(Index)








