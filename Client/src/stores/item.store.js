import { defineStore } from 'pinia'
export const useItemStore = defineStore('item', {
  state: () => ({
    items: [],
    item: null,
    artifacts: [
      {
        id: 0,
        name: 'Artifact of the Brute',
        img: '/assets/artifacts/Artifact_of_the_Brute.png',
        available: true,
        quantity: 0
      },
      {
        id: 1,
        name: 'Artifact of the Chaos',
        img: '/assets/artifacts/Artifact_of_the_Chaos.png',
        available: true,
        quantity: 0
      },
      {
        id: 2,
        name: 'Artifact of the Clever',
        img: '/assets/artifacts/Artifact_of_the_Clever.png',
        available: true,
        quantity: 0
      },
      {
        id: 3,
        name: 'Artifact of the Crag',
        img: '/assets/artifacts/Artifact_of_the_Crag.png',
        available: true,
        quantity: 0
      },
      {
        id: 4,
        name: 'Artifact of the Cunning',
        img: '/assets/artifacts/Artifact_of_the_Cunning.png',
        available: true,
        quantity: 0
      },
      {
        id: 5,
        name: 'Artifact of the Depths',
        img: '/assets/artifacts/Artifact_of_the_Depths.png',
        available: true,
        quantity: 0
      },
      {
        id: 6,
        name: 'Artifact of the Destroyer',
        img: '/assets/artifacts/Artifact_of_the_Destroyer.png',
        available: true,
        quantity: 0
      },
      {
        id: 7,
        name: 'Artifact of the Devious',
        img: '/assets/artifacts/Artifact_of_the_Devious.png',
        available: true,
        quantity: 0
      },
      {
        id: 8,
        name: 'Artifact of the Devourer',
        img: '/assets/artifacts/Artifact_of_the_Devourer.png',
        available: true,
        quantity: 0
      },
      {
        id: 9,
        name: 'Artifact of the Gatekeeper',
        img: '/assets/artifacts/Artifact_of_the_Gatekeeper.png',
        available: true,
        quantity: 0
      },
      {
        id: 10,
        name: 'Artifact of the Growth',
        img: '/assets/artifacts/Artifact_of_the_Growth.png',
        available: true,
        quantity: 0
      },
      {
        id: 11,
        name: 'Artifact of the Hunter',
        img: '/assets/artifacts/Artifact_of_the_Hunter.png',
        available: true,
        quantity: 0
      },
      {
        id: 12,
        name: 'Artifact of the Immune',
        img: '/assets/artifacts/Artifact_of_the_Immune.png',
        available: true,
        quantity: 0
      },
      {
        id: 13,
        name: 'Artifact of the Lost',
        img: '/assets/artifacts/Artifact_of_the_Lost.png',
        available: true,
        quantity: 0
      },
      {
        id: 14,
        name: 'Artifact of the Massive',
        img: '/assets/artifacts/Artifact_of_the_Massive.png',
        available: true,
        quantity: 0
      },
      {
        id: 15,
        name: 'Artifact of the Pack',
        img: '/assets/artifacts/Artifact_of_the_Pack.png',
        available: true,
        quantity: 0
      },
      {
        id: 16,
        name: 'Artifact of the Shadows',
        img: '/assets/artifacts/Artifact_of_the_Shadows.png',
        available: true,
        quantity: 0
      },
      {
        id: 17,
        name: 'Artifact of the Skylord',
        img: '/assets/artifacts/Artifact_of_the_Skylord.png',
        available: true,
        quantity: 0
      },
      {
        id: 18,
        name: 'Artifact of the Stalker',
        img: '/assets/artifacts/Artifact_of_the_Stalker.png',
        available: true,
        quantity: 0
      },
      {
        id: 19,
        name: 'Artifact of the Strong',
        img: '/assets/artifacts/Artifact_of_the_Strong.png',
        available: true,
        quantity: 0
      },
      {
        id: 20,
        name: 'Artifact of the Void',
        img: '/assets/artifacts/Artifact_of_the_Void.png',
        available: true,
        quantity: 0
      }
    ],
    trophies: [
      {
        id: 0,
        name: 'Allosaurus Brain',
        img: '/assets/trophies/Allosaurus_Brain.png',
        quantity: 0
      },
      {
        id: 1,
        name: 'Argentavis Talon',
        img: '/assets/trophies/Argentavis_Talon.png',
        quantity: 0
      },
      {
        id: 2,
        name: 'Basilosaurus Blubber',
        img: '/assets/trophies/Basilosaurus_Blubber.png',
        quantity: 0
      },
      {
        id: 3,
        name: 'Giganotosaurus Heart',
        img: '/assets/trophies/Giganotosaurus_Heart.png',
        quantity: 0
      },
      { id: 4, name: 'Megalania Toxin', img: '/assets/trophies/Megalania_Toxin.png', quantity: 0 },
      { id: 5, name: 'Megalodon Tooth', img: '/assets/trophies/Megalodon_Tooth.png', quantity: 0 },
      {
        id: 6,
        name: 'Sauropod Vertebra',
        img: '/assets/trophies/Sauropod_Vertebra.png',
        quantity: 0
      },
      {
        id: 7,
        name: 'Sarcosuchus Skin',
        img: '/assets/trophies/Sarcosuchus_Skin.png',
        quantity: 0
      },
      {
        id: 8,
        name: 'Spinosaurus Sail',
        img: '/assets/trophies/Spinosaurus_Sail.png',
        quantity: 0
      },
      { id: 9, name: 'Therizino Claws', img: '/assets/trophies/Therizino_Claws.png', quantity: 0 },
      {
        id: 10,
        name: 'Thylacoleo Hook-Claw',
        img: '/assets/trophies/Thylacoleo_Hook-Claw.png',
        quantity: 0
      },
      { id: 11, name: 'Titanoboa Venom', img: '/assets/trophies/Titanoboa_Venom.png', quantity: 0 },
      {
        id: 12,
        name: 'Tusoteuthis Tentacle',
        img: '/assets/trophies/Tusoteuthis_Tentacle.png',
        quantity: 0
      },
      {
        id: 13,
        name: 'Tyrannosaurus Arm',
        img: '/assets/trophies/Tyrannosaurus_Arm.png',
        quantity: 0
      },
      {
        id: 14,
        name: 'Yutyrannus Lungs',
        img: '/assets/trophies/Yutyrannus_Lungs.png',
        quantity: 0
      },
      {
        id: 15,
        name: 'Alpha Carnotaurus Arm',
        img: '/assets/trophies/Alpha_Carnotaurus_Arm.png',
        quantity: 0
      },
      {
        id: 16,
        name: 'Alpha Leedsichthys Blubber',
        img: '/assets/trophies/Alpha_Leedsichthys_Blubber.png',
        quantity: 0
      },
      {
        id: 17,
        name: 'Alpha Megalodon Fin',
        img: '/assets/trophies/Alpha_Megalodon_Fin.png',
        quantity: 0
      },
      {
        id: 18,
        name: 'Alpha Mosasaur Tooth',
        img: '/assets/trophies/Alpha_Mosasaur_Tooth.png',
        quantity: 0
      },
      {
        id: 19,
        name: 'Alpha Raptor Claw',
        img: '/assets/trophies/Alpha_Raptor_Claw.png',
        quantity: 0
      },
      {
        id: 20,
        name: 'Alpha Tusoteuthis Eye',
        img: '/assets/trophies/Alpha_Tusoteuthis_Eye.png',
        quantity: 0
      },
      {
        id: 21,
        name: 'Alpha Tyrannosaur Tooth',
        img: '/assets/trophies/Alpha_Tyrannosaurus_Tooth.png',
        quantity: 0
      },
      { id: 22, name: 'Fire Talon', img: '/assets/trophies/Fire_Talon.png', quantity: 0 },
      { id: 23, name: 'Lightning Talon', img: '/assets/trophies/Lightning_Talon.png', quantity: 0 },
      { id: 24, name: 'Poison Talon', img: '/assets/trophies/Poison_Talon.png', quantity: 0 },
      { id: 25, name: 'Basilisk Scale', img: '/assets/trophies/Basilisk_Scale.png', quantity: 0 },
      { id: 26, name: 'Nameless Venom', img: '/assets/trophies/Nameless_Venom.png', quantity: 0 },
      {
        id: 27,
        name: 'Reaper Pheromone Gland',
        img: '/assets/trophies/Reaper_Pheromone_Gland.png',
        quantity: 0
      },
      {
        id: 28,
        name: 'Rock Drake Feather',
        img: '/assets/trophies/Rock_Drake_Feather.png',
        quantity: 0
      },
      {
        id: 29,
        name: 'Alpha Basilisk Fang',
        img: '/assets/trophies/Alpha_Basilisk_Fang.png',
        quantity: 0
      },
      {
        id: 30,
        name: 'Alpha Karkinos Claw',
        img: '/assets/trophies/Alpha_Karkinos_Claw.png',
        quantity: 0
      },
      {
        id: 31,
        name: 'Alpha Reaper King Barb',
        img: '/assets/trophies/Alpha_Reaper_King_Barb.png',
        quantity: 0
      },
      { id: 32, name: 'Corrupt Heart', img: '/assets/trophies/Corrupt_Heart.png', quantity: 0 },
      { id: 33, name: 'Gasbags Bladder', img: '/assets/trophies/Gasbags_Bladder.png', quantity: 0 },
      {
        id: 34,
        name: 'Alpha Tyrannosaurus Tooth',
        img: '/assets/trophies/Alpha_Tyrannosaurus_Tooth.png',
        quantity: 0
      },
      {
        id: 35,
        name: 'Ice Titan Trophy',
        img: '/assets/trophies/Ice_Titan_Trophy.png',
        quantity: 0
      },
      {
        id: 36,
        name: 'Desert Titan Trophy',
        img: '/assets/trophies/Desert_Titan_Trophy.png',
        quantity: 0
      },
      {
        id: 37,
        name: 'Forest Titan Trophy',
        img: '/assets/trophies/Forest_Titan_Trophy.png',
        quantity: 0
      },
      {
        id: 38,
        name: 'King Titan Trophy (Gamma)',
        img: '/assets/trophies/King_Titan_Trophy_(Gamma).png',
        quantity: 0
      },
      {
        id: 39,
        name: 'King Titan Trophy (Beta)',
        img: '/assets/trophies/King_Titan_Trophy_(Beta).png',
        quantity: 0
      },
      {
        id: 40,
        name: 'King Titan Trophy (Alpha)',
        img: '/assets/trophies/King_Titan_Trophy_(Alpha).png',
        quantity: 0
      },
      {
        id: 41,
        name: 'Alpha X-Triceratops Skull',
        img: '/assets/trophies/Alpha_X-Triceratops_Skull.png',
        quantity: 0
      },
      {
        id: 42,
        name: 'Golden Striped Megalodon Tooth',
        img: '/assets/trophies/Golden_Striped_Megalodon_Tooth.png',
        quantity: 0
      },
      {
        id: 43,
        name: 'Reaper King Pheromone Gland',
        img: '/assets/trophies/Reaper_King_Pheromone_Gland.png',
        quantity: 0
      },
      {
        id: 44,
        name: 'Alpha Crystal Talon',
        img: '/assets/trophies/Alpha_Crystal_Talon.png',
        quantity: 0
      },
      { id: 45, name: 'Crystal Talon', img: '/assets/trophies/Crystal_Talon.png', quantity: 0 },
      { id: 46, name: 'Primal Crystal', img: '/assets/trophies/Primal_Crystal.png', quantity: 0 }
    ],
    replies: [],
    loading: false,
    error: null
  }),
  getters: {
    allItems() {
      return [...this.artifacts, ...this.trophies]
    },
    allArtifacts() {
      return this.artifacts
    },
    allTrophies() {
      return this.trophies
    }
  },
  actions: {
    // async createMessage(message) {
    //     this.loading = true
    //     this.error = null
    //     try {
    //         //Controller Logic
    //         // const response = await axios.post(`${API_URL}/messages`, message)
    //         // this.messages.push(response.data)
    //         //Pinia Logic
    //         this.messages.push(message)
    //     } catch (error) {
    //         this.error = error
    //     } finally {
    //         this.loading = false
    //     }
    // }
  }
})
