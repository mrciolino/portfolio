import { ProjectView, PaperResumeView, AboutView, HeroView, FooterView, HeaderView } from "./views.jsx";
import Container from 'react-bootstrap/Container';
import React from 'react';
import './App.scss';

const App = () => {

  return (
    <Container>
      <HeaderView />
      <HeroView />
      <AboutView />
      <PaperResumeView />
      <ProjectView />
      <FooterView />
    </Container>
  )
};

export default App;
