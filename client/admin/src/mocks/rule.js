export const rule = {
    club: {
        minAge: 16,
        maxAge: 40,
        maxForeigners: 3,
        minPlayers: 15,
        maxPlayers: 25,
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