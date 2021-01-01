/*
* author: 皮新雷
* day: 2020-12-31
* description: index首页文件
*  */
import React, {useState} from 'react';
import style from './index.module.css'
import {connect} from 'react-redux'
import store from "../../store/index"
import IndexContent from '../indexContent/index'

import 'antd/dist/antd.css';
import { Input, Button } from 'antd';

const { Search } = Input;


const onSearch = value => console.log(value);

function Index() {
    const [indexTitle, setIndexTitle] = useState(['首页', '沸点', '小册', '活动'])
    function myTopTitles() {
        return indexTitle.map((v, i) => {
            return (
                <div key={i} className={style.topLeftCenterItem}>{v}</div>
            )
        })
    }
    const [title, setTitle] = useState(
        ['推荐', '关注', '后端', '前端', 'Android', 'iOS', '人工智能', '开发工具', '代码人生', '阅读']
    )
    // 循环遍历出各个标签类
    function items() {
        return (
            title.map((v, i) => {
                return <div key={i} className={style.items}>{v}</div>
            })
        )
    }
    return (
        <div className={style.page}>
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
                                style={{ width: 200, margin: '0 10px' }}
                            />
                        </div>
                        <div className={style.topButton}>
                            <Button type="primary">写文章</Button>
                        </div>
                        <div className={style.topIcon}>
                            <svg className="icon" aria-hidden="true">
                                <use style={{width: 200}} xlinkHref="#icon-lingdang"></use>
                            </svg>
                        </div>
                        <div className={style.picture}></div>
                    </div>
                </div>
                {/*下面的各个标签类    */}
                <div className={style.itemType}>
                    {items()}
                    <div className={style.rightTitle}>标签管理</div>
                </div>
            </div>
            <IndexContent/>
        </div>
    )
}

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps)(Index)








