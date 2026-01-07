


import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import { useState, useEffect, useCallback } from 'react'
import qs from 'qs'
import axios from "axios"
import { queryParams_articles } from '../../../modules/DFA/QueryParams'
import headlineFeatureModule from './headlineFeatureStructure'
import { Link } from 'react-router-dom'



// Icons
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer'
import ScheduleIcon from '@mui/icons-material/Schedule'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import PersonIcon from '@mui/icons-material/Person'

const HeadlineFeature = () => {
  const [articles, setArticles] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  // Configure Embla Carousel with autoplay
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false })
  ]);

  // Function to extract image URL from Strapi response
  const extractImageUrl = (headlineContent) => {
    if (!headlineContent || !Array.isArray(headlineContent)) return null;
    
    // Find the image block in the content
    const imageBlock = headlineContent.find(item => item.type === 'image');
    
    if (imageBlock && imageBlock.image && imageBlock.image.url) {
      // Use the large format if available, otherwise use the original
      if (imageBlock.image.formats && imageBlock.image.formats.large) {
        return imageBlock.image.formats.large.url;
      }
      return imageBlock.image.url;
    }
    
    return null;
  };

  // Function to extract summary/description from Strapi response
  const extractSummary = (headlineContent) => {
    if (!headlineContent || !Array.isArray(headlineContent)) return '';
    
    // Find paragraph or heading blocks
    const textBlocks = headlineContent.filter(item => 
      item.type === 'paragraph' || (item.type === 'heading' && item.level <= 3)
    );
    
    // Extract text from children
    let summary = '';
    textBlocks.forEach(block => {
      if (block.children && Array.isArray(block.children)) {
        block.children.forEach(child => {
          if (child.text && typeof child.text === 'string') {
            summary += child.text + ' ';
          }
        });
      }
    });
    
    // Truncate if too long
    return summary.trim().length > 200 
      ? summary.trim().substring(0, 200) + '...' 
      : summary.trim();
  };

  // Process Strapi data into our expected format
  const processStrapiData = (strapiData) => {
    if (!Array.isArray(strapiData)) return [];
    
    return strapiData.map((item, index) => {
      const attributes = item.attributes || item;
      
      return {
        id: item.id || index + 1,
        title: attributes.Title || 'Untitled Article',
        summary: extractSummary(attributes.HeadlineContent) || 
                `Read more about ${attributes.Title || 'this story'}...`,
        imageUrl: extractImageUrl(attributes.HeadlineContent) || 
                 `https://images.unsplash.com/photo-${1574629810360 + index * 100}-7efbbe195018?w=1200&h=600&fit=crop`,
        category: attributes.Type || 'News',
        author: attributes.Author || 'Staff Writer',
        date: attributes.createdAt || attributes.updatedAt || new Date().toISOString().split('T')[0],
        readTime: '3 min read' // Default, could be calculated from content
      };
    });
  };

  // Fallback data for football league
  const fallbackArticles = [
    {
      id: 1,
      title: "Dominica Premier League Season Kicks Off",
      summary: "The new season begins with thrilling matches and record attendance. Defending champions face tough competition from rising teams in what promises to be the most competitive season yet.",
      imageUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&h=600&fit=crop",
      category: "Premier League",
      author: "Danphil Daniel",
      date: "2024-01-15",
      readTime: "3 min read"
    },
    {
      id: 2,
      title: "New Stadium Opening Ceremony This Weekend",
      summary: "State-of-the-art football stadium with 15,000 capacity opens its doors for the first league match. Features include premium seating, advanced lighting, and fan-friendly amenities.",
      imageUrl: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=1200&h=600&fit=crop",
      category: "Facilities",
      author: "Sports Reporter",
      date: "2024-01-14",
      readTime: "4 min read"
    }
  ];

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const scrollTo = useCallback(
    (index) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  )

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const queryString = qs.stringify(queryParams_articles);

        // Your API endpoint URL
        const apiUrl = `https://strapi-dominica-sport.onrender.com/api/articles?${queryString}`;
        // const apiUrl = `https://strapi-dominica-sport.onrender.com/api/articles?populate=*`;
  

        // Make the fetch request
        const response = await axios.get(apiUrl);
        
        if (response.status !== 200) {
          throw new Error(`Error: ${response.statusText}`);
        }

        // Check if we have data in the expected format
        let data = response.data;
        
        // Handle different possible response structures
        if (data.data && Array.isArray(data.data)) {
          // Standard Strapi v4 response
          const processedData = processStrapiData(data.data);
          setArticles(processedData);
        } else if (Array.isArray(data)) {
          // Direct array response
          const processedData = processStrapiData(data);
          setArticles(processedData);
        } else {
          throw new Error('Unexpected response format');
        }
        
      } catch (error) {
        console.error("API Error, using fallback data:", error.message);
        setArticles(fallbackArticles);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!emblaApi) return

    onSelect()
    setScrollSnaps(emblaApi.scrollSnapList())
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)

    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi, onSelect])

  if (loading) {
    return (
      <Box sx={{ 
        width: '100%', 
        height: 500, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#222629'
      }}>
        <SportsSoccerIcon sx={{ fontSize: 60, color: '#FFD700', mr: 2, animation: 'spin 1s linear infinite' }} />
        <Typography variant="h5" sx={{ color: 'white' }}>
          Loading League Headlines...
        </Typography>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </Box>
    );
  }

      <Stack 
        width={{xs: '99%', sm: '100%'}} 
        margin={{xs:'auto'}} 
        height={{ xs: 570, sm: 450}}
        borderRadius={1}
      >



      </Stack>


    
    </Box>
  );
};

export default HeadlineFeature;