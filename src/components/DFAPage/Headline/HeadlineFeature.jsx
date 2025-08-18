import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'



import { useState, useEffect } from 'react'

import qs from 'qs'
import axios from "axios"
import { queryParams_articles } from '../../../modules/DFA/QueryParams'
import headlineFeatureModule from './headlineFeatureStructure'
import { Link } from 'react-router-dom'




const HeadlineFeature = () => {


  const [articles, setArticles] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    
    const fetchData = async () => {
      try {
        // Set loading to true when starting the fetch
        setLoading(true);

        const queryString = qs.stringify(queryParams_articles);

        // Your API endpoint URL
        const apiUrl = `https://strapi-dominica-sport.onrender.com/api/articles?${queryString}`;
        // const apiUrl = `https://strapi-dominica-sport.onrender.com/api/articles?populate=*`;
  

        // Make the fetch request
        const response = await axios.get(apiUrl);

        // Check if the request was successful (status code 2xx)
        if (response.status !== 200) {
          throw new Error(`Error: ${response.statusText}`);
        }

        // Parse the JSON data
        const result = await response.data.data;        

        let final_data = headlineFeatureModule(result)        
                              
        // Set the data state
        setArticles(final_data);
        // setModalIsOpen(true);
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

    <Box 
    width='100%'
    sx={{ backgroundColor: '#222629'}}
    paddingTop={0}
    borderRadius={{sm: 2}}
    >

      <Stack 
        width={{xs: '99%', sm: '100%'}} 
        margin={{xs:'auto'}} 
        height={{ xs: 570, sm: 450}}
        borderRadius={1}
      >



      </Stack>


    
    </Box>

    
  )
}

export default HeadlineFeature