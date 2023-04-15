import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider, Routes } from 'react-router-dom';
import CoverPage from './pages/CoverPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import NewElectionPage from './pages/NewElectionPage';
import HomePageLayout from './pages/HomePageLayout';
import NoElectionPage from './pages/NoElectionPage';
import ViewElectionPage from './pages/ViewElectionPage';
import MyProfilePage from './pages/MyProfilePage';
import ContactUsPage from './pages/ContactUsPage';
import AboutPage from './pages/AboutPage';
import ElectionCard from './components/ElectionCard';
import SignUpPageII from './pages/SignUpPageII';
import AboutPageFromCover from './pages/AboutPageFromCover';
import ContactUsPageFromCover from './pages/ContactUsPageFromCover';

function App() {

  const router = createBrowserRouter(createRoutesFromElements(
    <>
      <Route path='/' element={<CoverPage />} />
      <Route path='about' element={<AboutPageFromCover />} />
      <Route path='contactUs' element={<ContactUsPageFromCover />} />
      <Route path='login' element={<LoginPage />} />
      <Route path='signup' element={<SignUpPage />} />
      <Route path='signup2' element={<SignUpPageII />} />
      <Route path='home' element={<HomePageLayout />}>
        <Route index element={<NoElectionPage />} />
        <Route path='createNewElection' element={<NewElectionPage />} />
        <Route path='viewElection/:id' element={<ViewElectionPage />} />
        <Route path='myprofile' element={<MyProfilePage />} />
        <Route path='contactUs' element={<ContactUsPage />} />
        <Route path='about' element={<AboutPage />} />
        <Route path='electionCard' element={<ElectionCard />} />
      </Route>
    </>
  ))


  return (
    <RouterProvider router={router} />
  );
}

export default App;
