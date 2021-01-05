/*
* author: 皮新雷
* day: 2020-12-31
* description: index首页文件
*  */
import React, {useState} from 'react';
import style from './index.module.css'
import {connect} from 'react-redux'
import IndexContent from "../indexContent";
import IndexAd from "../indexAd";
import store from "../../../store"
import homeReducer from "./reducer";
import {Link, Route} from 'react-router-dom'
import {changeColor} from './action'


function Index(props) {
    // 推荐部分
    function recommend() {
        return (
            <div style={{display: 'flex'}}>
                <IndexContent/>
                <IndexAd/>
            </div>
        )
    }
    // 未完成的
    function unfinished() {
        return (
            <div className={style.unfinished}>
                <h1>没有完成</h1>
            </div>
        )
    }
    let {title} = props
    // 循环遍历出各个标签类
    function items() {
        return (
            title.map((v, i) => {
                return <div key={i} className={v.active ? style.choose : style.items}>
                    <Link index={i} onClick={props.changeColor} className={v.active ? style.choose : style.items} to={String(v.name)}>{v.name}</Link>
                </div>
            })
        )
    }
    // 各个导航的二级路由
    function itemsRoute() {
        return (
            title.map((v, i) => {
                return (
                    <div>
                        <Route path={`/${String(v.name)}`} component={String(v.name)==='推荐' ? recommend : unfinished}></Route>
                    </div>
                )
            })
        )
    }
    return (
        <div className={style.page}>
            <div className={style.itemType}>
                {items()}
                <div className={style.rightTitle}>标签管理</div>
            </div>
            {/*{recommend()}*/}
            <Route path="/" exact component={recommend} />
            {itemsRoute()}
            {/*<Route path="/推荐" exact component={recommend} />*/}
        </div>
    )
}

function mapStateToProps(state) {
    return {
        title: state.homeReducer.title
    };
}

const dispatchToProps = (dispatch) => {
    return {
        changeColor(event) {
            dispatch(changeColor(event.currentTarget.getAttribute('index')))
        }
    }
}

export default connect(mapStateToProps, dispatchToProps)(Index)








