

function removeCommaFromNumbers(text: string | undefined): number {
  if (text === undefined) return 0;
  //remove as virgulas dos numeros
  return Number(text.replace(/,/g, ""));
}

function calculateSessionInHours(time: string | undefined): number {
  if (time === undefined) return 1;
  //retorna um tempo, no formato de HH:MMh em horas (number)
  const sessionParsed = time.replace("Session: ", "");
  const timeParsed = sessionParsed.replace("h", "");
  const [hours, minutes] = timeParsed.split(":");
  return Number(hours) + Number(minutes) / 60;
}

function extractDate (text: string | undefined): Date {
  if (text === undefined) return new Date();
  const date = text.replace("Session data: From ", "");
  const dateString = date.split(",")[0];
  console.log(dateString);
  if (dateString === undefined) {
    return new Date();
  } else {
    return new Date(dateString);
  }
}

export function parseIndividualAnalyzer(text: string) {

  //quebrando em linhas
  const parsedArray =  text.split("\n");
  
  //declarando o objeto
  const individualAnalyzer: Record<string, any> = {};

  //extraindo a data
  individualAnalyzer.date = extractDate(parsedArray[0]);
  
  // pegando a duracao em horas
  individualAnalyzer.duration = calculateSessionInHours(parsedArray[1]);

  individualAnalyzer.rawXpPerHour = removeCommaFromNumbers(parsedArray[4]?.replace("Raw XP/h: ", ""));
  individualAnalyzer.damagePerHour = removeCommaFromNumbers(parsedArray[10]?.replace("Damage/h: ", ""));
  individualAnalyzer.healingPerHour = removeCommaFromNumbers(parsedArray[12]?.replace("Healing/h: ", ""));

  for (let index = 6; index < 9; index++) {
      const [key, value] = parsedArray[index]?.split(': ') ?? []
      if (key && value) {
        individualAnalyzer[key.toLowerCase()] = removeCommaFromNumbers(value);
      }
  }

  //coletando os dados dos monstros
  const killedMonsters = [];
  const lootedItems = [];
  let currentItem = "";
  for(let index = 13; index < parsedArray.length; index++) {
    const item = parsedArray[index];
    if (item?.includes("Killed Monsters:")) {
      currentItem = "killedMonsters";
    } else if (item?.includes("Looted Items:")) {
      currentItem = "lootedItems";
    } else {
      const [key, value] = item?.split('x ') ?? [];
      if (key && value) {
        const itemObject = {
          amount: Number(key),
          name: value
        }

        if (currentItem === "killedMonsters") {
          killedMonsters.push(itemObject);
        } else if (currentItem === "lootedItems") {
          lootedItems.push(itemObject);
        }
      }
    }
    individualAnalyzer.killedMonsters = killedMonsters;
    individualAnalyzer.lootedItems = lootedItems;
  }
  return JSON.stringify(individualAnalyzer);
}








export function parsePartyAnalyzer(text: string) {
  const partyAnalyzer: Record<string, any> = {};
  const parsedArray = text.split("\n");

  //extract date
  partyAnalyzer.date = extractDate(parsedArray[0]);

  const duration = calculateSessionInHours(parsedArray[1]);

  //pegando os dados da sessao
  for (let index = 3; index < 6; index++) {
      const [key, item] = parsedArray[index]?.split(":") ?? [];
      if (key && item) {
        partyAnalyzer[key.toLowerCase()] = Math.round(Number(removeCommaFromNumbers(item)) / duration);
      }
  }


  //loop para pegar os players, a partir do 7
  const playersData = [];
  let player: any = {};
  for (let index = 6; index < parsedArray.length; index++) {
    if (!parsedArray[index]?.includes(":")) {
      //provavelmente e o nome de um player
      if (index > 6) {
      playersData.push(player);
      player = {};
      }
      player.name = parsedArray[index];
    } else {
      //provavelmente e uma informacao do player
      let item = parsedArray[index];
      item = item?.replace(" ", "");
      const [key, value] = item?.split(":") ?? [];
      if (key && value) {
        player[key] = Math.round(removeCommaFromNumbers(value) / duration);
      }
    }
  }
  partyAnalyzer.players = playersData;

  return JSON.stringify(partyAnalyzer);

  // return JSON.stringify(parsedArray);
}
