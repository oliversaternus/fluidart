import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import ClearIcon from "@material-ui/icons/Clear";
import Slide from "@material-ui/core/Slide";
import createStyles from "@material-ui/styles/createStyles";
import * as React from "react";
import withStyles from "@material-ui/styles/withStyles";

const Transition: any = React.forwardRef(function Transition(props: any, ref) {
    return <Slide direction="up" ref={ref} {...props} mountOnEnter unmountOnExit />;
});

interface WelcomeDialogProps {
    fullScreen?: boolean;
    classes: {
        [key: string]: string;
    }
}

interface WelcomeDialogState {
    open?: boolean;
}

const styles = () => createStyles({
    dialog: {
        backgroundColor: '#ffffff',
        padding: 20,
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
        right: 8,
        top: 8
    },
    clearIcon: {
        fill: '#2e2e2e'
    },
    content: {
        fontFamily: 'sans-serif',
        color: '#2e2e2e'
    }
});

class WelcomeDialog extends React.Component<WelcomeDialogProps, WelcomeDialogState> {
    constructor(props: WelcomeDialogProps) {
        super(props);
        this.state = {
            open: true
        };
    }

    closeDialog = () => {
        this.setState({ open: false });
    };

    render() {
        const { classes, fullScreen } = this.props;
        const { open } = this.state;
        return (
            <React.Fragment>
                <Dialog
                    fullScreen={fullScreen}
                    classes={{ paper: classes.dialogPaper }}
                    TransitionComponent={Transition}
                    open={open}
                    onClose={this.closeDialog}
                >
                    <DialogContent className={classes.dialog}>
                        <IconButton onClick={this.closeDialog} className={classes.clearButton}>
                            <ClearIcon className={classes.clearIcon} />
                        </IconButton>
                        <div className={classes.content}>
                            {'Welcome to your first visit!'}
                        </div>
                    </DialogContent>
                </Dialog>
            </React.Fragment>

        );
    }
}

export default withStyles(styles as any)(WelcomeDialog);
