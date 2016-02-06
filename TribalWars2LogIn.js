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
var wereld_ID = 0
var speler_id = 0

// Dit is de functie om in te loggen
function auto_login(){

  username = prompt("Please put in your username")
  password = prompt("Please type your password")
  world = prompt("Which world do you want to log in too? (caps sensitive!)")

  socketService.emit(routeProvider.LOGIN, {name: username, pass: password}, function(data){
    console.log(data)
    var speler_id = data.player_id
  });

  socketService.emit(routeProvider.WORLD_GET_FOR_PLAYER, {}, function(data){
    for(i=0; i < data.characters.length; i++){
      if (world == data.characters[i].world_name){
        console.log(data.characters[i].world_name)
        console.log(data.characters[i].world_id)
        var wereld_ID = data.characters[i].world_id
      }
    }

    });

  socketService.emit(routeProvider.SELECT_CHARACTER, {id: speler_id, world_id: wereld_ID, ref_param: 0}, function(data){
    console.log(data)
  });


}
