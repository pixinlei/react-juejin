import React from 'react'
class Text extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentIndex: 0
        }
        this.setCurrentIndex = this.setCurrentIndex.bind(this)
    }
    setCurrentIndex(event) {
        this.setState({
            currentIndex: parseInt(event.currentTarget.getAttribute('index'), 10)
        })
    }
    render() {
        let categoryArr = ['产品调整', '接口流量', '负载均衡', '第三方软件调整',
            '安全加固', '性能控制', '日志查询', '业务分析'];
        let itemList = [];
        for(let i = 0; i < categoryArr.length; i++) {
            itemList.push(<li key={i}
                              className={this.state.currentIndex === i ? 'active' : ''}
                              index={i} onClick={this.setCurrentIndex}
            >{categoryArr[i]}</li>);
        }
        return <ul className="category">{itemList}</ul>
    }
}
export default Text