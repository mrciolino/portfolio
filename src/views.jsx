import { SectionIntro, ProjectCards, Papers, Resume, Hero, Header, Footer } from "./components.jsx";
import Container from 'react-bootstrap/Container';
import Data from './data.json';
import 'aos/dist/aos.css';
import AOS from 'aos';

if (window.innerWidth >= 768) {
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false,
        offset: 200,
        delay: 0,
    });
}
else {
    AOS.init({
        duration: 0,
        easing: 'ease-in-out',
        once: true,
        mirror: false,
        offset: 0,
        delay: 0,
    });
}


const PapersView = () => {
    return (
        <Container id="papers" className="d-flex flex-wrap justify-content-center p-3 col-12">
            <SectionIntro {...Data["Papers"]['PapersIntro']} />
            <Papers {...Data["Papers"]} />
        </Container>
    );
}

const ResumeView = () => {
    return (
        <Container id="resume" className="d-flex flex-wrap justify-content-center p-3 col-12">
            <SectionIntro {...Data["Resume"]['ResumeIntro']} />
            <Resume {...Data["Resume"]} />
        </Container>
    );
}


////////////////////// Exported Componets Below ////////////////////////////////


const ProjectView = () => {
    return (
        <Container id="projects" className="d-flex flex-wrap justify-content-center p-3 col-12" data-aos="zoom-in" data-aos-delay="100">
            <SectionIntro {...Data["Projects"]['ProjectsIntro']} />
            <ProjectCards {...Data["Projects"]['xEval']} />
            <ProjectCards {...Data["Projects"]['Transformers']} />
            <ProjectCards {...Data["Projects"]['Feature Projects']} />
            <ProjectCards {...Data["Projects"]['Crowd Counter & Tracker']} />
            <ProjectCards {...Data["Projects"]['Portfolio Website']} />
            <ProjectCards {...Data["Projects"]['Single Image Super Resolution']} />
        </Container>
    );
}

const PaperResumeView = () => {
    return (
        <Container className="d-flex flex-wrap justify-content-center p-3 col-12" data-aos="zoom-in" data-aos-delay="100">
            <Container className="col-lg-6 col-sm-12">
                <PapersView />
            </Container>
            <Container className="col-lg-6 col-sm-12">
                <ResumeView />
            </Container>
        </Container>
    );
}


const AboutView = () => {
    return (
        <Container id="about" className="d-flex flex-wrap justify-content-center p-3" data-aos="zoom-in" data-aos-delay="100">
            <SectionIntro {...Data["About"]['AboutIntro']} />
        </Container>
    );
}

const HeroView = () => {
    return (
        <Container id="home" className="d-flex flex-wrap justify-content-center p-3">
            <Hero {...Data["Hero"]} />
        </Container>
    );
}

const FooterView = () => {
    return (
        <Container id="contact" className="col-12">
            <Footer />
        </Container>
    );
}

const HeaderView = () => {
    return (
        <Header {...Data["Header"]} />
    );
}


export { ProjectView, PaperResumeView, AboutView, HeroView, FooterView, HeaderView };