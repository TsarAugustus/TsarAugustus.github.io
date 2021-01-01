export let Seeding = {
    active: false,
    name: 'Seeding',
    parentSkill: 'Farming',
    required: {
        item: { Wood: 10 }
    },
    allows: {
        Plant: {
            type: 'Cropfarming',
            required: {
                Wood: 5
            },
            return: {
                XP: 20,
                amount: 1
            }
        }
    }
}