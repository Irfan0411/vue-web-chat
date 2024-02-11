import { createStore } from "vuex";
import chat from "./modules/chat"
import user from "./modules/user"
const url = "http://localhost:3000/"

const store = createStore({
    modules: {
        chat,
        user
    }
})

export default store