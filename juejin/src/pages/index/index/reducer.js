/*
* author: 皮新雷
* day: 2020-12-31
* description: index的reducer文件
*  */
const defaultData={
    indexTitle: [
        {name: '首页', path: '/', active: true},
        {name: '沸点', path: '/hot', active: false},
        {name: '小册', path: '/book', active: false},
        {name: '活动', path: '/activity', active: false},
    ],
    startLogin: false,
    loginSuccess: false
}
let data = (state=defaultData,action) => {
    let newState = JSON.parse(JSON.stringify(state))
    switch (action.type) {
        case 'CHANGE_COLOR':
            newState.indexTitle.forEach((v, i) => {
                if(i === Number(action.value)) {
                    v.active = true
                } else {
                    v.active = false
                }
            })
            return newState
        case 'LOGIN':
            newState.startLogin = true
            return newState
        case 'CLOSE_PAGE':
            newState.startLogin = false
            return newState
        case 'CHANGE_LOGIN_TYPE':
            newState.loginSuccess = !newState.loginSuccess
            return newState
        default:
            return newState
    }
};
export default data
