export type CharacterPartyAnalyzer = {
    name: string,
    lootPerHour: number,
    suppliesPerHour: number,
    balancePerHour: number,
    damagePerHour: number,
    healingPerHour: number
};

export type PartyAnalyzer = {
    date: string,
    duration: number, //in hours
    lootPerHour: number,
    suppliesPerHour: number,
    balancePerHour: number,
    players: CharacterPartyAnalyzer[]
};

export type KilledMonster = {
    amount: number,
    name: string
}

export type LootedItem = {
    amount: number,
    name: string
}

export type IndividualAnalyzer = {
    date: string,
    rawXpPerHour: number,
    xpPerHour: number,
    lootPerHour: number,
    suppliesPerHour: number,
    balancePerHour: number,
    damagePerHour: number,
    healingPerHour: number,
    killedMonsters: KilledMonster[],
    lootedItems: LootedItem[]
};