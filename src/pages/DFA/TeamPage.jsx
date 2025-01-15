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
    <Box paddingTop={0.5} height='100vh' >

      <NavBar />

      {data ?

        <Stack margin='auto' alignItems='center' direction={{xs:'column', sm:'row'}} width={{xs:'98%'}}>

          <Paper>

            <Card>

                <CardMedia component='img' image={data.team_crest} />

                <CardContent>
                  <Typography variant="h5" sx={{ paddingTop: 1}} >{data.Team}</Typography>
                  <Typography sx={{ paddingTop: 1}} paddingTop={0}>{data.Community}</Typography>
                  <Typography sx={{ paddingTop: 1}} paddingTop={0}>EST: {data.est}</Typography>
                </CardContent>

            </Card>

          </Paper>

          <Box>

            <TabContext value={value}>

              <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
                
                <TabList onChange={handleTabChange} centered>

                  <Tab label='Overview' value='1' />
                  <Tab label='Squad' value='2' />
                  {/* <Tab label='TabThree' value='3' /> */}

                </TabList>

              </Box>

              <TabPanel value='1' sx={{ width: {xs: 350}}}> 

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
              
              
              <TabPanel value='2' sx={{ width: {xs: 350}}}> 

                {data ? data.Players.map((item, idx) => {

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
                }): <Skeleton variant="rectangular" width={210} height={118} />}

              </TabPanel>
              {/* <TabPanel value='3'> Panel Three</TabPanel> */}


            </TabContext>


          </Box>
          
        </Stack>
      
      : <Skeleton variant="rectangular" width={{ xs: '100%'}} height={118} />}


    </Box>
  )
}

export default TeamPage