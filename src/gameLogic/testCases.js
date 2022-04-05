var tests = [
    { cards: [], place: '', desc: "random cards" },
    { cards: ['C14', 'H3', 'S2', 'C4'], desc: "straight" },
    { cards: ["H6", "H4", "H5", "H7"], desc: "straight flush" },
    { cards: ["D9", "D10", "D8", "D13"], desc: "3" },
    { cards: ['H14', 'H13', 'H12', 'S14'], desc: "2x Short Royal" },
    { cards: ['H14', 'H13', 'H12', 'S11'], desc: "4" },

]
export { tests as default }