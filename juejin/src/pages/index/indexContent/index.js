/*
* author: 皮新雷
* day: 2020-12-31
* description: index内容列表文件
*  */
import React, {useState, useEffect} from 'react';
import style from './index.module.css'
import {connect} from 'react-redux'
import store from "../../../store"
import axios from "axios";
import {saveMyList} from './action'
import {changePage, closePage, myChangeLoginType} from "../../../components/login/action";

function Index(props) {
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                'http://localhost:3000/list/all',
            );
            setData(result.data);
        };

        fetchData();
    }, []);


    const [data, setData] = useState({hits: []});
    // 热门，最新，热榜标题
    const [contentTitle, setContentTitle] = useState(['热门', '最新', '热榜'])

    function addLike(v, e) {
        if(!localStorage.getItem('userData')) {
            alert('请先登录')
            return
        }
        let data = []
         axios({
            method: 'post',
            url: 'http://localhost:3000/list/addLike',
            data: {
                names: v
            }
        }).then(res => {
            let data = res.data
             axios({
                 method: 'post',
                 url: 'http://localhost:3000/list/addLike2',
                 data: {
                     data: data
                 }
             }).then(res => {
                     const fetchData = async () => {
                         const result = await axios(
                             'http://localhost:3000/list/all',
                         );
                         setData(result.data);
                     };

                     fetchData();
             })
        })

    }

    function myContentTitle() {
        return contentTitle.map((v, i) => {
            return (
                <div className={style.wrapper}>
                    <div key={i} className={style.contentItem}>{v}</div>
                    <div className={style.line}></div>
                </div>
            )
        })
    }

    // 循环渲染出来列表
    function showList() {
        return (data.length ? data.map((v, i) => {
            return (
                <div key={i} className={style.items}>
                    {/*发表人， 日期*/}
                    <div className={style.showName}>
                        {v.names} · {v.time}
                    </div>
                    <div className={style.showTitle}>{v.titles}</div>
                    <div className={style.showLike}>
                        <div className={style.like} onClick={(e) => {
                            addLike(v.names, e)
                        }}>
                            <svg className="icon" aria-hidden="true">
                                <use xlinkHref="#icon-zan"></use>
                            </svg>
                            {v.likes}
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
        }) : '')
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
    return {
        data: state.indexContentReducer.data
    };
}

const dispatchToProps = (dispatch) => {
    return {
        // 保存从后端拿到的list数据
        saveList(v) {
            dispatch(saveMyList(v))
        }
    }
}

export default connect(mapStateToProps, dispatchToProps)(Index)








