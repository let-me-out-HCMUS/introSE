export const rule = {
    club: {
        maxAge: 40,
        minAge: 16,
        maxForeigners: 3,
        maxPlayers: 25,
        minPlayers: 15,
    },

    goal: {
        quantityType: 3,
        maxTime: 96,
    },

    point: {
        win: 3,
        draw: 1,
        lose: 0,
        priority: ['points', 'goalDifference', 'totalGoals', 'headToHead'],
    }
}