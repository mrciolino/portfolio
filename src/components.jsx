import { DarkModeSwitch } from 'react-toggle-dark-mode';
import React, { useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import { Document, Page, pdfjs } from 'react-pdf';
import Card from 'react-bootstrap/Card';
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
    return (
        <>
            <Card className='project col-sm-12 col-md-4 col-lg-3 flex-grow-1'>
                <Card.Img variant="top" src={props.image} style={{ objectFit: 'cover' }} height="150vw" alt={props.title} />
                <Card.Body>
                    <Card.Title as="h4">{props.title}</Card.Title>
                    <Card.Text>{props.description}</Card.Text>
                    {Object.entries(props.links).map(([key, value]) => (
                        <Button className={`m-1 primary`} key={key} variant="primary" size="sm" href={value[0]}>
                            <Icon className="m-1" icon={value[1]} /> {key}
                        </Button>))}
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

    //eslint-disable-next-line
    const [file, setFile] = useState('assets/docs/Matthew_Ciolino_Resume.pdf');
    const options = { cMapUrl: 'cmaps/', cMapPacked: true, standardFontDataUrl: 'standard_fonts/', };
    useEffect(() => { pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`; });

    const pdfWrapperRef = React.useRef();
    const [width, setWidth] = React.useState();

    React.useEffect(() => {
        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                setWidth(entry.target.clientWidth * 0.95);
            }
        });

        resizeObserver.observe(pdfWrapperRef.current);

        return () => {
            resizeObserver.disconnect();
        };
    }, []);

    return (
        <Accordion className='col-12 accordion'>
            <Accordion.Item eventKey="0">
                <Accordion.Header>
                    {props.accordion_text}
                    <small className="text-muted">&nbsp;{props.accordion_text_muted}</small>
                </Accordion.Header>
                <Accordion.Body>
                    <div className='col-12 text-center' ref={pdfWrapperRef}>
                        <div className="d-grid gap-2 pb-2" id="resume_width_guide">
                            <Button className='m1 text-white' variant="primary" size="sm" href={file}>Download Resume</Button>
                        </div>
                        <Document file={file} options={options} renderTextLayer={false} renderInteractiveForms={false}>
                            <Page
                                width={width || undefined}
                                pageNumber={1}
                            />
                        </Document>
                    </div>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion >
    );
}


const Hero = (props) => {
    return (
        <section id="hero" className="d-flex flex-column justify-content-center" data-aos="zoom-in" data-aos-delay="50" style={{ backgroundImage: "url(assets/images/hero-bg-ds.webp)" }}>
            <div className="container" data-aos="fade-right" data-aos-delay="500">
                <h1>Matthew Ciolino</h1>
                <TypedReact strings={props.titles} />
                <div className="social-links">
                    {Object.entries(props.social).map(([link, icon]) => (<a aria-label={link} href={link} key={link}><Icon icon={icon} /></a>))}
                </div>
            </div>
        </section >

    );
}


const Footer = () => {
    return (
        <footer id="footer">
            <div className="container">
                <h5>Matthew Ciolino</h5>
                <p>Feel free to email me below for any opportunities. </p>
                <div className="social-links">
                    <a aria-label="email" href="mailto:mrciolino@alum.lehigh.edu"><Icon icon="bx:bx-envelope" /></a>
                </div>
                <div>
                    Made with <Icon icon="bx:bx-heart" color="#0275d8" /> and <Icon icon="bx:bx-code-alt" color="#0275d8" /> using
                    &nbsp;<a aria-label="React" href="https://reactjs.org/"><Icon icon="logos:react">React</Icon></a> and
                    &nbsp;<a aria-label="Bootstrap" href="https://getbootstrap.com/"><Icon icon="logos:bootstrap">Bootstrap</Icon></a>.
                </div>
            </div>
        </footer>
    );
}

const Header = (props) => {


    const setThemeInStorage = (theme) => {
        localStorage.setItem('theme', theme)
    }

    const getThemeInStorage = () => {
        return localStorage.getItem('theme') || 'light';
    }

    const [darkTheme, setDarkTheme] = useState(getThemeInStorage() === 'dark');

    useEffect(() => {
        const root = document.getElementById('root');
        root?.style.setProperty("--bg-color", darkTheme ? 'rgb(33, 33, 33)' : 'rgb(255, 255, 255)');
        root?.style.setProperty("--off-bg-color", darkTheme ? 'rgb(66, 66, 66)' : '#e9e9e9');
        root?.style.setProperty("--light-color", darkTheme ? '#fefefe' : '#45505b');
        root?.style.setProperty("--dark-shadow", darkTheme ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)');
        root?.style.setProperty("--hero-blur", darkTheme ? 'rgba(33, 33, 33, 0.6)' : 'rgba(255, 255, 255, 0.8)');
        root?.style.setProperty("--text-color", darkTheme ? '#fefefe' : '#000000');
        setThemeInStorage(darkTheme ? 'dark' : 'light');
    }, [darkTheme]);

    return (
        <header id="header" className="d-flex flex-column justify-content-center">
            <DarkModeSwitch className="darkmodeswitch m-4" onChange={setDarkTheme} checked={darkTheme} />
            <nav id="navbar" className="navbar nav-menu">
                <ul>
                    {Object.entries(props).map(([key, value]) => (
                        <li key={key}>
                            <Link activeClass="active" duration={500} offset={-200} smooth="easeInOutSine" className="nav-link" spy to={value.div_id}>
                                <Icon icon={value.icon} /><span>{value.text}</span>
                            </Link>
                        </li>))}
                </ul>
            </nav>
        </header>
    );
}

export { ProjectCards, Papers, Resume, SectionIntro, Hero, Footer, Header };

