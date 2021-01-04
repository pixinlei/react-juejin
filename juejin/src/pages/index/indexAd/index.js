/*
* author: 皮新雷
* day: 2020-1-2
* description: index首页右边广告文件
*  */
import React, {useState} from 'react';
import style from './index.module.css'
import {connect} from 'react-redux'
import store from "../../../store"

function Index() {
    const [author, setAuthor] = useState([
        {name: '华为开发者论坛', level: '3', photo: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fa2.att.hudong.com%2F27%2F81%2F01200000194677136358818023076.jpg&refer=http%3A%2F%2Fa2.att.hudong.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1612145503&t=d29424ba7267825208cf8a9f97a7f518', description: '华为软件技术有限公司'},
        {name: '华为开发者论坛', level: '3', photo: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fa2.att.hudong.com%2F27%2F81%2F01200000194677136358818023076.jpg&refer=http%3A%2F%2Fa2.att.hudong.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1612145503&t=d29424ba7267825208cf8a9f97a7f518', description: '华为软件技术有限公司'},
        {name: '华为开发者论坛', level: '3', photo: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fa2.att.hudong.com%2F27%2F81%2F01200000194677136358818023076.jpg&refer=http%3A%2F%2Fa2.att.hudong.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1612145503&t=d29424ba7267825208cf8a9f97a7f518', description: '华为软件技术有限公司'},
    ])
    function topAuthor() {
        return author.map((v, i) => {
            return (
                <div className={style.block}>
                    {/*左边头像*/}
                    <div className={style.photo}>
                        <img src={v.photo} alt=""/>
                    </div>
                    {/*右边描述    */}
                    <div className={style.myDescription}>
                        <div className={style.titleName}>{v.name} <div className={style.myLevel}>Lv: {v.level}</div></div>
                        <div className={style.titleDescription}>{v.description}</div>
                    </div>
                </div>
            )
        })
    }
    return (
        <div className={style.page}>
        {/*    下载客户端的广告*/}
        <div className={style.topAd}>
            <div className={style.ad}>
                <img src="http://sf6-scmcdn2-tos.pstatp.com/xitu_juejin_web/img/app-install.6226a3b.png" alt=""/>
            </div>
            <div className={style.adTitle}>
                <div className={style.bigTitle}>下载掘金客户端</div>
                <div className={style.smallTitle}>一个帮助开发者成长的社区</div>
            </div>
        </div>
        {/*    作者榜*/}
        <div className={style.goodAuthor}>
            <div className={style.goodAuthorTitle}>作者榜</div>
            {topAuthor()}
            {/*完整榜单    */}
            <div className={style.all}>
                完整榜单 >
            </div>
        </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps)(Index)








