/*
* author: 皮新雷
* day: 2020-12-31
* description: index的reducer文件
*  */

const defaultData={
    data: []
}

let data = (state=defaultData,action) => {
    let newState = JSON.parse(JSON.stringify(state))
    switch (action.type) {
        case 'SAVE_MY_LIST':
            newState.data = action.value
            return newState
    }
    return state
};
export default data
