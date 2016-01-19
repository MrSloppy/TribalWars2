// In dit script gaat een poging worden gedaan tot het automatiseren van
// de bouw van dorpen.

// Net zoals bij het Farm script doen we eerste de volgende regels:
window.socketService = window.injector.get('socketService');
window.routeProvider = window.injector.get('routeProvider');

// Ook maken we alvast weer wat variabelen aan zodat we die later kunnen gebruiken
var village_lijst = []
var building_lijst = ["headquarter", "barracks", "tavern", "hospital", "preceptory",
                  "church", "chapel", "academy", "rally_point", "statue", "clay_pit"
                  , "farm", "iron_mine", "market", "timber_camp", "wall", "warehouse"]


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
}


// Hiermee wordt alles aangeroepen en gaat het feest van start
maakVillage_lijst()
