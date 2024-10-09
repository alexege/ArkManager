import { defineStore, storeToRefs } from 'pinia'
export const useMapStore = defineStore('map', {
  state: () => ({
    maps: [
      {
        id: 1,
        name: 'map1',
        points: [
          {
            id: 1,
            name: 'point 1',
            category: 'resource',
            x: 50,
            y: 50
          },
          {
            id: 2,
            name: 'point 2',
            category: 'enemy',
            x: 20,
            y: 120
          }
        ],
        img: '/assets/maps/TheIsland.png'
      } // {
      //     id: 2,
      //     name: 'map2',
      //     points: [
      //         {
      //             name: 'point 3',
      //             category: 'resource',
      //             x: 5,
      //             y: 20
      //         },
      //         {
      //             name: 'point 4',
      //             category: 'enemy',
      //             x: 4,
      //             y: 4
      //         }
      //     ],
      //     img: '/airport_map.png'
      // }
    ],
    map: null,
    points: [
      {
        name: 'point 1',
        category: 'resource',
        x: 50,
        y: 50
      },
      {
        name: 'point 2',
        category: 'enemy',
        x: 20,
        y: 120
      }
    ],
    point: [],
    loading: false,
    error: null
  }),
  getters: {
    allMaps() {
      return this.maps
    },
    allPoints() {
      return this.points
    }
  },
  actions: {
    async createMap(map) {
      this.loading = true
      this.error = null
      try {
        //Pinia Logic
        this.maps.push(map)
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },
    async getAllMaps() {
      this.loading = true
      this.error = null
      try {
        //Pinia Logic
        return [...this.maps]
      } catch (error) {
        this.error = error
        console.error(error)
      } finally {
        this.loading = false
      }
    },
    async createPoint(mapId, x, y) {
      this.loading = true
      this.error = null
      try {
        console.log(`creating point at: ${x}, ${y}`) //Pinia Logic
        const map = this.maps.find((map) => map.id === mapId)
        if (map) {
          map.points.push({
            x,
            y
          }) // this.points.push(point)
        }
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },
    async deletePoint(mapId, pointId) {
      this.loading = true
      this.error = null
      try {
        const map = this.maps.find((map) => map.id === mapId)
        if (map) {
          const pointIndex = map.points.findIndex((point) => point.id === pointId)
          if (pointIndex !== -1) {
            map.points.splice(pointIndex, 1)
            console.log(`Deleted point: ${pointId} from map ID: ${mapId}`)
          } else {
            console.log(`Point with id ${pointId} not found in map ID: ${mapId}`)
          }
        } else {
          console.error(`Map with Id: ${mapId} not found`)
        }
      } catch (error) {
        this.error = error
        console.error(error)
      } finally {
        this.loading = false
      }
    },
    async getAllPoints() {
      this.loading = true
      this.error = null
      try {
        //Pinia Logic
        return [...this.points]
      } catch (error) {
        this.error = error
        console.error(error)
      } finally {
        this.loading = false
      }
    }
  }
})
