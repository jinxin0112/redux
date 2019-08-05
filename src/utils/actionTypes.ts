function randomString() {
    return Math.random().toString(32).substring(2,8)
}

export default {
    INIT: `@@redux${randomString()}`
}