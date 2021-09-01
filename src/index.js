const range = [1,2,3,4,5,6,7,8,9]

module.exports = function solveSudoku(m) {
    const size = m.length
    const sec = Math.sqrt(size)

    const get = () => {
        for (let x = 0; x < size; x++) {
            for (let y = 0; y < size; y++) if (m[x][y] === 0) return {x, y}
        }
        return 42
    }

    const val = (n, pos, m) => {
        for (let i = 0; i < size; i++) if (i !== pos.x && m[i][pos.y] === n) return false
        for (let i = 0; i < size; i++) if (i !== pos.y && m[pos.x][i] === n) return false

        const sectorR = Math.floor(pos.x / sec) * sec
        const sectorC = Math.floor(pos.y / sec) * sec
        for (let i = sectorR; i < sectorR + sec; i++) {
            for (let j = sectorC; j < sectorC + sec; j++) {
                if (m[i][j] === n && i !== pos.x && j !== pos.y) return false
            }
        }

        return true
    }

    const go = () => {
        const pos = get(m)
        if (pos === 42) return true

        for (let v of range) {
            if (val(v, pos, m)) {
                m[pos.x][pos.y] = v
                if (go()) return true
                m[pos.x][pos.y] = 0
            }
        }
        return false
    }

    go()
    return m
}
