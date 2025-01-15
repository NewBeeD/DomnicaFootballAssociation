import { Box, Stack, Typography, Card, Skeleton } from "@mui/material"


import GetFixtures from "../../modules/Homepage/Fixtures/FixturesDataFetch";

import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";

import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';




const FixturesData = ({ page, type, league}) => {

  GetFixtures()

  let fixtures_raw = useSelector((state) => state.fixtures)
  let fixtures_all = fixtures_raw && fixtures_raw[0]? fixtures_raw[0]: []
  let fixtures_dfa = fixtures_raw && fixtures_raw[0]? fixtures_raw[0].filter(item => item.League === league): [];



  // let fixtures_raw_daba = fixtures_raw && fixtures_raw[0]? fixtures_raw[0].filter(item => item.League == 'DABA'): [];


  if( page === 'home'){

    return(

      <Box marginTop={0} width={{ xs: '90%', sm:'600px'}} margin='auto' sx={{ backgroundColor: {xs: '#F9F9F9', sm: 'white'}, border: '1px solid #D3E1FF', borderRadius: {xs: '4px'}}} >
  
        <Typography variant="h6" sx={{ textAlign: 'center', color: 'blue'}}>Game Fixtures</Typography>
  
        {fixtures_raw ? (fixtures_all.filter(item => item.Complete != 'Yes' ).slice(0,5).map((item, idx) => {
  
          return(
            
            <Box key={idx} width={{xs: '100%'}} margin={{xs:'auto'}}>
  
              <Card sx={{ marginY: {xs: 0}, height: 'auto', boxShadow: 'none', borderBottom: {xs: '1px solid #D3E1FF'}, borderRadius: {xs: '4px'}}}>

                <Box >
    
                    <Typography style={{ fontSize: 12 }} sx={{ textAlign: 'center', color: 'blue'}}>{item.LeagueName}</Typography>

                </Box>
  
                <Stack direction={{xs: 'row'}} justifyContent='space-between' marginX={2} paddingTop={1}>
  
                  <Stack direction='column' spacing={0.5}>
  
                    <Typography style={{ fontSize: 12, fontWeight: 'bold' }}>{item.Home}</Typography>
                    <Typography style={{ fontSize: 12, fontWeight: 'bold' }}>{item.Away}</Typography>
  
                  </Stack>
  
                  <Stack direction='column' spacing={0.5}>

                    {item.HomeScore ? 
                    
                    (<Typography style={{ fontSize: 13, fontWeight:900, color: 'blue' }}>{item.HomeScore}</Typography>): 
                    
                    item.HomeScore === 0 && item.AwayScore != 0? 
                    
                    (<Typography style={{ fontSize: 13, fontWeight: 900, color: 'blue' }}>0</Typography>):
                    
                    (<Typography style={{ fontSize: 12}}>{item.Date}</Typography>)
                    }
  
                    {item.AwayScore? 
                    
                    (<Typography style={{ fontSize: 13, fontWeight: 900, color: 'blue' }}>{item.AwayScore}</Typography>):
                    
                    item.AwayScore === 0 && item.HomeScore != 0? 
                    
                    (<Typography style={{ fontSize: 13, fontWeight: 900, color: 'blue' }}>0</Typography>):
                    
                    (<Typography  fontStyle={{ fontSize: 12.5}}>{item.Time}</Typography>)
                    
                    }


                  </Stack>
  
                </Stack>



                <Stack marginLeft={2}>

                    
                  {item.Game_Info != undefined ? (<Stack>

                    <Box marginTop={2}>
                      <Typography>Goals</Typography>

                    </Box>

                    <Stack direction='row' justifyContent='space-between' marginRight={2} paddingTop={1}>
                      <Box>Home</Box>
                      <Box>Away</Box>
                    </Stack>

                    <Stack direction='row' justifyContent='space-between' marginRight={2} paddingTop={1}>

                      <Box paddingTop={1}>
                      {item.Game_Info.Goal_Scorers_Home.map((data_point, key_value) => {

                        return(
                          <Stack key={key_value} direction='row' alignItems='center' spacing={0.5}>


                            <Box>
                              <SportsSoccerIcon fontSize='2px'/>
                            </Box>

                            <Box>
                              <Typography variant='caption'>{data_point}</Typography>
                            </Box>


                          </Stack>
                        )
                      })}  
                      </Box>

                      <Box paddingTop={1}>
                      {item.Game_Info.Goal_Scorers_Away.map((data_point, key_value) => {

                        return(
                          <Stack key={key_value} direction='row' alignItems='center' spacing={0.5}>


                            <Box>
                              <SportsSoccerIcon fontSize='2px'/>
                            </Box>

                            <Box>
                              <Typography variant='caption'>{data_point}</Typography>
                            </Box>


                          </Stack>
                        )
                      })}  
                      </Box>


                    </Stack>


                                    

                  </Stack>): ''}
                </Stack>
  
                <Box marginTop={1}>
  
                  <Typography style={{ fontSize: 12 }} sx={{ textAlign: 'center', color: 'blue'}}>{item.League_fullName} | {item.Venue}</Typography>
  
                </Box>
  
                
  
              </Card>

                          
            </Box>

            
  
          )})): <Skeleton variant="rectangular" width={310} height={60} />}

          <Box sx={{ textAlign: 'center', marginY: 1}}>

            <Link to='/DFA/Fixtures' style={{ textDecoration: 'none'}}>
              <Typography >View all fixtures</Typography>
            
            </Link>


          </Box>

  
          {/* <Box>
            <Typography style={{ fontSize: 13, fontWeight: 'bold'}}  sx={{ textAlign: 'center', paddingY: {xs: '5px'}}}>
  
              View All Fixtures
  
            </Typography>
          </Box> */}
  
       
  
  
      </Box>
    )

  }

  else if(page === 'dfa'){

    return(

      <Box marginTop={2.3} width={{ xs: '95%'}} marginX='auto' sx={{ backgroundColor: {xs: '#F9F9F9', sm: 'white'}, border: '1px solid #D3E1FF', borderRadius: {xs: '4px'}}}>
  
        <Typography variant="h6" sx={{ textAlign: 'center', color: 'blue', }}>Game Fixtures</Typography>
  
        {fixtures_raw && type === 'now' ? (fixtures_dfa.filter(item => item.Complete != 'Yes').map((item, idx) => {
  
          return(
            
            <Box key={idx} width={{xs: '100%'}} margin={{xs:'auto'}}>
  
              <Card sx={{ marginY: {xs: 0}, height: 'auto', boxShadow: 'none', borderBottom: {xs: '1px solid #D3E1FF'}, borderRadius: {xs: '4px'}}}>
  
                <Stack direction={{xs: 'row'}} justifyContent='space-between' marginX={2} paddingTop={1}>
  
                  <Stack direction='column' spacing={0.5}>
  
                    <Typography style={{ fontSize: 12, fontWeight: 900 }}>{item.Home}</Typography>
                    <Typography style={{ fontSize: 12, fontWeight: 900 }}>{item.Away}</Typography>
  
                  </Stack>
  
                  <Stack direction='column' spacing={0.5}>
                    {item.HomeScore ? (<Typography style={{ fontSize: 13, fontWeight:900, color: 'blue' }}>{item.HomeScore}</Typography>) : item.HomeScore === 0 && item.AwayScore != 0? (<Typography style={{ fontSize: 13, fontWeight: 900, color: 'blue' }}>0</Typography>):(<Typography style={{ fontSize: 12, fontWeight: 900 }}>{item.Date}</Typography>)}
  
                    {item.AwayScore? (<Typography style={{ fontSize: 13, fontWeight: 900, color: 'blue' }}>{item.AwayScore}</Typography>): item.AwayScore === 0 && item.HomeScore != 0? (<Typography style={{ fontSize: 13, fontWeight: 900, color: 'blue' }}>0</Typography>):(<Typography  fontStyle={{ fontWeight: 900, fontSize: 12.5}}>{item.Time}</Typography>)}
                  </Stack>
  
                </Stack>

                <Stack marginLeft={2}>

                    
                  {item.Game_Info != undefined ? (<Stack>

                    <Box marginTop={2}>
                      <Typography>Goals</Typography>

                    </Box>

                    <Stack direction='row' justifyContent='space-between' marginRight={2} paddingTop={1}>
                      <Box>Home</Box>
                      <Box>Away</Box>
                    </Stack>

                    <Stack direction='row' justifyContent='space-between' marginRight={2} paddingTop={1}>

                      <Box paddingTop={1}>
                      {item.Game_Info.Goal_Scorers_Home.map((data_point, key_value) => {

                        return(
                          <Stack key={key_value} direction='row' alignItems='center' spacing={0.5}>


                            <Box>
                              <SportsSoccerIcon fontSize='2px'/>
                            </Box>

                            <Box>
                              <Typography variant='caption'>{data_point}</Typography>
                            </Box>


                          </Stack>
                        )
                      })}  
                      </Box>

                      <Box paddingTop={1}>
                      {item.Game_Info.Goal_Scorers_Away.map((data_point, key_value) => {

                        return(
                          <Stack key={key_value} direction='row' alignItems='center' spacing={0.5}>


                            <Box>
                              <SportsSoccerIcon fontSize='2px'/>
                            </Box>

                            <Box>
                              <Typography variant='caption'>{data_point}</Typography>
                            </Box>


                          </Stack>
                        )
                      })}  
                      </Box>


                    </Stack>


                                    

                  </Stack>): ''}
                </Stack>
  
                <Box >
  
                  <Typography style={{ fontSize: 12 }} sx={{ textAlign: 'center', color: 'blue'}}>{item.Cancelled === 'Yes'? 'Cancelled': item.Venue}</Typography>
  
                </Box>
  
                
  
              </Card>
              
            </Box>
  
          )})): type === 'past'? (fixtures_dfa.filter(item => item.Complete === 'Yes').map((item, idx) => {
  
            return(
              
              <Box key={idx} width={{xs: '100%'}} margin={{xs:'auto'}}>
    
                <Card sx={{ marginY: {xs: 0}, height: 'auto', boxShadow: 'none', borderBottom: {xs: '1px solid #D3E1FF'}, borderRadius: {xs: '4px'}}}>

                  <Box marginTop={1} sx={{ display: {xs: 'flex'}, justifyContent: 'center'}}>

                    <Typography>
                      {type === 'past'? <Typography style={{ fontSize: 12, fontWeight: 900 }}>{item.Date}</Typography>: ''}
                    </Typography>
                    
                  </Box>

    
                  <Stack direction={{xs: 'row'}} justifyContent='space-between' marginX={2} paddingTop={1}>
    
                    <Stack direction='column' spacing={0.5}>
    
                      <Typography style={{ fontSize: 12, fontWeight: 900 }}>{item.Home}</Typography>
                      <Typography style={{ fontSize: 12, fontWeight: 900 }}>{item.Away}</Typography>
    
                    </Stack>    

                    <Stack direction='column' spacing={0.5}>

                      <Typography style={{ fontSize: 13, fontWeight:900, color: 'blue' }}>{item.HomeScore}</Typography>
    
                      <Typography style={{ fontSize: 13, fontWeight: 900, color: 'blue' }}>{item.AwayScore}</Typography>
                    </Stack>
    
                  </Stack>

                  <Stack marginLeft={2}>             
                      {item.Game_Info != undefined ? (<Stack>

                        <Box marginTop={2}>
                          <Typography>Goals</Typography>

                        </Box>

                        <Stack direction='row' justifyContent='space-between' marginRight={2} paddingTop={1}>
                          <Box>Home</Box>
                          <Box>Away</Box>
                        </Stack>

                        <Stack direction='row' justifyContent='space-between' marginRight={2} paddingTop={1}>

                          <Box paddingTop={1}>
                          {item.Game_Info.Goal_Scorers_Home.map((data_point, key_value) => {

                            return(
                              <Stack key={key_value} direction='row' alignItems='center' spacing={0.5}>


                                <Box>
                                  <SportsSoccerIcon fontSize='2px'/>
                                </Box>

                                <Box>
                                  <Typography variant='caption'>{data_point}</Typography>
                                </Box>


                              </Stack>
                            )
                          })}  
                          </Box>

                          <Box paddingTop={1}>
                          {item.Game_Info.Goal_Scorers_Away.map((data_point, key_value) => {

                            return(
                              <Stack key={key_value} direction='row' alignItems='center' spacing={0.5}>


                                <Box>
                                  <SportsSoccerIcon fontSize='2px'/>
                                </Box>

                                <Box>
                                  <Typography variant='caption'>{data_point}</Typography>
                                </Box>


                              </Stack>
                            )
                          })}  
                          </Box>


                        </Stack>


                                        

                      </Stack>): ''}
                  </Stack>
    
                  <Box marginBottom={1}>
    
                    <Typography style={{ fontSize: 12 }} sx={{ textAlign: 'center', color: 'blue'}}>{item.Cancelled === 'Yes'? 'Cancelled': item.League_fullName}</Typography>
    
                  </Box>
    
                  
    
                </Card>
                
              </Box>
    
            )})): <Skeleton variant="rectangular" width={310} height={60} />}
  
          {/* <Box>
            <Typography style={{ fontSize: 13, fontWeight: 'bold'}}  sx={{ textAlign: 'center', paddingY: {xs: '5px'}}}>
  
              View All Fixtures
  
            </Typography>
          </Box> */}
  
       
  
  
      </Box>
    )

  }

  else if(page === 'div_1'){

    return(

      <Box marginTop={2.3} width={{ xs: '95%'}} marginX='auto' sx={{ backgroundColor: {xs: '#F9F9F9', sm: 'white'}, border: '1px solid #D3E1FF', borderRadius: {xs: '4px'}}}>
  
        <Typography variant="h6" sx={{ textAlign: 'center', color: 'blue', }}>Game Fixtures</Typography>
  
        {fixtures_raw && type === 'now' ? (fixtures_dfa.filter(item => item.Complete != 'Yes').map((item, idx) => {
  
          return(
            
            <Box key={idx} width={{xs: '100%'}} margin={{xs:'auto'}}>
  
              <Card sx={{ marginY: {xs: 0}, height: 'auto', boxShadow: 'none', borderBottom: {xs: '1px solid #D3E1FF'}, borderRadius: {xs: '4px'}}}>
  
                <Stack direction={{xs: 'row'}} justifyContent='space-between' marginX={2} paddingTop={1}>
  
                  <Stack direction='column' spacing={0.5}>
  
                    <Typography style={{ fontSize: 12, fontWeight: 900 }}>{item.Home}</Typography>
                    <Typography style={{ fontSize: 12, fontWeight: 900 }}>{item.Away}</Typography>
  
                  </Stack>
  
                  <Stack direction='column' spacing={0.5}>
                    {item.HomeScore ? (<Typography style={{ fontSize: 13, fontWeight:900, color: 'blue' }}>{item.HomeScore}</Typography>) : item.HomeScore === 0 && item.AwayScore != 0? (<Typography style={{ fontSize: 13, fontWeight: 900, color: 'blue' }}>0</Typography>):(<Typography style={{ fontSize: 12, fontWeight: 900 }}>{item.Date}</Typography>)}
  
                    {item.AwayScore? (<Typography style={{ fontSize: 13, fontWeight: 900, color: 'blue' }}>{item.AwayScore}</Typography>): item.AwayScore === 0 && item.HomeScore != 0? (<Typography style={{ fontSize: 13, fontWeight: 900, color: 'blue' }}>0</Typography>):(<Typography  fontStyle={{ fontWeight: 900, fontSize: 12.5}}>{item.Time}</Typography>)}
                  </Stack>
  
                </Stack>

                <Stack marginLeft={2}>

                    
                  {item.Game_Info != undefined ? (<Stack>

                    <Box marginTop={2}>
                      <Typography>Goals</Typography>

                    </Box>

                    <Stack direction='row' justifyContent='space-between' marginRight={2} paddingTop={1}>
                      <Box>Home</Box>
                      <Box>Away</Box>
                    </Stack>

                    <Stack direction='row' justifyContent='space-between' marginRight={2} paddingTop={1}>

                      <Box paddingTop={1}>
                      {item.Game_Info.Goal_Scorers_Home.map((data_point, key_value) => {

                        return(
                          <Stack key={key_value} direction='row' alignItems='center' spacing={0.5}>


                            <Box>
                              <SportsSoccerIcon fontSize='2px'/>
                            </Box>

                            <Box>
                              <Typography variant='caption'>{data_point}</Typography>
                            </Box>


                          </Stack>
                        )
                      })}  
                      </Box>

                      <Box paddingTop={1}>
                      {item.Game_Info.Goal_Scorers_Away.map((data_point, key_value) => {

                        return(
                          <Stack key={key_value} direction='row' alignItems='center' spacing={0.5}>


                            <Box>
                              <SportsSoccerIcon fontSize='2px'/>
                            </Box>

                            <Box>
                              <Typography variant='caption'>{data_point}</Typography>
                            </Box>


                          </Stack>
                        )
                      })}  
                      </Box>


                    </Stack>


                                    

                  </Stack>): ''}
                </Stack>
  
                <Box >
  
                  <Typography style={{ fontSize: 12 }} sx={{ textAlign: 'center', color: 'blue'}}>{item.Cancelled === 'Yes'? 'Cancelled': item.Venue}</Typography>
  
                </Box>
  
                
  
              </Card>
              
            </Box>
  
          )})): type === 'past'? (fixtures_dfa.filter(item => item.Complete === 'Yes').map((item, idx) => {
  
            return(
              
              <Box key={idx} width={{xs: '100%'}} margin={{xs:'auto'}}>
    
                <Card sx={{ marginY: {xs: 0}, height: 'auto', boxShadow: 'none', borderBottom: {xs: '1px solid #D3E1FF'}, borderRadius: {xs: '4px'}}}>

                  <Box marginTop={1} sx={{ display: {xs: 'flex'}, justifyContent: 'center'}}>

                    <Typography>
                      {type === 'past'? <Typography style={{ fontSize: 12, fontWeight: 900 }}>{item.Date}</Typography>: ''}
                    </Typography>
                    
                  </Box>

    
                  <Stack direction={{xs: 'row'}} justifyContent='space-between' marginX={2} paddingTop={1}>
    
                    <Stack direction='column' spacing={0.5}>
    
                      <Typography style={{ fontSize: 12, fontWeight: 900 }}>{item.Home}</Typography>
                      <Typography style={{ fontSize: 12, fontWeight: 900 }}>{item.Away}</Typography>
    
                    </Stack>    

                    <Stack direction='column' spacing={0.5}>

                      <Typography style={{ fontSize: 13, fontWeight:900, color: 'blue' }}>{item.HomeScore}</Typography>
    
                      <Typography style={{ fontSize: 13, fontWeight: 900, color: 'blue' }}>{item.AwayScore}</Typography>
                    </Stack>
    
                  </Stack>

                  <Stack marginLeft={2}>             
                      {item.Game_Info != undefined ? (<Stack>

                        <Box marginTop={2}>
                          <Typography>Goals</Typography>

                        </Box>

                        <Stack direction='row' justifyContent='space-between' marginRight={2} paddingTop={1}>
                          <Box>Home</Box>
                          <Box>Away</Box>
                        </Stack>

                        <Stack direction='row' justifyContent='space-between' marginRight={2} paddingTop={1}>

                          <Box paddingTop={1}>
                          {item.Game_Info.Goal_Scorers_Home.map((data_point, key_value) => {

                            return(
                              <Stack key={key_value} direction='row' alignItems='center' spacing={0.5}>


                                <Box>
                                  <SportsSoccerIcon fontSize='2px'/>
                                </Box>

                                <Box>
                                  <Typography variant='caption'>{data_point}</Typography>
                                </Box>


                              </Stack>
                            )
                          })}  
                          </Box>

                          <Box paddingTop={1}>
                          {item.Game_Info.Goal_Scorers_Away.map((data_point, key_value) => {

                            return(
                              <Stack key={key_value} direction='row' alignItems='center' spacing={0.5}>


                                <Box>
                                  <SportsSoccerIcon fontSize='2px'/>
                                </Box>

                                <Box>
                                  <Typography variant='caption'>{data_point}</Typography>
                                </Box>


                              </Stack>
                            )
                          })}  
                          </Box>


                        </Stack>


                                        

                      </Stack>): ''}
                  </Stack>
    
                  <Box marginBottom={1}>
    
                    <Typography style={{ fontSize: 12 }} sx={{ textAlign: 'center', color: 'blue'}}>{item.Cancelled === 'Yes'? 'Cancelled': item.League_fullName}</Typography>
    
                  </Box>
    
                  
    
                </Card>
                
              </Box>
    
            )})): <Skeleton variant="rectangular" width={310} height={60} />}
  
          {/* <Box>
            <Typography style={{ fontSize: 13, fontWeight: 'bold'}}  sx={{ textAlign: 'center', paddingY: {xs: '5px'}}}>
  
              View All Fixtures
  
            </Typography>
          </Box> */}
  
       
  
  
      </Box>
    )

  }

  else if(page === 'daba'){

    return(

      <Box marginTop={2.3} width={{ xs: '95%'}} marginX='auto' sx={{ backgroundColor: {xs: '#F9F9F9', sm: 'white'}, border: '1px solid #D3E1FF', borderRadius: {xs: '4px'}}}>
  
        <Typography variant="h6" sx={{ textAlign: 'center', color: 'blue', }}>Game Fixtures</Typography>
  
        {fixtures_raw && type === 'now' ? (fixtures_raw_daba.filter(item => item.Complete != 'Yes').map((item, idx) => {
  
          return(
            
            <Box key={idx} width={{xs: '100%'}} margin={{xs:'auto'}}>
  
              <Card sx={{ marginY: {xs: 0}, height: 'auto', boxShadow: 'none', borderBottom: {xs: '1px solid #D3E1FF'}, borderRadius: {xs: '4px'}}}>
  
                <Stack direction={{xs: 'row'}} justifyContent='space-between' marginX={2} paddingTop={1}>
  
                  <Stack direction='column' spacing={0.5}>
  
                    <Typography style={{ fontSize: 12, fontWeight: 900 }}>{item.Home}</Typography>
                    <Typography style={{ fontSize: 12, fontWeight: 900 }}>{item.Away}</Typography>
  
                  </Stack>
  
                  <Stack direction='column' spacing={0.5}>
                    {item.HomeScore ? (<Typography style={{ fontSize: 13, fontWeight:900, color: 'blue' }}>{item.HomeScore}</Typography>) : item.HomeScore === 0 && item.AwayScore != 0? (<Typography style={{ fontSize: 13, fontWeight: 900, color: 'blue' }}>0</Typography>):(<Typography style={{ fontSize: 12, fontWeight: 900 }}>{item.Date}</Typography>)}
  
                    {item.AwayScore? (<Typography style={{ fontSize: 13, fontWeight: 900, color: 'blue' }}>{item.AwayScore}</Typography>): item.AwayScore === 0 && item.HomeScore != 0? (<Typography style={{ fontSize: 13, fontWeight: 900, color: 'blue' }}>0</Typography>):(<Typography  fontStyle={{ fontWeight: 900, fontSize: 12.5}}>{item.Time}</Typography>)}
                  </Stack>
  
                </Stack>

                <Stack marginLeft={2}>

                    
                  {item.Game_Info != undefined ? (<Stack>

                    <Box marginTop={2}>
                      <Typography>Goals</Typography>

                    </Box>

                    <Stack direction='row' justifyContent='space-between' marginRight={2} paddingTop={1}>
                      <Box>Home</Box>
                      <Box>Away</Box>
                    </Stack>

                    <Stack direction='row' justifyContent='space-between' marginRight={2} paddingTop={1}>

                      <Box paddingTop={1}>
                      {item.Game_Info.Goal_Scorers_Home.map((data_point, key_value) => {

                        return(
                          <Stack key={key_value} direction='row' alignItems='center' spacing={0.5}>


                            <Box>
                              <SportsSoccerIcon fontSize='2px'/>
                            </Box>

                            <Box>
                              <Typography variant='caption'>{data_point}</Typography>
                            </Box>


                          </Stack>
                        )
                      })}  
                      </Box>

                      <Box paddingTop={1}>
                      {item.Game_Info.Goal_Scorers_Away.map((data_point, key_value) => {

                        return(
                          <Stack key={key_value} direction='row' alignItems='center' spacing={0.5}>


                            <Box>
                              <SportsSoccerIcon fontSize='2px'/>
                            </Box>

                            <Box>
                              <Typography variant='caption'>{data_point}</Typography>
                            </Box>


                          </Stack>
                        )
                      })}  
                      </Box>


                    </Stack>


                                    

                  </Stack>): ''}
                </Stack>
  
                <Box >
  
                  <Typography style={{ fontSize: 12 }} sx={{ textAlign: 'center', color: 'blue'}}>{item.Cancelled === 'Yes'? 'Cancelled': item.Venue}</Typography>
  
                </Box>
  
                
  
              </Card>
              
            </Box>
  
          )})): type === 'past'? (fixtures_raw_daba.filter(item => item.Complete === 'Yes').map((item, idx) => {
  
            return(
              
              <Box key={idx} width={{xs: '100%'}} margin={{xs:'auto'}}>
    
                <Card sx={{ marginY: {xs: 0}, height: 'auto', boxShadow: 'none', borderBottom: {xs: '1px solid #D3E1FF'}, borderRadius: {xs: '4px'}}}>

                  <Box marginTop={1} sx={{ display: {xs: 'flex'}, justifyContent: 'center'}}>

                    <Typography>
                      {type === 'past'? <Typography style={{ fontSize: 12, fontWeight: 900 }}>{item.Date}</Typography>: ''}
                    </Typography>
                    
                  </Box>

    
                  <Stack direction={{xs: 'row'}} justifyContent='space-between' marginX={2} paddingTop={1}>
    
                    <Stack direction='column' spacing={0.5}>
    
                      <Typography style={{ fontSize: 12, fontWeight: 900 }}>{item.Home}</Typography>
                      <Typography style={{ fontSize: 12, fontWeight: 900 }}>{item.Away}</Typography>
    
                    </Stack>    

                    <Stack direction='column' spacing={0.5}>

                      <Typography style={{ fontSize: 13, fontWeight:900, color: 'blue' }}>{item.HomeScore}</Typography>
    
                      <Typography style={{ fontSize: 13, fontWeight: 900, color: 'blue' }}>{item.AwayScore}</Typography>
                    </Stack>
    
                  </Stack>

                  <Stack marginLeft={2}>             
                      {item.Game_Info != undefined ? (<Stack>

                        <Box marginTop={2}>
                          <Typography>Goals</Typography>

                        </Box>

                        <Stack direction='row' justifyContent='space-between' marginRight={2} paddingTop={1}>
                          <Box>Home</Box>
                          <Box>Away</Box>
                        </Stack>

                        <Stack direction='row' justifyContent='space-between' marginRight={2} paddingTop={1}>

                          <Box paddingTop={1}>
                          {item.Game_Info.Goal_Scorers_Home.map((data_point, key_value) => {

                            return(
                              <Stack key={key_value} direction='row' alignItems='center' spacing={0.5}>


                                <Box>
                                  <SportsSoccerIcon fontSize='2px'/>
                                </Box>

                                <Box>
                                  <Typography variant='caption'>{data_point}</Typography>
                                </Box>


                              </Stack>
                            )
                          })}  
                          </Box>

                          <Box paddingTop={1}>
                          {item.Game_Info.Goal_Scorers_Away.map((data_point, key_value) => {

                            return(
                              <Stack key={key_value} direction='row' alignItems='center' spacing={0.5}>


                                <Box>
                                  <SportsSoccerIcon fontSize='2px'/>
                                </Box>

                                <Box>
                                  <Typography variant='caption'>{data_point}</Typography>
                                </Box>


                              </Stack>
                            )
                          })}  
                          </Box>


                        </Stack>


                                        

                      </Stack>): ''}
                  </Stack>
    
                  <Box marginBottom={1}>
    
                    <Typography style={{ fontSize: 12 }} sx={{ textAlign: 'center', color: 'blue'}}>{item.Cancelled === 'Yes'? 'Cancelled': item.League}</Typography>
    
                  </Box>
    
                  
    
                </Card>
                
              </Box>
    
            )})): <Skeleton variant="rectangular" width={310} height={60} />}
  
          {/* <Box>
            <Typography style={{ fontSize: 13, fontWeight: 'bold'}}  sx={{ textAlign: 'center', paddingY: {xs: '5px'}}}>
  
              View All Fixtures
  
            </Typography>
          </Box> */}
  
       
  
  
      </Box>
    )

  }

  if( page === 'Dfahome'){

    return(

      <Box width={{ xs: '90%', sm:'230px', md: '300px', lg: '300px'}} margin='auto' sx={{ backgroundColor: {xs: '#F9F9F9', sm: 'white'}, border: '1px solid #D3E1FF', borderRadius: {xs: '4px'}}} >
  
        <Typography variant="h6" sx={{ textAlign: 'center', color: 'blue'}}>Game Fixtures</Typography>
  
        {fixtures_raw ? (fixtures_all.filter(item => item.Complete != 'Yes' ).slice(0,5).map((item, idx) => {
  
          return(
            
            <Box key={idx} width={{xs: '100%'}} margin={{xs:'auto'}}>
  
              <Card sx={{ marginY: {xs: 0}, height: 'auto', boxShadow: 'none', borderBottom: {xs: '1px solid #D3E1FF'}, borderRadius: {xs: '4px'}}}>


  
                <Stack direction={{xs: 'row'}} justifyContent='space-between' marginX={2} paddingTop={1}>
  
                  <Stack direction='column' spacing={0.5}>
  
                    <Typography style={{ fontSize: 12, fontWeight: 'bold' }}>{item.Home}</Typography>
                    <Typography style={{ fontSize: 12, fontWeight: 'bold' }}>{item.Away}</Typography>
  
                  </Stack>
  
                  <Stack direction='column' spacing={0.5}>

                    {item.HomeScore ? 
                    
                    (<Typography style={{ fontSize: 13, fontWeight:900, color: 'blue' }}>{item.HomeScore}</Typography>): 
                    
                    item.HomeScore === 0 && item.AwayScore != 0? 
                    
                    (<Typography style={{ fontSize: 13, fontWeight: 900, color: 'blue' }}>0</Typography>):
                    
                    (<Typography style={{ fontSize: 12}}>{item.Date}</Typography>)
                    }
  
                    {item.AwayScore? 
                    
                    (<Typography style={{ fontSize: 13, fontWeight: 900, color: 'blue' }}>{item.AwayScore}</Typography>):
                    
                    item.AwayScore === 0 && item.HomeScore != 0? 
                    
                    (<Typography style={{ fontSize: 13, fontWeight: 900, color: 'blue' }}>0</Typography>):
                    
                    (<Typography  fontStyle={{ fontSize: 12.5}}>{item.Time}</Typography>)
                    
                    }


                  </Stack>
  
                </Stack>



                <Stack marginLeft={2}>

                    
                  {item.Game_Info != undefined ? (<Stack>

                    <Box marginTop={2}>
                      <Typography>Goals</Typography>

                    </Box>

                    <Stack direction='row' justifyContent='space-between' marginRight={2} paddingTop={1}>
                      <Box>Home</Box>
                      <Box>Away</Box>
                    </Stack>

                    <Stack direction='row' justifyContent='space-between' marginRight={2} paddingTop={1}>

                      <Box paddingTop={1}>
                      {item.Game_Info.Goal_Scorers_Home.map((data_point, key_value) => {

                        return(
                          <Stack key={key_value} direction='row' alignItems='center' spacing={0.5}>


                            <Box>
                              <SportsSoccerIcon fontSize='2px'/>
                            </Box>

                            <Box>
                              <Typography variant='caption'>{data_point}</Typography>
                            </Box>


                          </Stack>
                        )
                      })}  
                      </Box>

                      <Box paddingTop={1}>
                      {item.Game_Info.Goal_Scorers_Away.map((data_point, key_value) => {

                        return(
                          <Stack key={key_value} direction='row' alignItems='center' spacing={0.5}>


                            <Box>
                              <SportsSoccerIcon fontSize='2px'/>
                            </Box>

                            <Box>
                              <Typography variant='caption'>{data_point}</Typography>
                            </Box>


                          </Stack>
                        )
                      })}  
                      </Box>


                    </Stack>


                                    

                  </Stack>): ''}
                </Stack>
  
                <Box marginTop={1}>
  
                  <Typography style={{ fontSize: 12 }} sx={{ textAlign: 'center', color: 'blue'}}>{item.League_fullName} | {item.Venue}</Typography>
  
                </Box>
  
                
  
              </Card>

                          
            </Box>

            
  
          )})): <Skeleton variant="rectangular" width={310} height={60} />}

          <Box sx={{ textAlign: 'center', marginY: 1}}>

            <Link to='/DFA/Fixtures' style={{ textDecoration: 'none'}}>
              <Typography >View all fixtures</Typography>
            
            </Link>


          </Box>

  
          {/* <Box>
            <Typography style={{ fontSize: 13, fontWeight: 'bold'}}  sx={{ textAlign: 'center', paddingY: {xs: '5px'}}}>
  
              View All Fixtures
  
            </Typography>
          </Box> */}
  
       
  
  
      </Box>
    )

  }



}

export default FixturesData