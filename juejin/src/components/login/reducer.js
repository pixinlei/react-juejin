/*
* author: 皮新雷
* day: 2020-12-31
* description: index的reducer文件
*  */
const defaultData={
    turnToRegister: false,
    isLogin: false
}
let data = (state=defaultData,action) => {
    let newState = JSON.parse(JSON.stringify(state))
    switch (action.type) {
        case 'CHANGE_PAGE':
            newState.turnToRegister = !newState.turnToRegister
            return newState
        default:
            return newState
    }
};
export default data
