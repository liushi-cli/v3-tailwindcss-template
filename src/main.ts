import { createApp } from 'vue'
import './styles/index.css'
import './style.css'
import { router } from './router/index'
import stores from './stores/index'
import App from './App.vue'

createApp(App).use(router).use(stores).mount('#app')
