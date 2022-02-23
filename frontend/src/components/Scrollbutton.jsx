import React, {useState} from 'react';
import { RiArrowUpSLine } from 'react-icons/ri';
import "./style/artworks.css";

const ScrollButton = () =>{

const [visible, setVisible] = useState(false)

const toggleVisible = () => {
	const scrolled = document.documentElement.scrollTop;
	if (scrolled > 300){
	setVisible(true)
	}
	else if (scrolled <= 300){
	setVisible(false)
	}
};

const scrollToTop = () =>{
	window.scrollTo({
	top: 0,
	behavior: 'smooth'
	/* you can also use 'auto' behaviour
		in place of 'smooth' */
	});
};

window.addEventListener('scroll', toggleVisible);

return (
	
	<RiArrowUpSLine className='btn-up' onClick={scrollToTop}
		style={{display: visible ? 'inline' : 'none'}} />
	
);
}

export default ScrollButton;
