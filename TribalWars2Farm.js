// ==UserScript==
// @name        TribalWars 2 Farm
// @namespace   timovanetten@hotmail.com
// @include     https://nl.tribalwars2.com/game.php?world=nl8&character_id=174017
// @version     1
// @grant       none
// ==/UserScript==


// Dit script gaat van enkele dingen uit
// Je kan zelf bepalen hoe groot je de farms wilt hebben. Er is echter 1 voorwoorde
// Bij de naamgeving van de farm presets !!!MOET!!! er met kleine letters het woord 'farm' in zitten
// Zonder aanhalingstekens.
// Ik zelf heb het alsvolgt:
// spear farm = 40 spear.
// sword farm = 40 sword.
// bijl farm = 40 bijl.
// lc farm = 30 lc


// Deze 2 vars zijn om alles wat netter te houden:
window.socketService = window.injector.get('socketService');
window.routeProvider = window.injector.get('routeProvider');

// Dit zijn lege arrays die we later nog gaan gebruiken in functies en gevuld gaan worden met bruikbare waarden.
var barbfarm = []
var farmpresets = []
var village_lijst = []


// Dit is de function die de dorpen van de huidige speler in 1 lijst stopt voor verder gebruik
function maakVillage_lijst(){
	socketService.emit(routeProvider.CHAR_GET_INFO, {}, function(data){
		for(i=0; i < data.villages.length; i++){
				console.log(data.villages[i].name)
				console.log(data.villages[i].villageId)
				//village_lijst is de array met alle ID's van de dorpen
				village_lijst.push(data.villages[i].villageId)
		}
	});
	setTimeout(maakPresetLijst, 2000)
}






// Dit is de funcite om de farm presets op te slaan voor later gebruik
function maakPresetLijst(){
	socketService.emit(routeProvider.GET_PRESETS, {}, function(data){
		for(i=0; i < data.presets.length; i++){
			if ((data.presets[i].name).indexOf("farm") >= 0){
				console.log(data.presets[i].name)
				console.log(data.presets[i].id)
				farmpresets.push(data.presets[i].id)
			}
		}
	});
	setTimeout(maakFarmLijst, 3000)
}

// Spear farm preset id: 1192659
// Sword farm preset id: 1367804
// Met deze krijg je alle info over omliggende barbaren dorpen en worden hun IDs opgeslagen in de array barbfarm
function maakFarmLijst(){
	socketService.emit(routeProvider.MAP_GETVILLAGES, {x:411, y:543, width:25, height:25}, function(data){
		for (i=0; i < data.villages.length; i++){
			if (data.villages[i].character_name == null){
				console.log(data.villages[i])
				barbfarm.push(data.villages[i].id)
			}
		}
	});
	setTimeout(stuurFarmLijst, 4000)
}


//Dit wordt de loop die de farms vervolgens verstuurt.
function stuurFarmLijst(){
	for (i=0; i < village_lijst.length; i++){


		for (j=0; j < farmpresets.length; j++){

			for (h=0; h < barbfarm.length; h++){

			  try{
			   socketService.emit(routeProvider.SEND_PRESET,  {start_village: village_lijst[i], target_village: barbfarm[h], army_preset_id: farmpresets[j], type: 'attack'}, function(data){
			   barbfarm.splice(i, 1);
			   })
			  }
			  catch(err){
					console.log("Geen troepen meer!!!")
			    break
			  }
			}
		};
	}
}

maakVillage_lijst()
