export function saveMyList(values) {
    return (
        {
            type: 'SAVE_MY_LIST',
            value: values
        }
    )
}