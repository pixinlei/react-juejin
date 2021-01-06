/*
* author: 皮新雷
* day: 2020-12-31
* description: index首页文件
*  */
import React, {} from 'react';
import style from './index.module.css'
import {connect} from 'react-redux'
import store from "../../store/index"

function Index() {
    return (
        <div className={style.page}>
            <div className={style.block}>
                <div className={style.title}><span>用户登录 / 注册</span><span className={style.close}>X</span></div>
                <div className={style.username}>
                    <input className={style.username} style={{border:'1px solid #b2bac2', paddingLeft:'20px'}} type="text" placeholder="请输入用户名"/>
                </div>
                <div className={style.username}>
                    <input className={style.username} style={{border:'1px solid #b2bac2', paddingLeft:'20px'}} type="text" placeholder="请输入密码"/>
                </div>
                <div className={style.login}>
                    登录
                </div>
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps)(Index)








