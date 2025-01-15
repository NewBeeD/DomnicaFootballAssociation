import { Box, Stack, Paper, Card, Typography, Skeleton } from "@mui/material"
import { Link } from "react-router-dom";



const FeaturedPlayer = ({ players }) => {

  let totalPlayers = players.length > 0 ? players[0].length: 0;


  const randomNumber = totalPlayers ? Math.floor(Math.random() * totalPlayers) + 1: 0; 
  
  const player = randomNumber != 0? players[0][randomNumber]: 0;
  
  return (
    
    <Box width={{ sm: '260px', md: '300px', lg: '350'}}  margin='auto'>

    <Typography fontWeight={900} textAlign='left' paddingBottom={0.5}>
      Featured Player
    </Typography>

    { randomNumber > 0 ? (

        <Paper sx={{ height: {sm: '400px'}, width: {sm: '250px'}}}>

          <Link to={`/DFA/Home/Player/${player.id}`} style={{ textDecoration: 'none'}}>

            <Card sx={{ height: {sm: '400px'}, width: {sm: '250px'}}}>
    
              <Stack 
              direction={{sm:'column'}}
                          
              >
    
                <Box spacing={1.5} paddingTop={2} paddingLeft={1.5} width={{ sm:'90px', md: '270px' }} >
    
                  <img 
                  alt="Player" 
                  width='220px' 
                  height='200px'
                  style={{ objectFit: 'cover', objectPosition: "50% 50%"}}
                  src={player.url} 
                  />
    
                </Box>

                <Stack  direction='column' paddingLeft={2}>
                  

                  <Box>

                    <Typography variant="caption" fontWeight={900}>
                      {player.FirstName}
                    </Typography>

                    <Typography variant="h5" fontWeight={900}>
                      {player.Last_Name}
                    </Typography>

                  </Box>



                  <Box>

                    <Typography fontWeight={900}>
                      {player.Position}
                    </Typography>
                  </Box>

                </Stack>  


    
              </Stack>

              {/* <Stack direction={{sm:'column'}} 
                width={{ sm:'280px', md: '300px' }}
                height={{ sm: '400px'}}
              >

                <Box spacing={1.5}  width={{ sm:'100%', md: '100%' }} height={{md: '250px'}} >
                  
                  <img width='200px' src={player.url} style={{ objectFit: 'cover', objectPosition: "50% 50%"}}/>

                </Box>
    
                <Stack direction='column' spacing={1.5} paddingTop={2} paddingLeft={1.5} width={{ sm:'90px', md: '130px' }}>
                  
                  <Box>
                    <Typography variant="caption">
                      Club
                    </Typography>

                    <Typography fontWeight={900}>
                      {player.Current_Team}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography variant="caption">
                      Position
                    </Typography>

                    <Typography fontWeight={900}>
                      {player.Position}
                    </Typography>
                  </Box>

                  <Box>

                    <Typography variant="caption">
                      First Name
                    </Typography>

                    <Typography fontWeight={900}>
                      {player.FirstName}
                    </Typography>

                  </Box>


                  <Box>
                    <Typography variant="caption">
                      Last Name
                    </Typography>

                    <Typography fontWeight={900}>
                      {player.Last_Name}
                    </Typography>
                  </Box>


                  <Box>
                    <Typography variant="caption">
                      Foot
                    </Typography>

                    <Typography fontWeight={900}>
                      {player.Foot}
                    </Typography>
                  </Box>



    
                  
    
                </Stack>
    
              </Stack> */}
    
    
            </Card>
          </Link>
  
  
        </Paper>
    ): <Skeleton width='100%' height='90%' />}
      
     
    
    </Box>


  )
}

export default FeaturedPlayer