function removeCommaFromNumbers(text: string | undefined): number {
  if (text === undefined) return 0;
  //remove as virgulas dos numeros
  return Number(text.replace(/,/g, ""));
}

function calculateSessionInHours(time: string | undefined): number {
  if (time === undefined) return 0;
  //retorna um tempo, no formato de HH:MMh em horas (number)
  const sessionParsed = time.replace("Session: ", "");
  const timeParsed = sessionParsed.replace("h", "");
  const [hours, minutes] = timeParsed.split(":");
  return Number(hours) + Number(minutes) / 60;
}

function extractDate(text: string | undefined): Date {
  if (text === undefined) return new Date();
  const date = text.replace("Session data: From ", "");
  const dateString = date.split(",")[0];
  if (dateString === undefined) {
    return new Date();
  } else {
    return new Date(dateString);
  }
}

export function parseIndividualAnalyzer(text: string) {
  //parsing the string into an array
  const parsedArray = text ? text.split("\n") : [];

  // Initialize object with defaults
  const individualAnalyzer: Record<string, any> = {
    date: null,
    duration: null,
    rawXpPerHour: null,
    damagePerHour: null,
    healingPerHour: null,
    killedMonsters: [],
    lootedItems: [],
  };

  //verify if the data is valid
  if (
    parsedArray[0]?.includes("Session data") === false ||
    parsedArray[1]?.includes("Session") === false ||
    parsedArray[2]?.includes("Raw XP Gain") === false ||
    parsedArray[9]?.includes("Damage") === false ||
    parsedArray[11]?.includes("Healing") === false
  ) {
    //TODO insert an error message to the user
    return individualAnalyzer;
  }

  //extracting the date
  if (parsedArray[0]) {
    individualAnalyzer.date = extractDate(parsedArray[0]);
  }

  //extracting duration
  if (parsedArray[1]) {
    individualAnalyzer.duration = calculateSessionInHours(parsedArray[1]);
  }

  //setting duration to be used later
  const duration = individualAnalyzer.duration
    ? individualAnalyzer.duration
    : 1;

  //extracting numeric stats
  if (parsedArray[2]) {
    individualAnalyzer.rawXpPerHour = Math.round(
      removeCommaFromNumbers(parsedArray[2].replace("Raw XP Gain: ", "")) /
        duration
    );
  }

  if (parsedArray[9]) {
    individualAnalyzer.damagePerHour = Math.round(
      removeCommaFromNumbers(parsedArray[9].replace("Damage: ", "")) / duration
    );
  }

  if (parsedArray[11]) {
    individualAnalyzer.healingPerHour = Math.round(
      removeCommaFromNumbers(parsedArray[11].replace("Healing: ", "")) /
        duration
    );
  }

  //extract more numeric data
  for (let index = 6; index < 9; index++) {
    const line = parsedArray[index] ?? "";
    const [key, value] = line.split(": ") ?? [];
    if (key && value) {
      individualAnalyzer[key.toLowerCase()] = removeCommaFromNumbers(value);
    }
  }

  //extract monsters and loot
  let currentItem = "";
  for (let index = 13; index < parsedArray.length; index++) {
    const item = parsedArray[index] ?? "";
    if (item.includes("Killed Monsters:")) {
      currentItem = "killedMonsters";
    } else if (item.includes("Looted Items:")) {
      currentItem = "lootedItems";
    } else {
      const [amountString, name] = item.split("x ") ?? [];
      const amount = Number(amountString);
      if (amount && name) {
        const itemObject = {
          amount,
          name,
        };
        if (currentItem === "killedMonsters") {
          individualAnalyzer.killedMonsters.push(itemObject);
        } else if (currentItem === "lootedItems") {
          individualAnalyzer.lootedItems.push(itemObject);
        }
      }
    }
  }
  return individualAnalyzer;
}

export function parsePartyAnalyzer(text: string) {
  //parsing the string into an array
  const parsedArray = text ? text.split("\n") : [];

  // Initialize object with defaults
  const partyAnalyzer: Record<string, any> = {
    date: null,
    duration: null,
    lootPerHour: null,
    suppliesPerHour: null,
    balancePerHour: null,
    players: [],
  };

  //verify if the data is valid
  if (
    parsedArray[0]?.includes("Session data") === false ||
    parsedArray[1]?.includes("Session") === false ||
    parsedArray[2]?.includes("Loot Type") === false ||
    parsedArray[3]?.includes("Loot") === false ||
    parsedArray[4]?.includes("Supplies") === false ||
    parsedArray[5]?.includes("Balance") === false
  ) {
    //TODO insert an error message to the user
    return partyAnalyzer;
  }

  //extract date
  if (parsedArray[0]) {
    partyAnalyzer.date = extractDate(parsedArray[0]);
  }

  //extract duration
  if (parsedArray[1]) {
    partyAnalyzer.duration = calculateSessionInHours(parsedArray[1]);
  }

  //setting duration to be used later
  const duration = partyAnalyzer.duration ? partyAnalyzer.duration : 1;

  //extract numeric stats
  for (let index = 3; index < 6; index++) {
    const line = parsedArray[index] ?? "";
    const [key, item] = line.split(":") ?? [];
    if (key && item) {
      partyAnalyzer[key.toLowerCase()] = Math.round(
        Number(removeCommaFromNumbers(item)) / duration
      );
    }
  }

  //extract players data
  const playersData = [];
  let player: any = {};
  for (let index = 6; index <= parsedArray.length; index++) {
    if (index === parsedArray.length) {
      //the last iteration, so push the player object and finish the loop
      playersData.push(player);
      break;
    }

    //getting the array element. In the last iteration, it will be undefined
    let item = parsedArray[index] ?? "";

    if (!item.includes(":")) {
      //the string doesn't include : , therefore it is a player's name

      //the player object is already created, so we can push it to the array and reset it
      playersData.push(player);
      player = {};

      //setting the player's name and start creating a new player object
      let playerName = item.trim().replace(" (Leader)", "");
      player.name = playerName;
    } else {
      // the string includes :, therefore it is a player's information
      let [key, value] = item.split(":");
      if (key && value) {
        //create a property in the player object at the set the value from the current item
        player[key] = Math.round(removeCommaFromNumbers(value) / duration);
      }
    }
  }
  partyAnalyzer.players = playersData;

  return partyAnalyzer;

  // return JSON.stringify(parsedArray);
}
