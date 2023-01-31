import { ProjectView, PaperResumeView, AboutView, HeroView, FooterView, HeaderView, LoadingView } from "./views.jsx";
import Container from 'react-bootstrap/Container';
import React, { Suspense } from 'react';
import './App.scss';

const App = () => {

  return (
    <Suspense fallback={LoadingView}>
      <Container>
        <HeaderView />
        <HeroView />
        <AboutView />
        <PaperResumeView />
        <ProjectView />
        <FooterView />
      </Container>
    </Suspense >
  )
};

export default App;
