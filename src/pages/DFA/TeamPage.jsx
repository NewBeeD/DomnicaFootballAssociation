import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";

import qs from 'qs'
import axios from "axios";


import {  Box, Typography, Stack, Button, Card, CardHeader, CardContent, CardMedia, CardActions,  Grid, Skeleton, Divider, Menu, MenuItem, Paper, FormControl, Select, InputLabel, Tab } from '@mui/material'


import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Link } from "react-router-dom";



import NavBar from "../../components/homePage/NavBar";


import { queryParams_dfa_teams } from "../../modules/DFA/QueryParams";
import TeamDataStructure from "../../modules/DFA/TeamPage/TeamDataStructure";



const TeamPage = () => {


  const { id } = useParams()

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [value, setValue] = useState('1');

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };



  useEffect(() => {
    const fetchData = async () => {
      try {
        // Set loading to true when starting the fetch
        setLoading(true);

        const queryString = qs.stringify(queryParams_dfa_teams);

        // Your API endpoint URL
        const apiUrl = `https://strapi-dominica-sport.onrender.com/api/dfa-teams/${id}?${queryString}`;
  

        // Make the fetch request
        const response = await axios.get(apiUrl);

        // Check if the request was successful (status code 2xx)
        if (response.status !== 200) {
          throw new Error(`Error: ${response.statusText}`);
        }

        // Parse the JSON data
        const result = await response.data.data;

        let final_data = TeamDataStructure(result)


        // Set the data state
        setData(final_data);
      } catch (error) {
        // Set the error state if there's an issue
        setError(error.message);
      } finally {
        // Set loading to false regardless of success or failure
        setLoading(false);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, []); 




  return (
    <Box paddingTop={0.5} >

      <NavBar />

      {data ?

        <Stack 
        margin='auto' 
        alignItems='center' 
        width={{xs:'98%'}}
        paddingTop={1}
        >


          <Stack
          maxWidth={{ xs: 200, sm: 1200}}
          minHeight={500}
          paddingBottom={1}
          sx={{ border: '1px solid black', borderRadius: '8px', boxShadow: 5}}
          justifyContent='space-between'
          paddingX={5}
          alignItems='center'
          direction={{sm:'column-reverse', md: 'row'}}
          spacing={10}
          >

            <Stack 
            direction='row'
            spacing={2}
            >


              <Box
              height='100%'
              width={{xs: 100 ,sm:150}}
              textAlign='center'
              >

                <img 
                src={data.team_crest}
                width='100%'
                loading="lazy"
                style={{ padding: 0, margin: 0}}                 
                />

              </Box>

              <Stack 
              direction='column' 
              spacing={2} 
              width='50%' 
              justifyContent='center'
              >
                
                <Typography 
                variant="h3"  
                sx={{ paddingTop: 1}} 
                fontWeight={900}
                width='200px'
                >
                  {data.Team}
                </Typography>

                <Stack 
                direction='row'
                spacing={2}
                >

                  <Typography sx={{ paddingTop: 1}} paddingTop={0}>{data.Community}</Typography>

                  <Typography sx={{ paddingTop: 1}} paddingTop={0}>EST: {data.est}</Typography>
                </Stack>

              </Stack>


            </Stack>


            <Stack
              height='100%'
              width={{xs: 200 ,sm:600}}
              justifyContent='center'
              >

                <img 
                src={data.Team_Photo}
                width='100%'
                loading="lazy"
                style={{ padding: 0, margin: 0}}                 
                />

            </Stack>


          </Stack>



          <Box marginTop={5}>

            <TabContext value={value}>

              <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
                
                <TabList onChange={handleTabChange} centered>

                  <Tab label='Overview' value='1' />
                  <Tab label='Staff' value='2' />
                  <Tab label='Squad' value='3' />

                </TabList>

              </Box>

              <TabPanel value='1'> 
                Panel Three
              </TabPanel>

              <TabPanel value='2' > 

              <Typography variant="h5" sx={{ textAlign: 'center'}}>Staff</Typography>

                {data ? data.staff_imgs.map((item, idx) => {

                  return (<Paper key={idx} sx={{ marginBottom: {xs: 1}}}>

                    <Card sx={{ display: 'flex', justifyContent: 'space-between'}}>

                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>

                        <CardContent sx={{ flex: '1 0 auto' }}>

                          <Typography>{item.staff_member_name}</Typography>

                          <Divider />

                          <Typography>{item.staff_member_title}</Typography>

                        </CardContent>

                      </Box>

                      <CardMedia component='img' image={item.staff_member_img} sx={{ width: {xs: 100}}}/>

                    </Card>

                  </Paper>)


                }): <Skeleton variant="rectangular" width={210} height={118} />}


              <Box>

                

              </Box>


              </TabPanel>
              
              
              <TabPanel value='3' > 

                <Stack width={{ md: 1200}}>

                  <Box>

                    <Typography variant="h6" fontWeight={900} marginBottom={1}>Goalkeepers</Typography>

                    {data ? data.Players.filter(pos => pos.Position === "GK").map((item, idx) => {

                      return (

                          <Card key={idx} sx={{ marginTop: 1, width: {xs: 350}}}>

                            <Link to={`/DFA/Home/Player/${item.id}`} style={{ textDecoration: 'none'}}>

                                <CardMedia
                                width='100%'
                                component='img' 
                                loading="lazy"
                                image={item.profile_pic}
                                sx={{ objectFit: 'cover', objectPosition: "50% 50%"}}  />

                                <CardContent>
                                  <Typography variant="h6" fontWeight={900}>{item.FirstName} {item.Last_Name}</Typography>
                                </CardContent>

                              </Link>
                          </Card>

                      )
                      }): <Skeleton variant="rectangular" width={210} height={118} />}





                  </Box>

                  <Box  marginTop={6}>

                    <Typography variant="h6" fontWeight={900} marginBottom={2}>Defenders</Typography>

                    <Grid  
                    container 
                    spacing={1.5} 
                    direction={{ sm: 'row' }} 
                    width='100%'
                    >

                      {data ? data.Players.filter(pos => ["CB", "LB", "RB"].includes(pos.Position)).map((item, idx) => {

                      return (
                        
                        <Card 
                        key={idx} 
                        sx={{ marginTop: 1, width: {xs: 350}, height: 300, margin: 1}}>

                        <Link to={`/DFA/Home/Player/${item.id}`} style={{ textDecoration: 'none'}}>

                            <CardMedia
                            component='img' 
                            loading="lazy"
                            image={item.profile_pic}
                            sx={{ width: '100%', maxHeight: 220, objectFit: 'cover', objectPosition: "50% 50%"}}  />

                            <CardContent>

                              <Typography fontWeight={900} variant="h6">{item.FirstName} {item.Last_Name}</Typography>

                              <Typography fontWeight={900}>{item.Position}</Typography>


                            </CardContent>

                          </Link>
                      </Card>
                      )
                      }): <Skeleton variant="rectangular" width={210} height={118} />}


                    </Grid>

                    

                    <Stack direction={{ md: 'row'}} spacing={2} flexWrap='wrap'>


                    </Stack>






                  </Box>


                  <Box  marginTop={6}>

                    <Typography variant="h6" fontWeight={900} marginBottom={2}>Midfielders</Typography>

                    <Grid  
                    container 
                    spacing={1.5} 
                    direction={{ sm: 'row' }} 
                    width='100%'
                    >

                      {data ? data.Players.filter(pos => [ "CM", "CDM", "CAM"].includes(pos.Position)).map((item, idx) => {

                      return (
                        
                        <Card 
                        key={idx} 
                        sx={{ marginTop: 1, width: {xs: 350}, height: 300, margin: 1}}>

                        <Link to={`/DFA/Home/Player/${item.id}`} style={{ textDecoration: 'none'}}>

                            <CardMedia
                            component='img' 
                            loading="lazy"
                            image={item.profile_pic}
                            sx={{ width: '100%', maxHeight: 220,objectFit: 'cover', objectPosition: "50% 50%"}}  />

                            <CardContent>

                              <Typography fontWeight={900} variant="h6">{item.FirstName} {item.Last_Name}</Typography>

                              <Typography fontWeight={900}>{item.Position}</Typography>


                            </CardContent>

                          </Link>
                      </Card>
                      )
                      }): <Skeleton variant="rectangular" width={210} height={118} />}


                    </Grid>

                    

                    <Stack direction={{ md: 'row'}} spacing={2} flexWrap='wrap'>


                    </Stack>






                  </Box>

                  <Box  marginTop={6}>

                    <Typography variant="h6" fontWeight={900} marginBottom={2}>Forwards</Typography>

                    <Grid  
                    container 
                    spacing={1.5} 
                    direction={{ sm: 'row' }} 
                    width='100%'
                    >

                      {data ? data.Players.filter(pos => ["ST", "CF", "LW", "RW"].includes(pos.Position)).map((item, idx) => {

                      return (
                        
                        <Card 
                        key={idx} 
                        sx={{ marginTop: 1, width: {xs: 350}, height: 300, margin: 1}}>

                        <Link to={`/DFA/Home/Player/${item.id}`} style={{ textDecoration: 'none'}}>

                            <CardMedia
                            component='img' 
                            loading="lazy"
                            image={item.profile_pic}
                            sx={{ width: '100%', maxHeight: 220,objectFit: 'cover', objectPosition: "50% 50%"}}  />

                            <CardContent>

                              <Typography fontWeight={900} variant="h6">{item.FirstName} {item.Last_Name}</Typography>

                              <Typography fontWeight={900}>{item.Position}</Typography>


                            </CardContent>

                          </Link>
                      </Card>
                      )
                      }): <Skeleton variant="rectangular" width={210} height={118} />}


                    </Grid>

                    

                    <Stack direction={{ md: 'row'}} spacing={2} flexWrap='wrap'>


                    </Stack>






                  </Box>

                </Stack>

                
                
                
                
                
                {/* {data ? data.Players.map((item, idx) => {

                 return (<Paper key={idx} sx={{ marginTop: 1}}>

                  <Link to={`/DFA/Home/Player/${item.id}`} style={{ textDecoration: 'none'}}>
                  
                    <Card>
                      <CardContent>
                        <Typography>{item.FirstName} {item.Last_Name}</Typography>
                      </CardContent>
                    </Card>

                  </Link>

                  </Paper>
)
                }): <Skeleton variant="rectangular" width={210} height={118} />} */}

              </TabPanel>
              


            </TabContext>


          </Box>
          
        </Stack>
      
      : <Skeleton variant="rectangular" width={{ xs: '100%'}} height={118} />}


    </Box>
  )
}

export default TeamPage