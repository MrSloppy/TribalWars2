
Tribal Wars 2: de console

Om te beginnen moet je een browser gebruiken die gebruik van de console toelaat. Firefox kan dit sowieso en dus zal Chrome het ook wel hebben. Internet Explorer en Edge weet ik het niet van dat mag je zelf googlen.
Vervolgens log je gewoon in op Tribal Wars 2 en open je je wereld waar je de data van wilt lezen.
Nu moet je nog in de console zien te komen. Dit kan op meerdere manieren. F12 voor Firefox en Chrome, ook kan je er voor kiezen om willekeurig ergens op het scherm van Tribal Wars 2 te gaan staan en op de rechtermuisknop te drukken. Vervolgens klik je dan op "Element Inspecteren".

Begin door deze 2 commands uit te voeren:
window.socketService = window.injector.get('socketService');
window.routeProvider = window.injector.get('routeProvider');
// Dit zijn vars die we later nog gaan gebruiken
var barbfarm = []
var farmpresets = []


socketService.emit(routeProvider.GAME_DATA_*, {}, function(data){
console.log(data)
});
* = het onderwerp waar je info over wilt. Mogelijke variabele:
UNITS				# Dit geeft alle informatie weer over de beschikbare units en 					# hun gevechtswaarde en kosten etc.

COSTS_PER_COIN

GET_BASE_DATA		# Dit geeft info over de wereld settings

GET_OFFICER			# Dit geeft info weer over de stuff als Buitmeesters en Medics

GET_PREMIUM			# Dit geeft de OP premium bonussen weer die je kan krijgen 					# door je ziel te verkopen aan de duivel.

GET_RESEARCHES
GET_BUILDING			# Dit geeft info over de beschikbare gebouwen.
GET_CHARACTER_VILLAGES	# Dit geeft de dorpen van de huidige speler weer.
				# Hier kan je tevens het village_id vinden.

Dit is uiteraard lang niet alles. Je kan veel meer met deze sockets. Wanneer je bij het commado
socket.Service.emit(routeProvider.		de punt weghaalt en terug typet en even wacht. Dan verschijnt vervolgens  een hele grote lijst met alle mogelijk opties om de socket aan te roepen.
socketService.emit(routeProvider.*, {}, function(data){
console.log(data)
});
CHAR_GET_INFO			# Geeft de informatie van de huidig ingelogde speler 
CHAR_GET_PROFILE, {character_id:*}	# Geeft info over de speler met het corresponderende 						# speler ID.
TRIBE_GET_MEMBERLIST, {tribe:*}	# Dit geeft info over de members van de tribe. De * moet vervangen worden met het desbetreffende tribe_id (TE VINDEN DIE CHAR_GET_PROFILE)

BARRACKS_RECRUIT, {village_id:*, unit_type:*, amount:*}	# De unit_type moet in een 									# string dus het wordt iets als: 									# {village_id:10805, unit_type: 									# 'spear', amount:10}

VILLAGE_UNIT_INFO, {village_id:*}		# dit geeft unit info van het opgegeven dorp op. 
						# WERKT ALLEEN BIJ JE EIGEN DORPEN!!!
Martijns hoofdstad: village_id: 9585
Timo's eerste dorp: village_id: 9993
Timo's 2de dorp: village_id: 10805
Mumin;s ID: 173836
Mumin's main village ID: 9658

socketService.emit(routeProvider.SEND_CUSTOM_ARMY, {start_village: 10805, target_village:9585, type:'attack', units: ['spear'], catapult_target: 'wall', officers: ['bastard', 'leader', 'loot_master', 'medic', 'scout', 'supporter']}, function(data){
console.log(data)
});
GET_PRESETS, {}			# Dit geeft de info van je presets weer (zoals het ID en 						# ICON waarde!

SEND_PRESET, {start_village: 9993, target_village: 9585, army_preset_id:1192659, type: 'attack'}
start_village = van waaruit je aanvalt
target_village = wie je aanvalt
army_preset_id = het ID van je preset
type = 'attack' of 'defend'


# Dit geeft het dichstbijzijnde barbaarse dorp bij je in de buurt weer. Uiteraard pas je X en Y aan # naar keuze
socketService.emit(routeProvider.MAP_GET_NEAREST_BARBARIAN_VILLAGE, {x:426, y:558}, function(data){
console.log(data)
});

Dit geeft als output: Object { id: 8507, name: "Barbarendorp", x: 427, y: 559 }

Brainstorm: functie schrijven die alle barbarendorpen zoekt van x:4** tot y:5** (ofzo) en die ID's te laten opslaan. Vervolgens die ID's gebruiken in een functie waarmee ik al mijn farms verstuur.

# Hiermee kan je alle dorpen binnen een raster in een array zetten
MAP_GETVILLAGES, {x:*, y:*, width:*, height:*}	
Voorbeeld:
socketService.emit(routeProvider.MAP_GETVILLAGES, {x:426, y:558, width:10, height:10}, function(data){
console.log(data)
});

// DIT MOET DE FARM FUNCTIE KOMEN TE WORDEN

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
// Spear farm preset id: 1192659
// Sword farm preset id: 1367804
// Met deze krijg je alle info over omliggende barbaren dorpen en worden hun IDs opgeslagen in de array barbfarm 
socketService.emit(routeProvider.MAP_GETVILLAGES, {x:426, y:558, width:15, height:15}, function(data){
	for (i=0; i < data.villages.length; i++){
		if (data.villages[i].character_name == null){
			console.log(data.villages[i])
			barbfarm.push(data.villages[i].id)
		}
	}
});
//Dit wordt de loop die de farms vervolgens verstuurt.
for (i=0; i < barbfarm.length; i++){
	socketService.emit(routeProvider.SEND_PRESET,  {start_village: 9993, target_village: barbfarm[i], army_preset_id:1192659, type: 'attack'}, function(data){
	})
};


SELECT_CHARACTER, {id:*, world_id:*}		# Hiermee kan je je wereld binnentreden.

VILLAGE_UPGRADE_BUILDING,  {village_id: 9993, building: 'barracks', premium: 'no'}
# Hiermee kan je gebouwen upgraden. Parameters die nodig zijn: village_id, building en premium







// Deze functie geeft je een overview van alle units in je dorpen.
socketService.emit(routeProvider.OVERVIEW_GET_UNITS, {count: 100000, offset: 0, sorting: 'village_name', reverse: 0, groups: []}, function(data){
	 console.log(data.units)
	});

//Deze functie geeft de info over alle inkomende bevelen, zowel aanvallend ALS verdedigend
socketService.emit(routeProvider.OVERVIEW_GET_INCOMING, {count: 100000, offset: 0, sorting: 'village_name', reverse: 0, groups: [], villages: [], command_types: ["attack", "support"]}, function(data){
	 console.log(data)
	});




// Dit wordt de grote bouw functie!!
Ranglijst gebouwen:
Hout, leem, ijzer, hoofdgebouw/barracks, boederij, pakhuis

socketService.emit(routeProvider.VILLAGE_UPGRADE_BUILDING ,{village_id: village_lijst[i], building: "barracks", premium: 0}, function(data){
console.log(data)
      });
