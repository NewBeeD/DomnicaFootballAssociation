

export default function PlayerStatsDisplayStructure(data){

  if(data != null){   
    

    let structured_data = data.map(item => {
  
      let stat = {};
  
      stat['Player_ID'] = item.attributes['dfa_player'].data.id
      stat['First_Name'] = item.attributes['dfa_player'].data.attributes['First_Name']
     
      stat['Last_Name'] = item.attributes['dfa_player'].data.attributes['Last_Name']
  
      stat['Season'] = item.attributes['Season']

      stat['Assists'] = item.attributes['Assists']
      
      stat['Goals'] = Number(item.attributes['Goals'])
          
      stat['Clean_Sheets'] = item.attributes['Clean_Sheets']
  
      stat['Foot'] = item.attributes['dfa_player'].data.attributes['Foot']
  
      stat['url'] = item.attributes['Profile_Pic'].data.attributes['formats']['medium']['url']
  
      stat['league'] = item.attributes['all_league'].data.attributes['name']
      
      stat['team'] = item.attributes['dfa_team'].data.attributes['Name']
  
      return stat
    })
  
    return structured_data
  }

  return [] 
}

