import * as React from "react";
import withStyles from "@material-ui/styles/withStyles";
import createStyles from "@material-ui/styles/createStyles";
import Button from "@material-ui/core/Button";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from "@material-ui/core/TextField";
import AutoRenew from "@material-ui/icons/AutoRenew";
import Slider from '@material-ui/core/Slider';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import Image from "./components/Image";
import { baseUrl, colorSchemes } from "./utils/Constants";
import { randomString } from "./utils/Functions";
import WelcomeDialog from "./components/WelcomeDialog";
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
    firstVisit?: boolean;
    size?: {
        width: number,
        height: number
    }
}

const styles = () => createStyles({
    root: {
        width: '100%',
        height: 'calc(100% - 48px)',
        minHeight: 'calc(100vh - 112px)',
        overflow: 'hidden',
        backgroundColor: '#dadada',
        position: 'relative',
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
        marginLeft: 4,
        marginRight: 4
    },
    image: {
        height: '80vh',
        width: '80vh',
        maxWidth: 1200,
        maxHeight: 1200,
        boxShadow: '0 0 16px rgba(0,0,0,0.48)'
    },
    small: {
        height: '90vw',
        width: '90vw',
        maxWidth: 400,
        maxHeight: 400
    },
    controls: {
        height: '100%',
        padding: 24,
        backgroundColor: '#ffffff',
        position: 'relative'
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
        justifyContent: 'flex-start'
    },
    typography: {
        width: '100%',
        fontSize: 12,
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        color: 'rgba(0,0,0,0.54)'
    },
    leftBar: {
        position: 'absolute',
        left: 0,
        height: 'calc(100% - 48px)',
        width: 240,
        boxShadow: '0 0 16px rgba(0,0,0,0.28)'
    },
    mobileBar: {
        width: 'calc(100% - 48px)',
        marginTop: 24
    },
    controlsPlaceholder: {
        width: 288,
        height: '100%'
    },
    infoBox: {
        width: 208,
        height: 68,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#ffffff',
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
        fontSize: 16,
        padding: 16,
        backgroundImage: 'url(static/exmpl.jpg)',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        position: 'relative'
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        color: '#2e2e2e',
        fontFamily: 'sans-serif',
        fontSize: 12,
        padding: 12,
        width: 'calc(100% - 24px)',
        textAlign: 'center'
    },
    footerPlaceholder: {
        height: 32,
        width: '100%'
    }
});

class App extends React.Component<AppProps, AppState> {
    debounce: NodeJS.Timeout = undefined;
    rootElement: HTMLElement = document.getElementById('app');

    constructor(props: AppProps) {
        super(props);
        const firstVisit = !localStorage.getItem('lastVisit');
        localStorage.setItem('lastVisit', Date.now() + '');
        this.state = {
            style: 'fluid',
            complexity: 10,
            seed: '2VSUXK4BPJQL',
            colors: ["EF476F", "FFD166", "06D6A0", "118AB2"],
            src: [baseUrl, 'image', 'fluid', 0.5, "2VSUXK4BPJQL", "EF476F", "FFD166", "06D6A0", "118AB2"].join('/'),
            firstVisit,
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
            this.setState({ src: [baseUrl, 'image', style, complexity / 20, seed, ...colors].join('/') });
        }, timeout);
    };

    shuffle = () => {
        const style = ['fluid', 'blur'][Math.floor(Math.random() * 2)] as 'fluid' | 'blur';
        const colors = colorSchemes[Math.floor(Math.random() * colorSchemes.length)];
        const complexity = Math.floor(Math.random() * 21);
        const seed = randomString(12);
        this.changeState({ style, colors, complexity, seed }, 50);
    };

    shuffleSeed = () => {
        const seed = randomString(12);
        this.changeState({ seed }, 50);
    };

    download = () => {
        const { style, complexity, seed, colors } = this.state;
        const url = [baseUrl, 'download', style, complexity / 20, seed, ...colors].join('/');
        const a = document.createElement('a');
        a.setAttribute('href', url);
        a.setAttribute('download', 'image');
        document.body.appendChild(a);
        const i = document.createElement('img');
        i.setAttribute('src', url);
        a.appendChild(i);
        a.click();
        document.body.removeChild(a);
    };

    renderColorScheme = (scheme: string[]) => {
        const { classes } = this.props;
        return (
            <div className={classes.colorScheme}>
                {scheme.map((color: string, index: number) =>
                    <div key={color + index} className={classes.colorSchemeItem} style={{ backgroundColor: '#' + color }} />
                )}
            </div>
        );
    };

    render() {
        const { classes } = this.props;
        const { style, complexity, seed, colors, src, size, firstVisit } = this.state;
        const isMobile = size.width <= 680;
        return (
            <div className={classNames(classes.root, isMobile ? classes.column : classes.row)}>
                {!isMobile && <div className={classes.controlsPlaceholder} />}
                <Image src={src} className={classNames(classes.image, isMobile ? classes.small : null)} />
                <div className={classNames(classes.controls, classes.column, isMobile ? classes.mobileBar : classes.leftBar)}>
                    <FormControl className={classes.controlItem}>
                        <InputLabel>Style</InputLabel>
                        <Select
                            value={style}
                            onChange={(e) => this.changeState({ style: e.target.value as any }, 100)}
                        >
                            <MenuItem value={'blur'}>Gradient</MenuItem>
                            <MenuItem value={'fluid'}>Fluid</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl className={classes.controlItem}>
                        <InputLabel>Colors</InputLabel>
                        <Select
                            value={colors}
                            renderValue={this.renderColorScheme}
                            onChange={(e) => this.changeState({ colors: e.target.value as any }, 100)}
                        >
                            {colorSchemes.map(scheme =>
                                <MenuItem key={scheme + ''} value={scheme}>
                                    {this.renderColorScheme(scheme)}
                                </MenuItem>
                            )}
                        </Select>
                    </FormControl>
                    <Typography align="left" className={classes.typography}>Complexity</Typography>
                    <Slider
                        value={complexity}
                        onChange={(event: any, newValue: number) => this.changeState({ complexity: newValue }, 330)}
                        valueLabelDisplay="auto"
                        valueLabelFormat={(value) => ((value * 5) + '%')}
                        className={classes.controlItem}
                        min={0}
                        max={20}
                    />
                    <TextField
                        label={'Random Seed'}
                        value={seed}
                        className={classes.controlItem}
                        onChange={(e) => this.changeState({ seed: e.target.value }, 500)}
                        InputProps={{ endAdornment: <AutoRenew style={{ fill: '#2e2e2e', cursor: 'pointer' }} onClick={this.shuffleSeed} /> }}
                    />
                    <div className={classes.row} style={{ marginTop: 16 }}>
                        <Button
                            onClick={this.shuffle}
                            variant="contained"
                            className={classes.controlItem} >Shuffle
                        </Button>
                        <Button
                            onClick={this.download}
                            color="primary"
                            variant="contained"
                            className={classes.controlItem} >
                            <span >{'Download'}</span>
                        </Button>
                    </div>
                    <div className={classes.footerPlaceholder} />
                    <div className={classes.footer}>© Oliver Saternus 2019 ✉ info@fluidart.io<br />Hägenerstraße 3, 42855 Remscheid, Germany</div>
                </div>
                {firstVisit && <WelcomeDialog fullScreen={isMobile} />}
            </div>
        );
    }
}

export default withStyles(styles as any)(App);
