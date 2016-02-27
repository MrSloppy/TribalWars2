window.socketService = window.injector.get('socketService');
window.routeProvider = window.injector.get('routeProvider');

var village_lijst = []
var boog = 0
var bijl = 0
var catapult = 0
var doppelsoldner = 0
var hc = 0
var paladin = 0
var lc = 0
var bredeboog = 0
var ram = 0
var edel = 0
var speer = 0
var zwaard = 0
var trebuchet = 0


function maakVillage_lijst(){
	socketService.emit(routeProvider.CHAR_GET_INFO, {}, function(data){
		for(i=0; i < data.villages.length; i++){
				console.log(data.villages[i].name)
				console.log(data.villages[i].villageId)
				//village_lijst is de array met alle ID's van de dorpen
				village_lijst.push(data.villages[i].villageId)
				village_loc_x.push(data.villages[i].x)
				village_loc_y.push(data.villages[i].y)
		}
	});
  setTimeout(tel_troepen, 4000)
}

function tel_troepen(){
  for(i=0; i < village_lijst.length; i++){

    socketService.emit(routeProvider.VILLAGE_UNIT_INFO, {village_id: village_lijst[i]}, function(data){
    console.log(data.available_units.axe.total)
      bijl += data.available_units.axe.total
      boog += data.available_units.archer.total
      catapult += data.available_units.catapult.total
      doppelsoldner += data.available_units.doppelsoldner.total
      hc += data.available_units.heavy_cavalry.total
      paladin += data.available_units.knight.total
      lc += data.available_units.light_cavalry.total
      bredeboog += data.available_units.mounted_archer.total
      ram += data.available_units.ram.total
      edel += data.available_units.snob.total
      speer += data.available_units.spear.total
      zwaard += data.available_units.sword.total
      trebuchet += data.available_units.trebuchet.total

    });

  }
  setTimeout(show_troepen, 2000)

}

function show_troepen(){
  console.log("Hierbij uw overzicht aan troepen: ")
  console.log("Toaal def: ")
  console.log("Speer: "+speer+", zwaard: "+zwaard+", boog: "+boog+", hc: "+hc+", trebuchet: "+trebuchet)
  console.log("Totaal off: ")
  console.log("Bijl: "+bijl+", lc: "+lc+", bredeboog: "+bredeboog+", ram: "+ram+", catapult: "+catapult)
  console.log("Overig:")
  console.log("Paladin: "+paladin+", edel: "+edel+", doppelsoldner: "+doppelsoldner)
}

maakVillage_lijst()
