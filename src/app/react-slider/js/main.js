import React, {
	Component
}
from 'react';
import reactDom from 'react-dom';

import Slider from './slider';
//import CSSModules from 'react-css-modules';
//import '../sass/main';
let list = [
	{
		img: 'http://www.bz55.com/uploads/allimg/150309/139-150309101A0.jpg'
	},
	{
		img: 'http://www.bz55.com/uploads/allimg/150309/139-150309101F7.jpg'
	},
	{
		img: 'http://www.bz55.com/uploads/allimg/150309/139-150309101F2.jpg'
	}
];

export default class Hello extends Component {
	constructor(props) {
		super(props);
		this.state = {
			index: 0
		}
	}
	render() {
		let n = this.state.index;
		return (
			<Slider params={{transition: 0.5,delay: 4000,isAuto: true,isDot: true,width: window.innerWidth}}>{
				list.map((v, i) => {
					return (
						<div key={i}>
							<img src={v.img} />
							</div>
					);
				})
			}</Slider>
		)
	}
}
reactDom.render(<Hello />,
	document.getElementById('root')
);
