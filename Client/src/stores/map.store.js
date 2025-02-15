import { defineStore, storeToRefs } from 'pinia'
export const useMapStore = defineStore('map', {
  state: () => ({
    maps: [
      {
        id: 1,
        name: 'map1',
        points: [],
        img: '/assets/maps/TheCenterMap.jpg'
      },
      {
        id: 2,
        name: 'map2',
        points: [],
        img: '/assets/maps/TheIsland.png'
      }
    ],
    map: null,
    categories: [
      {
        name: 'Raid-Target',
        icon: 'colorize'
      },
      {
        name: 'Turrets',
        icon: 'warning'
      },
      {
        name: 'Resource',
        icon: 'target'
      },
      {
        name: 'Obelisk',
        icon: 'radio_button_checked'
      },
      {
        name: 'Transmitter',
        icon: 'cell_tower'
      },
      {
        name: 'Death-Marker',
        icon: 'skull'
      },
      {
        name: 'Tame',
        icon: 'pets'
      },
      {
        name: 'Artifact',
        icon: 'trophy'
      },
      {
        name: 'Navigation',
        icon: 'location_on'
      },
      {
        name: 'Waypoint',
        icon: 'home_pin'
      }
    ],
    points: [],
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
    async createPoint(mapId, point) {
      this.loading = true
      this.error = null
      try {
        //Pinia Logic
        const map = this.maps.find((map) => map.id === mapId)
        if (map) {
          map.points.push(point) // this.points.push(point)
        }
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },
    async updatePoint(mapId, updatedPoint) {
      this.loading = true
      this.error = null
      try {
        console.log('this is an attempte to update the ppoint', updatedPoint) //Pinia Logic
        const map = this.maps.find((map) => map.id === mapId)
        if (map) {
          const pointIndex = map.points.findIndex((point) => point.name === updatedPoint.name) //Update this to use id when implemented
          if (pointIndex !== -1) {
            // Update the properties of the point
            map.points[pointIndex] = { ...map.points[pointIndex], ...updatedPoint }
          } else {
            console.error(`Point with id ${updatedPoint.id} not found in map ID: ${mapId}`)
          }
        } else {
          console.log(`Map with id: ${mapId} not found`)
        }
      } catch (error) {
        this.error = error
        console.error(error)
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
          const pointIndex = map.points.findIndex((point) => point.name === pointId.name) //TODO: Update to use id
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

// import { defineStore, storeToRefs } from 'pinia'
// export const useMapStore = defineStore('map', {
//   state: () => ({
//     maps: [
//       {
//         id: 1,
//         name: 'map1',
//         points: [
//           {
//             id: 1,
//             name: 'point 1',
//             category: 'resource',
//             x: 50,
//             y: 50
//           },
//           {
//             id: 2,
//             name: 'point 2',
//             category: 'enemy',
//             x: 20,
//             y: 120
//           }
//         ],
//         img: '/assets/maps/TheIsland.png'
//       } // {
//       //     id: 2,
//       //     name: 'map2',
//       //     points: [
//       //         {
//       //             name: 'point 3',
//       //             category: 'resource',
//       //             x: 5,
//       //             y: 20
//       //         },
//       //         {
//       //             name: 'point 4',
//       //             category: 'enemy',
//       //             x: 4,
//       //             y: 4
//       //         }
//       //     ],
//       //     img: '/airport_map.png'
//       // }
//     ],
//     map: null,
//     points: [
//       {
//         name: 'point 1',
//         category: 'resource',
//         x: 50,
//         y: 50
//       },
//       {
//         name: 'point 2',
//         category: 'enemy',
//         x: 20,
//         y: 120
//       }
//     ],
//     point: [],
//     loading: false,
//     error: null
//   }),
//   getters: {
//     allMaps() {
//       return this.maps
//     },
//     allPoints() {
//       return this.points
//     }
//   },
//   actions: {
//     async createMap(map) {
//       this.loading = true
//       this.error = null
//       try {
//         //Pinia Logic
//         this.maps.push(map)
//       } catch (error) {
//         this.error = error
//       } finally {
//         this.loading = false
//       }
//     },
//     async getAllMaps() {
//       this.loading = true
//       this.error = null
//       try {
//         //Pinia Logic
//         return [...this.maps]
//       } catch (error) {
//         this.error = error
//         console.error(error)
//       } finally {
//         this.loading = false
//       }
//     },
//     async createPoint(mapId, x, y) {
//       this.loading = true
//       this.error = null
//       try {
//         console.log(`creating point at: ${x}, ${y}`) //Pinia Logic
//         const map = this.maps.find((map) => map.id === mapId)
//         if (map) {
//           map.points.push({
//             x,
//             y
//           }) // this.points.push(point)
//         }
//       } catch (error) {
//         this.error = error
//       } finally {
//         this.loading = false
//       }
//     },
//     async deletePoint(mapId, pointId) {
//       this.loading = true
//       this.error = null
//       try {
//         const map = this.maps.find((map) => map.id === mapId)
//         if (map) {
//           const pointIndex = map.points.findIndex((point) => point.id === pointId)
//           if (pointIndex !== -1) {
//             map.points.splice(pointIndex, 1)
//             console.log(`Deleted point: ${pointId} from map ID: ${mapId}`)
//           } else {
//             console.log(`Point with id ${pointId} not found in map ID: ${mapId}`)
//           }
//         } else {
//           console.error(`Map with Id: ${mapId} not found`)
//         }
//       } catch (error) {
//         this.error = error
//         console.error(error)
//       } finally {
//         this.loading = false
//       }
//     },
//     async getAllPoints() {
//       this.loading = true
//       this.error = null
//       try {
//         //Pinia Logic
//         return [...this.points]
//       } catch (error) {
//         this.error = error
//         console.error(error)
//       } finally {
//         this.loading = false
//       }
//     }
//   }
// })
