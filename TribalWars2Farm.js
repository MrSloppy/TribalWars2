// ==UserScript==
// @name        TribalWars 2 Farm
// @namespace   timovanetten@hotmail.com
// @include     https://nl.tribalwars2.com/game.php?world=nl8&character_id=174017
// @version     1
// @grant       none
// ==/UserScript==

window.socketService = window.injector.get('socketService');
window.routeProvider = window.injector.get('routeProvider');
// Dit zijn vars die we later nog gaan gebruiken
var barbfarm = []
var farmpresets = []

window.setTimeout(3000)

// Dit is de funcite om de farm presets op te slaan voor later gebruik
socketService.emit(routeProvider.GET_PRESETS, {}, function(data){
	for(i=0; i < data.presets.length; i++){
		if ((data.presets[i].name).indexOf("farm") >= 0){
			console.log(data.presets[i].name)
			console.log(data.presets[i].id)
			farmpresets.push(data.presets[i].id)
		}
	}
});

window.setTimeout(3000)

// Spear farm preset id: 1192659
// Sword farm preset id: 1367804
// Met deze krijg je alle info over omliggende barbaren dorpen en worden hun IDs opgeslagen in de array barbfarm
socketService.emit(routeProvider.MAP_GETVILLAGES, {x:411, y:543, width:25, height:25}, function(data){
	for (i=0; i < data.villages.length; i++){
		if (data.villages[i].character_name == null){
			console.log(data.villages[i])
			barbfarm.push(data.villages[i].id)
		}
	}
});

window.setTimeout(3000)

//Dit wordt de loop die de farms vervolgens verstuurt.
for (i=0; i < barbfarm.length; i++){
  try{
   socketService.emit(routeProvider.SEND_PRESET,  {start_village: 9993, target_village: barbfarm[i], army_preset_id: farmpresets[0], type: 'attack'}, function(data){
   delete barbfarm[i];
   })
  }
  catch(){
		console.log("Geen troepen meer!!!")
    break
  }
};

window.setTimeout(3000)

for (i=0; i < barbfarm.length; i++){
  try{
   socketService.emit(routeProvider.SEND_PRESET,  {start_village: 9993, target_village: barbfarm[i], army_preset_id: farmpresets[1], type: 'attack'}, function(data){
   delete barbfarm[i];
   })
  }
  catch(){
		console.log("Geen troepen meer!!!")
    break
  }
};

for (i=0; i < barbfarm.length; i++){
  try{
   socketService.emit(routeProvider.SEND_PRESET,  {start_village: 10805, target_village: barbfarm[i], army_preset_id: farmpresets[0], type: 'attack'}, function(data){
   delete barbfarm[i];
   })
  }
  catch(err){
		console.log("Geen troepen meer!!!")
    break
  }
};

window.setTimeout(3000)

for (i=0; i < barbfarm.length; i++){
  try{
   socketService.emit(routeProvider.SEND_PRESET,  {start_village: 10805, target_village: barbfarm[i], army_preset_id: farmpresets[1], type: 'attack'}, function(data){
   delete barbfarm[i];
   })
  }
  catch(err){
		console.log("Geen troepen meer!!!")
    break
  }
};
