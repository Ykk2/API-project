
export const normalize = (array) => {
    const normalizedObject = {}
    array.forEach(item => normalizedObject[item.id] = item)
    return normalizedObject
}
