import * as React from "react";
import withStyles from "@material-ui/styles/withStyles";
import createStyles from "@material-ui/styles/createStyles";
import Button from "@material-ui/core/Button";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from "@material-ui/core/TextField";
import Slider from '@material-ui/core/Slider';
import Image from "./components/Image";
import { baseUrl, colorSchemes } from "./utils/Constants";
import { randomString } from "./utils/Functions";
import classNames from "classnames";

interface AppProps {
    classes: {
        [key: string]: string;
    }
}

interface AppState {
    style?: 'fluid' | 'blur' | 'flat';
    complexity?: number;
    seed?: string;
    colors?: string[];
    src?: string;
    size?: {
        width: number,
        height: number
    }
}

const styles = () => createStyles({
    root: {
        display: 'flex',
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundColor: '#d2d2d2',
        paddingTop: 24,
        paddingBottom: 24
    },
    colorScheme: {
        padding: 6,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    colorSchemeItem: {
        width: 24,
        height: 24,
        margin: 4
    },
    image: {
        height: 400,
        width: 400
    },
    small: {
        height: '90vw',
        width: '90vw',
        maxWidth: 400,
        maxHeight: 400
    },
    controls: {
        height: '100%',
        padding: 24
    },
    controlItem: {
        margin: 6,
        width: '100%'
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    column: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

class App extends React.Component<AppProps, AppState> {
    debounce: NodeJS.Timeout = undefined;
    rootElement: HTMLElement = document.getElementById('app');

    constructor(props: AppProps) {
        super(props);
        this.state = {
            style: 'fluid',
            complexity: 10,
            seed: 'random',
            colors: ["FFE066", "247BA0", "70C1B3"],
            src: [baseUrl, 'fluid', 0.5, "random", "FFE066", "247BA0", "70C1B3"].join('/'),
            size: {
                width: this.rootElement.getBoundingClientRect().width,
                height: this.rootElement.getBoundingClientRect().height
            }
        };
        addEventListener('resize', () => {
            const rect = this.rootElement.getBoundingClientRect();
            const size = { width: rect.width, height: rect.height };
            this.setState({ size });
        });
    }

    changeState = (values: AppState, timeout: number) => {
        this.setState(values);
        if (this.debounce) {
            clearTimeout(this.debounce);
        }
        this.debounce = setTimeout(() => {
            const { style, complexity, seed, colors } = this.state;
            this.setState({ src: [baseUrl, style, complexity / 20, seed, ...colors].join('/') });
        }, timeout);
    };

    shuffle = () => {
        const style = ['fluid', 'flat', 'blur'][Math.floor(Math.random() * 3)] as 'fluid' | 'blur' | 'flat';
        const colors = colorSchemes[Math.floor(Math.random() * colorSchemes.length)];
        const complexity = Math.floor(Math.random() * 21);
        const seed = randomString(12);
        this.changeState({ style, colors, complexity, seed }, 50);
    };

    download = () => {
        const { src } = this.state;
        const a = document.createElement('a');
        a.setAttribute('href', src);
        a.setAttribute('download', 'image');
        document.body.appendChild(a);
        const i = document.createElement('img');
        i.setAttribute('src', src);
        a.appendChild(i);
        a.click();
        document.body.removeChild(a);
    };

    renderColorScheme = (scheme: string[]) => {
        const { classes } = this.props;
        return (
            <div className={classes.colorScheme}>
                {scheme.map((color: string) =>
                    <div key={color} className={classes.colorSchemeItem} style={{ backgroundColor: '#' + color }} />
                )}
            </div>
        );
    };

    render() {
        const { classes } = this.props;
        const { style, complexity, seed, colors, src, size } = this.state;
        return (
            <div className={classNames(classes.root, size.width > 680 ? classes.row : classes.column)}>
                <Image src={src} className={classNames(classes.image, size.width < 680 ? classes.small : null)} />
                <div className={classNames(classes.controls, classes.column)}>
                    <Slider
                        value={complexity}
                        onChange={(event: any, newValue: number) => this.changeState({ complexity: newValue }, 330)}
                        valueLabelDisplay="auto"
                        className={classes.controlItem}
                        min={0}
                        max={20}
                    />
                    <TextField
                        value={seed}
                        className={classes.controlItem}
                        onChange={(e) => this.changeState({ seed: e.target.value }, 500)}
                    />
                    <Select
                        value={style}
                        className={classes.controlItem}
                        onChange={(e) => this.changeState({ style: e.target.value as any }, 100)}
                    >
                        <MenuItem value={'blur'}>Blur</MenuItem>
                        <MenuItem value={'flat'}>Flat</MenuItem>
                        <MenuItem value={'fluid'}>Fluid</MenuItem>
                    </Select>
                    <Select
                        value={colors}
                        renderValue={this.renderColorScheme}
                        className={classes.controlItem}
                        onChange={(e) => this.changeState({ colors: e.target.value as any }, 100)}
                    >
                        {colorSchemes.map(scheme =>
                            <MenuItem key={scheme + ''} value={scheme}>
                                {this.renderColorScheme(scheme)}
                            </MenuItem>
                        )}
                    </Select>
                    <div className={classes.row}>
                        <Button
                            onClick={this.shuffle}
                            variant="contained"
                            className={classes.controlItem} >
                            {'Shuffle'}
                        </Button>
                        <Button
                            onClick={this.download}
                            color="primary"
                            variant="contained"
                            className={classes.controlItem} >
                            {'Donwload'}
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(styles as any)(App);
