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
		let {delay} = this.props;
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
        e.preventDefault();
        if (this.state.isTouch || e.touches.length > 1) {
            return;
        }
        this.stop();
        let tt = e.touches[0];
        this.setState({
            isTouch: true,
            startX: tt.pageX,
            startTime: new Date()
        });
	}

	handleTouchMove(e) {
        e.preventDefault();
        if (!this.state.isTouch || e.touches.length > 1) {
            return;
        }
        let tt = e.changedTouches[0];
        let dis = tt.pageX - this.state.startX;
        this.setState({
            offX: dis
        });
	}

	handleTouchEnd(e) {
        if (!this.state.isTouch) {
            return;
        }
		let {width, isAuto} = this.props;
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
		let {isAuto} = this.props;
		isAuto && this.loop();
	}

	render() {
		let {children} = this.props;
		let {transition} = this.props;
		let {isDot, width} = this.props;
		let {index, offX, isTouch, direction} = this.state;
//		transition = isTouch ? 0 : `${transition}s`;
		let len = children.length;
		let prev = index === 0 ? len - 1 : index - 1;
		let next = index === len - 1 ? 0 : index + 1;
        let transformType = document.documentElement.style.transform ? 'transform' : 'WebkitTransform';
		let style = (i) => {
			if (i === prev) {
				return {
					[transformType]: `translate3d(${-1 * width + offX}px,0px,0px)`,
					transition: direction === 'left' || isTouch ? '0s' : `${transition}s`
				};
			} else if (i === index) {
				return {
					[transformType]: `translate3d(${offX}px,0px,0px)`,
					transition: isTouch ? '0s' : `${transition}s`
				};
			} else if (i === next) {
				return {
					[transformType]: `translate3d(${1 * width + offX}px,0px,0px)`,
					transition: direction === 'right' || isTouch ? '0s' : `${transition}s`
				};
			} else {
				return null;
			}
		};


		return (
			<div className="root" onTouchStart={this.handleTouchStart.bind(this)} onTouchMove={this.handleTouchMove.bind(this)} onTouchEnd={this.handleTouchEnd.bind(this)} onTouchCancel={this.handleTouchEnd.bind(this)}>
			<ul>
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
						return <a key={i} className={this.state.index === i ? 'active' : 'dot'} style={{transition: `${transition}s`}}></a>;
					})
				}
				</div> : null
			}
		</div>
		);
	}
}