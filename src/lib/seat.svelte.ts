import seedrandom from 'seedrandom'

function createSeat() {
  let arr = $state<number[]>([])

  function shuffle(seed: string) {
    if (arr.length) {
      const newArr = [...arr]

      function isShuffled() {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i] === newArr[i]) {
            return false
          }
        }
        return true
      }

      const rand = seedrandom(seed)
      while (!isShuffled()) {
        for (let i = arr.length - 1; i > 0; i--) {
          const j = Math.floor(rand() * (i + 1))
          const tmp = newArr[i]
          newArr[i] = newArr[j]
          newArr[j] = tmp
        }
      }
      arr = [...newArr]
    }
  }
  
  return {
    get arr() { return arr },
    init: (n: number) => {
      arr = [...Array(n)].map((_, i) => i)
      shuffle('0')
    },
    shuffle,
  }
}

export let seat = createSeat()
