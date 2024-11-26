import { defineStore } from 'pinia'
import axios from 'axios'

const API_URL = 'http://127.0.0.1:8080/api'

export const useTimerStore = defineStore('timer', {
  state: () => ({
    timers: [],
    dropZones: [],
    timer: null,
    type: null,
    img: null,
    duration: 0,
    endDateTime: null,
    loading: false,
    isActive: false,
    error: null
  }),
  getters: {
    allTimers: (state) => {
      return state.timers
    },

    countDownTimers: (state) => {
      return state.timers.filter((timer) => timer.type == 'countdown')
    },

    stopwatchTimers: (state) => {
      return state.timers.filter((timer) => timer.type == 'stopwatch')
    }
  },
  actions: {
    async fetchTimers() {
      console.log('Fetching timers from store')
      this.timers = []
      this.loading = true
      try {
        this.timers = await fetch(`${API_URL}/timers`).then((response) => response.json())
        console.log('timers: ', this.timers)
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },
    // async fetchTimer(id) {
    //   this.timer = null
    //   this.loading = true
    //   try {
    //     this.timer = await fetch('').then((response) => response.json())
    //   } catch (error) {
    //     this.error = error
    //   } finally {
    //     this.loading = false
    //   }
    // },

    async addDropZone(dropZone) {
      this.dropZones.push(dropZone)
    },

    async addTimer(timer) {
      const newTimer = await axios.post(`${API_URL}/timers`, timer)
      this.timers.push(newTimer.data)

      this.addDropZone({
        id: newTimer.data._id,
        title: newTimer.data.name
      })
    },

    async updateTimer(updatedTimer) {
      try {
        await axios.put(`${API_URL}/timers/${updatedTimer._id}`, updatedTimer)

        let timerToUpdateIdx = this.timers.indexOf(
          this.timers.find((timer) => timer._id == updatedTimer._id)
        )

        let merged = {
          ...this.timers[timerToUpdateIdx],
          ...updatedTimer
        }

        this.timers[timerToUpdateIdx] = merged
      } catch (error) {
        console.log('error:', error)
      }
    },

    async deleteTimer(id) {
      try {
        await axios.delete(`${API_URL}/timers/${id}`).then(() => {
          let index = this.timers.findIndex((timer) => timer._id == id)
          this.timers.splice(index, 1)
        })
      } catch (error) {
        console.log('error:', error)
      }
    }
  }
})
