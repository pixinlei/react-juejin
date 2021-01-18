export function changePage() {
    return (
        {
            type: 'CHANGE_PAGE'
        }
    )
}

export function closePage() {
    return (
        {
            type: 'CLOSE_PAGE'
        }
    )
}

export function myChangeLoginType() {
    return {
        type: 'CHANGE_LOGIN_TYPE',
    }
}
