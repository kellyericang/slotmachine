import React from 'react';
import './Footer.css';
import instaLogo from "./insta-logo.png";
import githubLogo from "./github-logo.png";
import linkedinLogo from "./linkedin-logo.png";

function Footer() {

	return (
		<footer className="footer">
			<span className="footerText">This page was made with React and CSS!</span>
			<span className="icons">
				<a href="https://www.instagram.com/kellycraftng/">
					<img src={instaLogo} alt="instagram-logo"></img> 
				</a>
				<a href="https://github.com/kellyericang">
					<img src={githubLogo} alt="github-logo"></img> 
				</a>
				<a href="https://www.linkedin.com/in/ngkelly1/">
					<img src={linkedinLogo} alt="linkedin-logo"></img> 
				</a>
			</span>
		</footer>
		
	)
}

export default Footer;