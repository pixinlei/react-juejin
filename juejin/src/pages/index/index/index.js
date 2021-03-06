/*
* author: 皮新雷
* day: 2020-12-31
* description: index首页文件
*  */
import React, {useState, useEffect} from 'react';
import style from './index.module.css'
import {connect} from 'react-redux'
import store from "../../../store"
import IndexContent from '../indexContent'
import IndexAd from '../indexAd'
import IndexHome from '../home/index'
import {BrowserRouter, Route, Link, useLocation} from 'react-router-dom'
import {changeColor, login} from './action'
import Login from '../../../components/login/index'

import 'antd/dist/antd.css';
import { Input, Button } from 'antd';
import indexReducer from "./reducer";
import axios from "axios";

const { Search } = Input;


const onSearch = value => console.log(value);

function Index(props) {
    let location = useLocation()

    let {indexTitle, startLogin, loginSuccess} = props
    useEffect(async () => {
        let githubCode = location.search.slice(6)
        githubCode = githubCode.slice(0,20)
        console.log(githubCode)
        axios({
            method: 'post',
            url:'http://localhost:3000/list/git',
            data: {
                code: githubCode
            }
        }).then(res => {
            console.log(res)
        })
        if(localStorage.getItem("userData")) {
            if(loginSuccess === false) {
                props.changeLoginType()
            }
        }
    }, [])

    // 退出登录
    function loginOut() {
        if (loginSuccess === true) {
            props.changeLoginType()
            localStorage.removeItem('userData')
        }
    }
    function myTopTitles() {
        function changeColor(event) {
            indexTitle[event.currentTarget.getAttribute('index')].active = true
        }
        return indexTitle.map((v, i) => {
            return (
                <div key={i} className={style.topLeftCenterItem}>
                    <BrowserRouter>
                        <Link index={i} onClick={props.changeColor} className={v.active ? style.link: style.noLink} to={v.path}>{v.name}</Link>
                    </BrowserRouter>
                </div>
            )
        })
    }
    return (
        <div className={style.page}>
            {/*登录*/}
            {
                startLogin ? <Login/>: ''
            }
            {/*    头部部分*/}
            <div className={style.head}>
                {/*顶部几大类和搜索框*/}
                <div className={style.top}>
                    {/*左边部分*/}
                    <div className={style.topLeft}>
                        <div className={style.topLeftTitle}>掘金</div>
                        <div className={style.topLeftCenter}>
                            {myTopTitles()}
                        </div>
                    </div>
                    {/*右边部分    */}
                    <div className={style.topRight}>
                        <div className={style.topInput}>
                            <Search
                                placeholder="搜索掘金"
                                allowClear
                                onSearch={onSearch}
                                style={{ width: 200, margin: '0 10px',background:'white' }}
                            />
                        </div>
                        <div className={style.topButton}>
                            {/*<Button type="primary">写文章</Button>*/}
                            <button>写文章</button>
                        </div>
                        <div className={style.topIcon}>
                            <svg className={style.icon} aria-hidden="true">
                                <use style={{width: 200,background: 'white'}} xlinkHref="#icon-lingdang"></use>
                            </svg>
                        </div>
                        <div className={style.picture}>
                            {
                                loginSuccess ? <img onClick={loginOut} className={style.img} src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=249739279,931492192&fm=26&gp=0.jpg" alt=""/> : <div className={style.login} onClick={props.login}>登录</div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            {/*<IndexHome/>*/}
            <Route path="/" component={IndexHome} />
        </div>
    )
}

function mapStateToProps(state) {
    return {
        indexTitle: state.indexReducer.indexTitle,
        startLogin: state.indexReducer.startLogin,
        loginSuccess: state.indexReducer.loginSuccess
    };
}

const dispatchToProps = (dispatch) => {
    return {
        changeColor(event) {
            dispatch(changeColor(event.currentTarget.getAttribute('index')))
        },
        login() {
            dispatch(login())
        },
        changeLoginType() {
            dispatch({
                type: 'CHANGE_LOGIN_TYPE',
            })
        }
    }
}

export default connect(mapStateToProps, dispatchToProps)(Index)








