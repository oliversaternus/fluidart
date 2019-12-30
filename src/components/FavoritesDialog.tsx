import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import ClearIcon from "@material-ui/icons/Clear";
import Slide from "@material-ui/core/Slide";
import Apps from "@material-ui/icons/Apps";
import createStyles from "@material-ui/styles/createStyles";
import Button from "@material-ui/core/Button";
import * as React from "react";
import withStyles from "@material-ui/styles/withStyles";
import Image from "./Image";
import { baseUrl } from "../utils/Constants";
import Typography from "@material-ui/core/Typography";

const Transition: any = React.forwardRef(function Transition(props: any, ref) {
    return <Slide direction="up" ref={ref} {...props} mountOnEnter unmountOnExit />;
});

export interface Favorite {
    id: string;
    style: 'fluid' | 'blur' | 'flat';
    seed: string;
    colors: string[];
    complexity: number;
}

interface FavoritesDialogProps {
    fullScreen?: boolean;
    onSelect: (v: Favorite) => void;
    classes: {
        [key: string]: string;
    }
}

interface FavoritesDialogState {
    open?: boolean;
}

const styles = (theme: any) => createStyles({
    dialog: {
        backgroundColor: '#ffffff',
        padding: 20,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    dialogPaper: {
        backgroundColor: 'transparent'
    },
    clearButton: {
        position: 'absolute',
        zIndex: 200,
        right: 8,
        top: 8
    },
    clearIcon: {
        fill: '#2e2e2e'
    },
    appsIcon: {
        fill: '#2e2e2e'
    },
    content: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        color: '#2e2e2e',
        display: 'flex',
        flexWrap: 'wrap'
    },
    image: {
        height: 156,
        width: 156
    },
    smallImage: {
        height: 128,
        width: 128
    },
    innerDialog: {
        marginTop: 12,
        height: 'calc(100% - 12px)',
        overflow: 'auto'
    },
    favContainer: {
        margin: 8,
        cursor: 'pointer',
        border: '4px solid transparent',
        '&:hover': {
            border: '4px solid ' + theme.palette.primary.main
        }
    },
    title: {
        width: '100%',
        fontSize: 18
    }
});

class FavoritesDialog extends React.Component<FavoritesDialogProps, FavoritesDialogState> {
    constructor(props: FavoritesDialogProps) {
        super(props);
        this.state = {
            open: false
        };
    }

    closeDialog = () => {
        this.setState({ open: false });
    };

    openDialog = () => {
        this.setState({ open: true });
    };

    select = (favorite: Favorite) => {
        const { onSelect } = this.props;
        onSelect(favorite);
        this.closeDialog();
    };

    renderContent = () => {
        const { classes, fullScreen } = this.props;
        try {
            const favorites: Favorite[] = JSON.parse(localStorage.getItem('favorites'));
            return (
                <div className={classes.content}>
                    {favorites.map(fav =>
                        <div className={classes.favContainer} key={fav.id} onClick={() => this.select(fav)}>
                            <Image
                                noIndicator
                                src={baseUrl + '/favs/' + fav.id + '.jpg'}
                                className={fullScreen ? classes.smallImage : classes.image}
                            />
                        </div>)}
                    {favorites.length === 0 && <div style={{ width: 180, height: 180 }}></div>}
                </div>);
        } catch (e) {
            return (
                <div className={classes.content}>
                    <div style={{ width: 180, height: 180 }}></div>
                </div>
            );
        }
    };

    render() {
        const { classes, fullScreen } = this.props;
        const { open } = this.state;
        return (
            <React.Fragment>
                <Button style={{marginTop: 6}} variant="contained" fullWidth onClick={this.openDialog} ><Apps className={classes.appsIcon} /><span style={{ width: 90 }}>{'Favorites'}</span></Button>
                <Dialog
                    fullScreen={fullScreen}
                    classes={{ paper: classes.dialogPaper }}
                    TransitionComponent={Transition}
                    open={open}
                    onClose={this.closeDialog}
                    maxWidth="md"
                >
                    <DialogContent className={classes.dialog}>
                        <Typography variant="body2" className={classes.title} align="center" >Favorites</Typography>
                        <IconButton onClick={this.closeDialog} className={classes.clearButton}>
                            <ClearIcon className={classes.clearIcon} />
                        </IconButton>
                        <div className={classes.innerDialog}>
                            {this.renderContent()}
                        </div>
                    </DialogContent>
                </Dialog>
            </React.Fragment>

        );
    }
}

export default withStyles(styles as any)(FavoritesDialog);
