import React, {
    Component
}
from 'react';
import reactDom from 'react-dom';

export default class Slider extends Component {
	constructor(props) {
		super(props);
        this.timer = null;
	}
	static defaultProps = {
		width: window.innerWidth,
		delay: 4000,
		transition: 0.8
	}
    
    static propTypes = {
        isAuto: React.PropTypes.bool.isRequired,
        isDot: React.PropTypes.bool.isRequired
    }
    
    state = {
			index: 0,
			startX: 0,
			offX: 0,
			startTime: '',
			isTouch: false,
			direction: 'right'
    }

	next() {
		let {children} = this.props;
		let {index} = this.state;
		let len = children.length;
		++index;
		index = index === len ? 0 : index;
		this.setState({
			index,
			direction: 'right'
		});
	}

	prev() {
		let {children} = this.props;
		let {index} = this.state;
		let len = children.length;
		--index;
		index = index === -1 ? len - 1 : index;
		this.setState({
			index,
			direction: 'left'
		});
	}

	loop() {
		let {delay} = this.props.params;
		let fn = () => {
			this.next();
            this.timer = setTimeout(fn, delay);
		};
		this.timer = setTimeout(fn, delay);
	}

	stop() {
		clearTimeout(this.timer);
	}

	handleTouchStart(e) {
		this.stop();
		let tt = e.targetTouches[0];
		this.setState({
			isTouch: true,
			startX: tt.pageX,
			startTime: new Date()
		});
		e.preventDefault();
	}

	handleTouchMove(e) {
		let tt = e.changedTouches[0];
		let dis = tt.pageX - this.state.startX;
		this.setState({
			offX: dis
		});
        /*let list = this.refs.list;
        list.style.transform = `translate3d(${dis}px,0,0)`;*/
        
		e.preventDefault();
	}

	handleTouchEnd(e) {
		let {width, isAuto} = this.props.params;
		let {startX, startTime} = this.state;
		this.setState({
			isTouch: false,
			offX: 0
		});
        
		let tt = e.changedTouches[0];
		let offX = tt.pageX - startX;
		let endTime = new Date();
		let touchTime = endTime.getTime() - startTime.getTime();

		if ((touchTime <= 400 && Math.abs(offX) >= 5) || Math.abs(offX) >= width / 2) {
			if (offX < 0) {
				this.next();
			} else {
				this.prev();
			}
		} else {
			this.setState({
				offX: 0,
				direction: ''
			});
		}

		isAuto && this.loop();
	}
	componentWillUnmount() {
		this.stop();
	}
	componentDidMount() {
//		let {list} = this.refs;
		let {isAuto} = this.props.params;
		/*let fn = () => {
			this.setState({
				isBusy: false
			});
		};*/
//		list.addEventListener('webkitTransitionEnd', fn, false);
		isAuto && this.loop();
	}

	render() {
		let {children} = this.props;
		let {transition} = this.props.params;
		let {isDot, width} = this.props.params;
		let {index, offX, isTouch, direction} = this.state;
//		transition = isTouch ? 0 : `${transition}s`;
		let len = children.length;
		let prev = index === 0 ? len - 1 : index - 1;
		let next = index === len - 1 ? 0 : index + 1;
        let transformType = document.documentElement.style.transform ? 'transform' : 'WebkitTransform';
		let style = (i) => {
			if (i === prev) {
				return {
					[transformType]: `translate3d(${-1 * width + offX}px,0,0)`,
					transition: direction === 'left' || isTouch ? '0s' : `${transition}s`
				};
			} else if (i === index) {
				return {
					[transformType]: `translate3d(${offX}px,0,0)`,
					transition: isTouch ? '0s' : `${transition}s`
				};
			} else if (i === next) {
				return {
					[transformType]: `translate3d(${1 * width + offX}px,0,0)`,
					transition: direction === 'right' || isTouch ? '0s' : `${transition}s`
				};
			} else {
				return null;
			}
		};


		return (
			<div className="main">
			<ul ref="list" onTouchStart={this.handleTouchStart.bind(this)} onTouchMove={this.handleTouchMove.bind(this)} onTouchEnd={this.handleTouchEnd.bind(this)}>
			{
				React.Children.map(children, (v, i) => {
					if (i === prev) {
						return <li className="item" key={i} style={style(i)}>{v}</li>;
					} else if (i === index) {
						return <li className="item" key={i} style={style(i)}>{v}</li>;
					} else if (i === next) {
						return <li className="item" key={i} style={style(i)}>{v}</li>;
					} else {
						return null;
					}
				})
			}
			</ul>
			{
				isDot ? <div className="dots">
				{
					children.map((v, i) => {
						return <a key={i} className={this.state.index === i ? 'active' : 'dot'} style={{transition:`${transition}s`}}></a>;
					})
				}
				</div> : null
			}
		</div>
		);
	}
}