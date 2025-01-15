
export default function Combine_Team_Crest(player, image){

  


    // Create a mapping of team names to team_crest_url

  if(player != null && image != null){

    const teamUrlMapping = {};

    image.forEach(team => {
        teamUrlMapping[team.Name] = team.team_crest_url;
    });

    // Add team_crest_url to teams1 where teamName matches
    const teamsWithUrl = player.map(team => {
        const url = teamUrlMapping[team.teamName];
        return url ? { ...team, team_crest_url: url } : team;
    });

    return teamsWithUrl
  }  

}