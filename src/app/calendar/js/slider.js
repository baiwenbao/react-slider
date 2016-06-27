import styles from '../sass/slider.scss';
import React, {
    Component
}
from 'react';
export default class Slider extends Component {
    constructor(props) {
        super(props);
        this.timer = null;
        this.startX = 0;
        this.items = [];
    }
    static defaultProps = {
        width: window.innerWidth,
        delay: 4000,
        transition: 0.8
    }
    state = {
        index: 1,
        startX: 0,
        startTime: '',
        isTouch: false,
        direction: 'right'
    }
    next() {
        let {
            children, onSlide
        } = this.props;
        let {
            index
        } = this.state;
        let len = children.length;
        ++index;
        index = index === len ? 0 : index;
        this.setState({
            index,
            direction: 'right'
        });
        onSlide('next');
    }

    prev() {
        let {
            children, onSlide
        } = this.props;
        let {
            index
        } = this.state;
        let len = children.length;
        --index;
        index = index === -1 ? len - 1 : index;
        this.setState({
            index,
            direction: 'left'
        });
        onSlide('prev');
    }

    loop() {
        let {
            delay
        } = this.props;
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
        this.startX = e.touches[0].pageX;
        let items = this.refs.list.childNodes;
        items = Array.from(items);
        this.items = items.map((item) => {
            let n = item.style.WebkitTransform.match(/translate3d\(([\-\d]+)/);
            return n[1];
        });
        this.setState({
            isTouch: true,
            startTime: new Date()
        });
    }

    handleTouchMove(e) {
        e.preventDefault();
        let startX = this.startX;
        let curX = e.changedTouches[0].pageX;
        let moveX = curX - startX;
        let items = this.refs.list.childNodes;
        items = Array.from(items);
        items.forEach((item, i) => {
            item.style.WebkitTransform = `translate3d(${parseInt(this.items[i]) + moveX}px, 0px, 0px)`;
        });
        if (!this.state.isTouch || e.touches.length > 1) {
            return;
        }
    }

    handleTouchEnd(e) {
        if (!this.state.isTouch) {
            return;
        }
        let {
            width, isAuto
        } = this.props;
        let {
            startTime
        } = this.state;
        this.setState({
            isTouch: false
        });
        let tt = e.changedTouches[0];
        let offX = tt.pageX - this.startX;
        let endTime = new Date();
        let touchTime = endTime.getTime() - startTime.getTime();

        if ((touchTime <= 400 && Math.abs(offX) >= 5) || Math.abs(offX) >= width / 2) {
            if (offX < 0) {
                this.next();
            } else {
                this.prev();
            }
        } else {
            let items = this.refs.list.childNodes;
            items = Array.from(items);
            items.forEach((item, i) => {
                item.style.WebkitTransform = `translate3d(${this.items[i]}px, 0px, 0px)`;
            });
            this.setState({
                direction: ''
            });
        }

        isAuto && this.loop();
    }
    componentWillUnmount() {
        this.stop();
    }
    componentDidMount() {
        let {
            isAuto
        } = this.props;
        isAuto && this.loop();
    }

    render() {
        let {
            children
        } = this.props;
        let {
            transition
        } = this.props;
        let {
            isDot, width
        } = this.props;
        let {
            index, isTouch, direction
        } = this.state;
        let len = children.length;
        let prev = index === 0 ? len - 1 : index - 1;
        let next = index === len - 1 ? 0 : index + 1;
        let transformType = 'WebkitTransform';
        let style = (i) => {
            if (i === prev) {
                return {
					[transformType]: `translate3d(${-1 * width}px, 0px, 0px)`,
                    transition: direction === 'left' || isTouch ? '0s' : `${transition}s`
                };
            } else if (i === index) {
                return {
					[transformType]: `translate3d(0px, 0px, 0px)`,
                    transition: isTouch ? '0s' : `${transition}s`
                };
            } else if (i === next) {
                return {
					[transformType]: `translate3d(${1 * width}px, 0px, 0px)`,
                    transition: direction === 'right' || isTouch ? '0s' : `${transition}s`
                };
            } else {
                return null;
            }
        };


        return (
            <div className={styles.root} onTouchStart={this.handleTouchStart.bind(this)} onTouchMove={this.handleTouchMove.bind(this)} onTouchEnd={this.handleTouchEnd.bind(this)} onTouchCancel={this.handleTouchEnd.bind(this)}>
			<ul ref="list">
			{
				React.Children.map(children, (v, i) => {
					if (i === prev) {
						return <li className={styles.item} key={i} style={style(i)}>{v}</li>;
					} else if (i === index) {
						return <li className={styles.item} key={i} style={style(i)}>{v}</li>;
					} else if (i === next) {
						return <li className={styles.item} key={i} style={style(i)}>{v}</li>;
					} else {
						return null;
					}
				})
			}
			</ul>
		</div>
        );
    }
}
