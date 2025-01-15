
// import TeamPlayerDataStructure from '../TeamPage/TeamPlayerStructure'


export default function TeamGoalsAssists(data){

  // console.log(data[0].attributes['Team_Crest'].data.attributes.url);

  let prem_team = [];

  data.forEach(element => {
    // Check if element and its attributes exist
    if (element && element.attributes && element.attributes['dfa_league'] && element.attributes['dfa_league'].data && element.attributes['dfa_league'].data.attributes && element.attributes['dfa_league'].data.attributes.Name === 'DFA_Premier_League_Men') {
      let data_point = {};

      // Check if Name and Team_Crest properties exist
      if (element.attributes['Name'] && element.attributes['Team_Crest'] && element.attributes['Team_Crest'].data && element.attributes['Team_Crest'].data.attributes) {
        data_point['Name'] = element.attributes['Name'];
        data_point['team_crest_url'] = element.attributes['Team_Crest'].data.attributes.url;
        prem_team.push(data_point);
      }
    }
  });

  return prem_team 

}
