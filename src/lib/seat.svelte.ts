import seedrandom from 'seedrandom'

function createSeat() {
  let arr = $state<number[]>([])

  function load(n: number) {
    let stored: number[]
    try {
      stored = JSON.parse(localStorage.getItem('arr') || '[]')
      if (Array.isArray(stored) && stored.length === n) {
        arr = [...stored]
      } else {
        throw new Error()
      }
    } catch (e) {
      arr = [...Array(n)].map((_, i) => i)
      shuffle('0')
    }
  }

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
      localStorage.setItem('arr', JSON.stringify(arr))
    }
  }

  function reset() {
    arr = [...Array(arr.length)].map((_, i) => i)
    shuffle('0')
  }
  
  return {
    get arr() { return arr },
    load,
    shuffle,
    reset,
  }
}

export let seat = createSeat()
