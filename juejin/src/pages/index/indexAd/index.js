/*
* author: 皮新雷
* day: 2020-1-2
* description: index首页右边广告文件
*  */
import React, {useState, useEffect} from 'react';
import style from './index.module.css'
import {connect} from 'react-redux'
import store from "../../../store"

function Index() {
    // 点击按钮，回到顶部
    function goTop() {
        window.scrollTo(0,0)
    }
    const [author, setAuthor] = useState([
        {
            name: '前端小菜鸟001',
            level: '2',
            photo: 'https://mirror-gold-cdn.xitu.io/168e096dd69314a54c4?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1',
            description: '\n' +
                '            公众号  前端小菜鸟001\n' +
                '          '
        },
        {
            name: '\n' +
                '      ssh_晨曦时梦见兮\n' +
                '    ',
            level: '6',
            photo: 'https://sf3-ttcdn-tos.pstatp.com/img/user-avatar/090d6608420cd5864d7564939c8f72ab~300x300.image',
            description: '\n' +
                '            公众号 | 前端从进阶到入院\n' +
                '          '
        },
        {
            name: '\n' +
                '      大帅_全能老猿\n' +
                '    ',
            level: '4',
            photo: 'https://sf3-ttcdn-tos.pstatp.com/img/user-avatar/69ae92d51d8ba6b614b5509d9e43d84b~300x300.image',
            description: '\n' +
                '            坚持原创每一篇文章 @ 花果山\n' +
                '          '
        },
    ])

    let [showButton, setShowButton] = useState(false)
    useEffect(() => {
        window.addEventListener("scroll", () => {
            if(document.documentElement.scrollTop > 400) {
                setShowButton(true)
            } else {
                setShowButton(false)
            }
        })
    }, [])

    function topAuthor() {
        return author.map((v, i) => {
            return (
                <>
                <div className={style.block}>
                    {/*左边头像*/}
                    <div className={style.photo}>
                        <img className={style.authorPhoto} src={v.photo} alt=""/>
                    </div>
                    {/*右边描述    */}
                    <div className={style.myDescription}>
                        <div className={style.titleName}>{v.name}
                            <div className={style.myLevel}>Lv: {v.level}</div>
                        </div>
                        <div className={style.titleDescription}>{v.description}</div>
                    </div>
                </div>
                    {
                        showButton ? <div className={style.goTop}>
                            <div className={style.go} onClick={goTop}>
                            </div>
                        </div>: ''
                    }
                </>
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








