import * as React from "react";
import withStyles from '@material-ui/styles/withStyles';
import IconButton from "@material-ui/core/IconButton";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import Snackbar from "@material-ui/core/Snackbar";
import createStyles from "@material-ui/styles/createStyles";
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import ErrorIcon from '@material-ui/icons/Error';
import CheckCircle from '@material-ui/icons/CheckCircle';
import Close from '@material-ui/icons/Close';
import Warning from '@material-ui/icons/Warning';
import Info from '@material-ui/icons/Info';
import classNames from "classnames";

interface NotificationProps {
    open: boolean;
    onClose: () => void;
    variant: 'success' | 'info' | 'error' | 'warning';
    message: string;
    classes: {
        root: string;
        base: string;
        fill: string;
    };
}

interface CustomSnackbarContentProps {
    classes: {
        icon: string;
        message: string;
        close: string;
        success: string;
        info: string;
        error: string;
        warning: string;
        iconVariant: string;
    };
    className?: string;
    message: string;
    onClose: () => void;
    variant: 'success' | 'info' | 'error' | 'warning'
}

const styles = () => createStyles({
    root: {
        width: '100%',
        minHeight: '100%'
    }
});

const styles1 = ({ palette }: any) => createStyles({
    success: {
        backgroundColor: green[600],
    },
    error: {
        backgroundColor: palette.error.dark,
    },
    info: {
        backgroundColor: palette.primary.dark,
    },
    warning: {
        backgroundColor: amber[700],
    },
    icon: {
        fontSize: 20,
        fill: '#ffffff'
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: 4,
        fill: '#ffffff'
    },
    message: {
        display: 'flex',
        alignItems: 'center',
        color: '#ffffff',
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
    },
});

const variantIcon = {
    success: CheckCircle,
    warning: Warning,
    error: ErrorIcon,
    info: Info,
};

function CustomSnackbarContent(props: CustomSnackbarContentProps) {
    const { classes, className, message, onClose, variant, ...other } = props;
    const Icon = variantIcon[variant];

    return (
        <SnackbarContent
            className={classNames(classes[variant], className)}
            message={
                <span className={classes.message}>
                    <Icon className={classNames(classes.icon, classes.iconVariant)} />
                    {message}
                </span>
            }
            action={[
                <IconButton
                    key="close"
                    color="inherit"
                    className={classes.close}
                    onClick={onClose}
                >
                    <Close className={classes.icon} />
                </IconButton>,
            ]}
            {...other}
        />
    );
}

const SnackbarContentWrapper = withStyles(styles1 as any)(CustomSnackbarContent);

class Notification extends React.Component<NotificationProps, {}> {

    render() {
        const { open, onClose, variant, message } = this.props;
        return (
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={open}
                autoHideDuration={6000}
                onClose={onClose}
            >
                <SnackbarContentWrapper
                    onClose={onClose}
                    variant={variant}
                    message={message}
                />
            </Snackbar>
        );
    }
}

export default withStyles(styles as any)(Notification);