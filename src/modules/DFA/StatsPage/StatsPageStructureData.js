
import TeamPlayerDataStructure from '../../../modules/DFA/TeamPage/TeamPlayerStructure'


export default function StatsPageStructureData(data){
  

  if(data != null){

    let structured_data = data.map(item => {
  
      let stat = {};
  
      stat['First_Name'] = item.attributes['dfa_player'].data.attributes['First_Name'] 
     
      stat['Last_Name'] = item.attributes['dfa_player'].data.attributes['Last_Name']
  
      stat['Gender'] = item.attributes['dfa_player'].data.attributes['Gender']
  
      stat['Season'] = item.attributes['Season']
      
      stat['Matches_Played'] = item.attributes['Matches_Played']
      
      stat['Goals'] = item.attributes['Goals'] != null ? Number(item.attributes['Goals']): 0
      
      stat['Assists'] = item.attributes['Assists']
      
      stat['Yellow_Cards'] = item.attributes['Yellow_Cards']
      
      stat['Red_Cards'] = item.attributes['Red_Cards']
      
      stat['Clean_Sheets'] = item.attributes['Clean_Sheets']
  
      stat['league'] = item.attributes['all_league'].data.attributes['name']
      
      stat['team'] = item.attributes['dfa_team'].data.attributes['Name']

      stat['player_id'] = item.attributes['dfa_player'].data.id
      stat['team_id'] = item.attributes['dfa_team'].data.id
  
      return stat
    })

    return structured_data
  }

  return [] 
}




