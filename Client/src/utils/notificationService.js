import { reactive, ref } from 'vue'
const notifications = reactive([])
const addNotification = (message, type = 'info') => {
  notifications.push({ message, type, id: Date.now() })
}
const removeNotification = (id) => {
  const index = notifications.findIndex((notification) => notification.id === id)
  if (index !== -1) {
    notifications.splice(index, 1)
  }
}
export default {
  notifications,
  addNotification,
  removeNotification
}
