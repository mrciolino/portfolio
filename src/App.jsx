// import { ProjectView, PaperResumeView, AboutView, HeroView, FooterView, HeaderView } from "./views.jsx";
import Container from 'react-bootstrap/Container';
import React, { lazy, Suspense } from 'react';
import { LoadingView } from './views.jsx';
import './App.scss';

const HeaderView = lazy(() => import('./views.jsx').then(module => ({ default: module.HeaderView })));
const HeroView = lazy(() => import('./views.jsx').then(module => ({ default: module.HeroView })));
const AboutView = lazy(() => import('./views.jsx').then(module => ({ default: module.AboutView })));
const PaperResumeView = lazy(() => import('./views.jsx').then(module => ({ default: module.PaperResumeView })));
const ProjectView = lazy(() => import('./views.jsx').then(module => ({ default: module.ProjectView })));
const FooterView = lazy(() => import('./views.jsx').then(module => ({ default: module.FooterView })));

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
