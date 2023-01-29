import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import React, { useEffect } from 'react';
import { Icon } from '@iconify/react';
import { Link } from "react-scroll";
import Typed from 'typed.js';


const SectionIntro = (props) => {
    return (
        <div className="col-12 text-center section-title">
            <h1>{props.title}</h1>
            <p className="small">{props.description}</p>
            <hr className="m-4" />
        </div>
    );
}

class TypedReact extends React.Component {

    componentDidMount() {
        const { strings } = this.props;
        const options = {
            strings: strings,
            loop: true,
            typeSpeed: 100,
            backSpeed: 50,
            backDelay: 2000
        };
        this.typed = new Typed(this.el, options);
    }

    componentWillUnmount() {
        this.typed.destroy();
    }

    render() {
        return (
            <div className="wrap">
                <div className="type-wrap">
                    <p>I'm a <span style={{ whiteSpace: 'pre' }} ref={(el) => { this.el = el; }} /></p>
                </div>
            </div>
        );
    }
}

////////////////////// Exported Componets Below ////////////////////////////////

const ProjectCards = (props) => {
    // check out old portfolio commits - flask - node - react to add to a readme

    return (
        <>
            <Card className='project col-sm-12 col-md-4 col-lg-3 flex-grow-1'>
                <Card.Img variant="top" src={props.image} style={{ objectFit: 'cover' }} height="150vw" />
                <Card.Body>
                    <Card.Title>{props.title}</Card.Title>
                    <Card.Text>{props.description}</Card.Text>
                    {Object.entries(props.links).map(([key, value]) => (<Button className={`m-1 primary`} key={key} variant="primary" size="sm" href={value}>{key}</Button>))}
                </Card.Body>
            </Card>
        </>
    );
}

const Papers = (props) => {
    return (
        <Accordion className='col-12 accordion'>
            <Accordion.Item eventKey="0">
                <Accordion.Header>
                    {props.accordion_text}
                    <small className="text-muted">&nbsp;{props.accordion_text_muted}</small>
                </Accordion.Header>
                <Accordion.Body>
                    <div className="text-justify">
                        <div id="arxivfeed">Loading Papers...</div>
                    </div>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}

const Resume = (props) => {

    useEffect(() => {
        let padding = 1.32;
        let aspect_ratio = 8.5 / 11;
        let width = document.getElementById("resume").clientWidth;
        document.getElementById("resume_pdf").style.height = (width * aspect_ratio * padding) + "px";
    });

    return (
        <Accordion className='col-12 accordion'>
            <Accordion.Item eventKey="0">
                <Accordion.Header>
                    {props.accordion_text}
                    <small className="text-muted">&nbsp;{props.accordion_text_muted}</small>
                </Accordion.Header>
                <Accordion.Body>
                    <div className='col-12 text-center'>
                        <div className="d-grid gap-2 pb-2">
                            <Button className='m1 text-white' variant="primary" size="sm" href={props.pdf}>Download Resume</Button>
                        </div>
                        <object id="resume_pdf" data={"assets/docs/Matthew_Ciolino_Resume.pdf#toolbar=0&navpanes=0&scrollbar=0"} type='application/pdf' width="100%" height="700px">
                            Unable to load the resume at this time.
                        </object>
                    </div>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}


const Hero = (props) => {
    return (
        <section id="hero" className="d-flex flex-column justify-content-center" data-aos="zoom-in" data-aos-delay="50" style={{ backgroundImage: "url(assets/images/hero-bg-ds.png)" }}>
            <div className="container" style={{ margin: `0 0 5% 0` }} data-aos="fade-right" data-aos-delay="500">
                <h1>Matthew Ciolino</h1>
                <TypedReact strings={props.titles} />
                <div className="social-links">
                    {Object.entries(props.social).map(([link, icon]) => (<a href={link} key={link}><Icon icon={icon} /></a>))}
                </div>
            </div>
        </section >

    );
}


const Footer = () => {
    return (
        <footer id="footer">
            <div className="container">
                <h3>Matthew Ciolino</h3>
                <p>Feel free to email me below for any opportunities. </p>
                <div className="social-links">
                    <a href="mailto:mrciolino@alum.lehigh.edu"><Icon icon="bx:bx-envelope" /></a>
                </div>
                <div>
                    Made with <Icon icon="bx:bx-heart" color="#0275d8" /> and <Icon icon="bx:bx-code-alt" color="#0275d8" /> using
                    &nbsp;<a href="https://reactjs.org/"><Icon icon="logos:react">React</Icon></a> and
                    &nbsp;<a href="https://getbootstrap.com/"><Icon icon="logos:bootstrap">Bootstrap</Icon></a>.
                </div>
            </div>
        </footer>
    );
}

const Header = (props) => {
    return (
        <header id="header" className="d-flex flex-column justify-content-center">
            <nav id="navbar" className="navbar nav-menu">
                <ul>
                    {Object.entries(props).map(([key, value]) => (
                        <li key={key}><Link activeClass="active" duration={500} offset={-200} smooth="easeInOutSine" className="nav-link" spy to={value.div_id}>
                            <Icon icon={value.icon} /><span>{value.text}</span></Link></li>))}
                </ul>
            </nav>
        </header>
    );
}

export { ProjectCards, Papers, Resume, SectionIntro, Hero, Footer, Header };
