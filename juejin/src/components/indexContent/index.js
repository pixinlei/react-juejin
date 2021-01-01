/*
* author: 皮新雷
* day: 2020-12-31
* description: index内容列表文件
*  */
import React, {useState} from 'react';
import style from './index.module.css'
import {connect} from 'react-redux'
import store from "../../store/index"

function Index() {
    // 热门，最新，热榜标题
    const [contentTitle, setContentTitle] = useState(['热门', '最新', '热榜'])
    function myContentTitle() {
        return  contentTitle.map((v,i) => {
            return (
                <div className={style.wrapper}>
                    <div key={i} className={style.contentItem}>{v}</div>
                    <div className={style.line}></div>
                </div>
            )
        })
    }

    // 列表
    const [myList, setMyList] = useState([
        {name: '掘金酱', time: '7', title: 'React优化技巧在web版光线追踪里的应用', like: '156', comment: '1'},
        {name: '掘金酱', time: '7', title: 'React优化技巧在web版光线追踪里的应用', like: '156', comment: '1'},
        {name: '掘金酱', time: '7', title: 'React优化技巧在web版光线追踪里的应用', like: '156', comment: '1'},
        {name: '掘金酱', time: '7', title: 'React优化技巧在web版光线追踪里的应用', like: '156', comment: '1'},
    ])
    // 循环渲染出来列表
    function showList() {
        return myList.map((v, i) => {
            return (
                <div className={style.items}>
                    {/*发表人， 日期*/}
                    <div className={style.showName}>
                        {v.name} · {v.time}
                    </div>
                    <div className={style.showTitle}>{v.title}</div>
                    <div className={style.showLike}>
                        <div className={style.like}>
                            <svg className="icon" aria-hidden="true">
                                <use xlinkHref="#icon-zan"></use>
                            </svg>
                            {v.like}
                        </div>
                        <div className={style.showComment}>
                            <svg className="icon" aria-hidden="true">
                                <use xlinkHref="#icon-pinglun"></use>
                            </svg>
                            {v.comment}
                        </div>
                    </div>
                </div>
            )
        })
    }
    return (
        <div className={style.page}>
            {/*内容列表部分*/}
            <div className={style.content}>
                <div className={style.contentTitle}>
                    {myContentTitle()}
                </div>
                {/*列表部分    */}
                {showList()}
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps)(Index)








