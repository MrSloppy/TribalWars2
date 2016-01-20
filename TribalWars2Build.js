// In dit script gaat een poging worden gedaan tot het automatiseren van
// de bouw van dorpen.

// Net zoals bij het Farm script doen we eerste de volgende regels:
window.socketService = window.injector.get('socketService');
window.routeProvider = window.injector.get('routeProvider');

// Ook maken we alvast weer wat variabelen aan zodat we die later kunnen gebruiken
var village_lijst = []
var building_lijst = ["academy", "timber_camp", "clay_pit", "iron_mine", "headquarter", "barracks",
                  "warehouse", "farm", "tavern", "hospital", "preceptory",
                  "church", "chapel", "rally_point", "statue", "market", "wall"]


// Deze functie is ongeveer hetzelfde als van de Farm functie en maakt een lijst met alle dorpen
// van de huidig ingelogde speler.
function maakVillage_lijst(){
	socketService.emit(routeProvider.CHAR_GET_INFO, {}, function(data){
		for(i=0; i < data.villages.length; i++){
				console.log(data.villages[i].name)
				console.log(data.villages[i].villageId)
				//village_lijst is de array met alle ID's van de dorpen
				village_lijst.push(data.villages[i].villageId)
		}
	});
  //Hiermee wordt de volgende functie gestart
	setTimeout(getBuilding_Levels, 2000)
}

function getBuilding_Levels(){
  for(i=0; i < village_lijst.length; i++){

    socketService.emit(routeProvider.VILLAGE_GET_VILLAGE ,{village_id: village_lijst[i]}, function(data){
        for(j = 0; j < building_lijst.length; j++){
          console.log(building_lijst[j], "is level: ", data.buildings[building_lijst[j]].level)
          console.log(data.buildings[building_lijst[j]].level)
        }
      });
  }
  setTimeout(buildBuildings, 2000)
}

function buildBuildings(){
  for(i=0; i < village_lijst.length; i++){

    socketService.emit(routeProvider.VILLAGE_GET_VILLAGE ,{village_id: village_lijst[i]}, function(data){
      console.log(data.resources)
      for(j=0; j < village_lijst.length; j++){
        if(data.resources.food < 50){
          console.log(village_lijst)
          socketService.emit(routeProvider.VILLAGE_UPGRADE_BUILDING ,{village_id: village_lijst[j], building: "farm", premium: 0}, function(data){
            console.log(data)
          });
        }
        else if(data.resources.clay > data.resources.wood){
          console.log(village_lijst)
          socketService.emit(routeProvider.VILLAGE_UPGRADE_BUILDING ,{village_id: village_lijst[j], building: "timber_camp", premium: 0}, function(data){
            console.log(data)
          });
        }
        else if(data.resources.clay < data.resources.iron){
          console.log(village_lijst)
          socketService.emit(routeProvider.VILLAGE_UPGRADE_BUILDING ,{village_id: village_lijst[j], building: "iron_mine", premium: 0}, function(data){
            console.log(data)
          });
        }
        else {
          console.log(village_lijst)
          socketService.emit(routeProvider.VILLAGE_UPGRADE_BUILDING ,{village_id: village_lijst[j], building: "iron_mine", premium: 0}, function(data){
            console.log(data)
          });
        }
      }
    });
  }
  setTimeout(buildBuildings, 10000)
}



// Hiermee wordt alles aangeroepen en gaat het feest van start
maakVillage_lijst()
