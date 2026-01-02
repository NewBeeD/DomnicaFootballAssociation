

// export default function PlayerDisplayStructure(data){


    

//   let final_data = data.map(item => {

//     let player = {};

//     player['id'] = item.id
//     player['FirstName'] = item.attributes['First_Name']
//     player['Last_Name'] = item.attributes['Last_Name']
//     player['BirthDate'] = item.attributes['Birth_Date']
//     player['Age'] = item.attributes['Age']    
//     player['Gender'] = item.attributes['Gender']
//     player['Position'] = item.attributes['Position']
//     player['Appearances'] = item.attributes['Appearances']
//     player['Goals'] = item.attributes['Goals']
//     player['Assists'] = item.attributes['Assists']
//     player['YellowCards'] = item.attributes['Yellow_Cards']
//     player['RedCards'] = item.attributes['Red_Cards']
//     player['Foot'] = item.attributes['Foot']
//     player['Current_Team'] = item.attributes['dfa_team'].data.attributes['Name']
//     player['League'] = item.attributes['all_league'].data.attributes['name']
//     player['LeagueAssociation'] = leagueNameChange(item.attributes['all_league'].data.attributes['name'])
//     player['url'] = item.attributes['Profile_Pic'].data.attributes.formats['small']['url']

//     return player
//   })
  
//   return final_data
// }


// function leagueNameChange(leagueName){

//   switch(leagueName){

//     case 'DFA_Division_One':     
//     case 'DFA_Women':
//     case 'DFA_Premier_League_Men':
//       return 'DFA';
    
//     case 'DABA_First_Division':
//     case 'DABA_Premier_League':
//     case 'DABA_Women':
//       return 'DABA';

//     case 'DAVA_MEN':
//     case 'DAVA_WOMEN':
//         return 'DAVA'
    
//     default:
//       return '';

//   }
// }




// Pre-compute league association mappings for O(1) lookup
const LEAGUE_ASSOCIATION_MAP = new Map([
  ['DFA_Division_One', 'DFA'],
  ['DFA_Women', 'DFA'],
  ['DFA_Premier_League_Men', 'DFA'],
  ['DABA_First_Division', 'DABA'],
  ['DABA_Premier_League', 'DABA'],
  ['DABA_Women', 'DABA'],
  ['DAVA_MEN', 'DAVA'],
  ['DAVA_WOMEN', 'DAVA']
]);

export default function PlayerDisplayStructure(data) {
  if (!data || !data.length) return [];
  
  const result = new Array(data.length);
  
  for (let i = 0, len = data.length; i < len; i++) {
    const item = data[i];
    const attributes = item.attributes;
    const teamData = attributes.dfa_team?.data?.attributes;
    const leagueData = attributes.all_league?.data?.attributes;
    const profilePic = attributes.Profile_Pic?.data?.attributes?.formats?.small;
    
    result[i] = {
      id: item.id,
      FirstName: attributes.First_Name,
      Last_Name: attributes.Last_Name,
      BirthDate: attributes.Birth_Date,
      Age: attributes.Age,
      Gender: attributes.Gender,
      Position: attributes.Position,
      Appearances: attributes.Appearances,
      Goals: attributes.Goals,
      Assists: attributes.Assists,
      YellowCards: attributes.Yellow_Cards,
      RedCards: attributes.Red_Cards,
      Foot: attributes.Foot,
      Current_Team: teamData?.Name || null,
      League: leagueData?.name || null,
      LeagueAssociation: leagueData?.name ? 
        LEAGUE_ASSOCIATION_MAP.get(leagueData.name) || '' : '',
      url: profilePic?.url || null
    };
  }
  
  return result;
}