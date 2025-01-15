import { Route, Routes} from 'react-router-dom'
import { useMediaQuery, useTheme } from '@mui/material';

import HomePage from "./pages/HomePage"
import Article from "./pages/Article"
import "./App.css"
import DFA from './pages/DFA/DFA'
import DABA from './pages/DABA/DABA'
import DABAFixtures from './pages/DABA/DABAFixtures';
import DABAStats from './pages/DABA/DABAStats';
import DABATable from './pages/DABA/DABATable';
import DABATeams from './pages/DABA/DABATeams';
import DABASinglePlayer from './pages/DABA/DABASinglePlayerProfile';

import DAVA from './pages/DAVA/DAVA'
import DNA from './pages/DNA/DNA'

import PlayerProfile from './pages/DFA/PlayerProfile'

import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import LeagueStanding from './pages/Tables/LeagueStanding'
import PlayerGoals from './pages/DFA/PlayerGoals'
import DivisionOnePlayerGoals from './pages/DFA/DivisionOne/DivisionOnePlayerGoals';
import PlayerAssists from './pages/DFA/PlayerAssists'
import DivisionOnePlayerAssists from './pages/DFA/DivisionOne/DivisionOnePlayerAssists';
import TeamGoals from './pages/DFA/TeamGoals'
import TeamCleanSheets from './pages/DFA/TeamCleanSheets'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'
import TeamPage from './pages/DFA/TeamPage'
import AllTeamsPage from './pages/DFA/AllTeamsPage'
import StatsPage from './pages/DFA/StatsPage'
import DivisionOneStatsPage from './pages/DFA/DivisionOne/DivisionOneStatsPage';
import FixturesPage from './pages/DFA/FixturesPage'
import DfaPageLargeScreens from './pages/DFA/DfaPageLargeScreens'



function App() {

  const theme = useTheme();
const isAboveSM = useMediaQuery(theme.breakpoints.up('sm'));



  return (
    
    <div className="app-background-color">

      <Routes>

        <Route path='/' element={<HomePage />} />
        <Route path='/:id' element={<Article />} />
        
        <Route path="/DFA/Home" element={isAboveSM ? <DfaPageLargeScreens />: <DFA />} />
           
        {/* <Route path='/DFA/Home' element={<DFA />} /> */}
        {/* <Route path='/DFA/Home' element={<DfaPageLargeScreens />} /> */}


        <Route path='/DFA/Home/Player/:id' element={<PlayerProfile />}/>
        <Route path='/DFA/Table' element={<LeagueStanding />} />
        <Route path='/DFA/Home/PlayerGoals' element={<PlayerGoals />} />
        <Route path='/DFA/Home/DivisionOnePlayerGoals' element={<DivisionOnePlayerGoals />} />
        <Route path='/DFA/Home/PlayerAssists' element={<PlayerAssists />} />
        <Route path='/DFA/Home/DivisionOnePlayerAssists' element={<DivisionOnePlayerAssists />} />
        <Route path='/DFA/Home/TeamGoals' element={<TeamGoals />} />
        <Route path='/DFA/Home/TeamCleanSheets' element={<TeamCleanSheets />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Profile' element={<Profile />} />
        <Route path='/DFA/Home/Team/:id' element={<TeamPage />} />
        <Route path='/DFA/Teams' element={<AllTeamsPage />} />
        <Route path='/DFA/Stats' element={<StatsPage />} />
        <Route path='/DFA/DivisionOneStats' element={<DivisionOneStatsPage />} />
        <Route path='/DFA/Fixtures' element={<FixturesPage />} />
        {/* <Route path='/Signup' element={<SignUp />} /> */}


        {/* DABA Routes */}

        <Route path='/DABA/Home' element={<DABA />} />
        <Route path='/DABA/Fixtures' element={<DABAFixtures />} />
        <Route path='/DABA/Table' element={<DABATable />} />
        <Route path='/DABA/Teams' element={<DABATeams />} />
        <Route path='/DABA/Stats' element={<DABAStats />} />
        <Route path='/DABA/Home/Player/:id' element={<DABASinglePlayer />} />


        
       

        {/* End of Tables and Fixtures */}



      </Routes>

      {/* <ReactQueryDevtools initialIsOpen={false} />      */}
    </div>
  )
}

export default App
