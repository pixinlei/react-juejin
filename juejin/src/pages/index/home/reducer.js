/*
* author: 皮新雷
* day: 2020-12-31
* description: index的reducer文件
*  */
const defaultData={
    title: [
        {name: '推荐', active: true},
        {name: '关注', active: false},
        {name: '后端', active: false},
        {name: '前端', active: false},
        {name: 'Android', active: false},
        {name: 'iOS', active: false},
        {name: '人工智能', active: false},
        {name: '开发工具', active: false},
        {name: '代码人生', active: false},
        {name: '阅读', active: false},
    ]
}
let data = (state=defaultData,action) => {
    let newState = JSON.parse(JSON.stringify(state))
    switch (action.type) {
        case 'CHANGE_COLOR':
            newState.title.forEach((v, i) => {
                if(i === Number(action.value)) {
                    v.active = true
                } else {
                    v.active = false
                }
            })
            return newState
        default:
            return newState
    }
};
export default data
