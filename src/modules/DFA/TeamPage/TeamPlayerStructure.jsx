

export default function PlayerDisplayStructure(data){

  if(data == null){return []}

  let final_data = data.map(item => {

    let player = {};

    player['id'] = item.id
    player['FirstName'] = item.attributes['First_Name']
    player['Last_Name'] = item.attributes['Last_Name']
    player['BirthDate'] = item.attributes['Birth_Date']
    player['Age'] = item.attributes['Age']
    player['Gender'] = item.attributes['Gender']
    player['Position'] = item.attributes['Position']
    player['Appearances'] = item.attributes['Appearances']
    player['Goals'] = item.attributes['Goals']
    player['Assists'] = item.attributes['Assists']
    player['YellowCards'] = item.attributes['Yellow_Cards']
    player['RedCards'] = item.attributes['Red_Cards']
    player['Foot'] = item.attributes['Foot']

    return player
  })
  
  return final_data
}

