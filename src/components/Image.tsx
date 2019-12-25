import * as React from "react";
import withStyles from '@material-ui/styles/withStyles';
import createStyles from "@material-ui/styles/createStyles";
import classNames from "classnames";
import CircularProgress from "@material-ui/core/CircularProgress";

interface ImageProps {
    src: string;
    style?: any;
    className?: string;
    classes: {
        [key: string]: string;
    }
}

const styles = () => createStyles({
    root: {
        position: 'relative',
        overflow: 'hidden'
    },
    image: {
        top: 0,
        left: 0,
        position: 'absolute',
        width: '100%',
        height: '100%',
        opacity: 0,
        transition: 'opacity 0.225s linear'
    },
    loaded: {
        opacity: 1
    },
    overlay: {
        top: 0,
        left: 0,
        position: 'absolute',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#d2d2d2'
    }
});

class Image extends React.Component<ImageProps, { loaded: boolean }> {

    constructor(props: ImageProps) {
        super(props);
        this.state = { loaded: false };
    }

    componentDidUpdate(prevProps: ImageProps, prevState: { loaded: boolean }) {
        if (prevProps.src !== this.props.src) {
            this.setState({ loaded: false });
        }
    }

    render() {
        const { classes, src, className, style } = this.props;
        const { loaded } = this.state;
        return (
            <div className={classNames(classes.root, className)}>
                <img
                    style={loaded ? style : null}
                    src={src}
                    onLoad={() => this.setState({ loaded: true })}
                    className={classNames(classes.image, loaded ? classes.loaded : null)}
                />
                {!loaded &&
                    <div
                        className={classNames(classes.overlay)}
                    >
                        <CircularProgress />
                    </ div>}
            </div>
        );
    }
}

export default (withStyles(styles as any)(Image));