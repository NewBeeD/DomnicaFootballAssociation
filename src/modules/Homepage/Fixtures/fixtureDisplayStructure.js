
let draft_league = []

let league = []
let fixture_date_arr = []


export default function displayFixture(fixtures_data){

  // This for loop identifies the different leagues
  for (var item of fixtures_data){
    
    if(!league.includes(item.League)){
      league.push(item.League)
    }
  }

  // This loop seprated the fixtures by leagues
  for (var league_item of league){

    let new_league = fixtures_data.filter(item => item.League == league_item)
    draft_league.push(new_league)
  }

  // 
  for (var date_item of draft_league){

    let league_dates = []

    for (var league_date_item of date_item){

      if(!league_dates.includes(league_date_item.Date)){

          league_dates.push(league_date_item.Date)
        }   
    }

    let game_fixture_arr = date_setup(fixtures_data, league_dates)
    fixture_date_arr.push(game_fixture_arr)   
  }

      console.log(fixture_date_arr);
}

function date_setup(data_entry, date){

  let game_date = []

  for (var date_date of date){

    let new_game_date = data_entry.filter(item => item.Date == date_date)

    game_date.push(new_game_date)
  }

  return game_date


}