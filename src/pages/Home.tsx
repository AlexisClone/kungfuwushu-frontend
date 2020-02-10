import * as React from 'react';
import {
    Theme, withStyles, Paper,
    //Table, TableHead, TableRow,
    //TableCell, TableBody, TablePagination,
    Grid, Typography
} from '@material-ui/core';
//import { BarChart, CartesianGrid, XAxis, YAxis, Bar, Tooltip, Legend, PieChart, Pie, ResponsiveContainer } from 'recharts';
const classNames = require('classnames');
//import GroupIcon from '@material-ui/icons/Group';
import FlightTakeoff from '@material-ui/icons/FlightTakeoff';
//import SettingsIcon from '@material-ui/icons/Settings';
import MailIcon from '@material-ui/icons/Mail';

import BusinessIcon from '@material-ui/icons/BusinessCenter';

interface IDashboardProps {
    materialChartData: any[];
    classes?: any;
    theme?: any;
    children?: any;
}

interface IPageState {
    itemsTablePage?: number;
    itemsTableRowsPerPage: number;
}

class HomePage extends React.Component<IDashboardProps, IPageState> {

    public state: IPageState = {
        itemsTablePage: 0,
        itemsTableRowsPerPage: 5
    };



    public render(): JSX.Element {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Grid container={true} spacing={3}>
                    <Grid item={true} lg={4} xs={12} sm={6}>
                        <Paper className={classNames(classes.paper, classes.headerTiles)}>
                            <BusinessIcon className={classes.headerTileIcon} />
                            <Typography className={classes.tileText}>12 Training programs</Typography>
                        </Paper>
                    </Grid>
                    <Grid item={true} lg={4} xs={12} sm={6}>
                        <Paper className={classNames(classes.paper, classes.headerTiles)}>
                            <FlightTakeoff className={classes.headerTileIcon} />
                            <Typography className={classes.tileText}> 3 Test results</Typography>
                        </Paper>
                    </Grid>
                    <Grid item={true} lg={3} xs={12} sm={6}>
                        <Paper className={classNames(classes.paper, classes.headerTiles)}>
                            <MailIcon className={classes.headerTileIcon} />
                            <Typography className={classes.tileText}>2 Messages</Typography>
                        </Paper>
                    </Grid>

                </Grid>
            </div>
        );
    }
}

const styles = (theme: Theme) => ({
    root: {
        flexGrow: 1,
        marginBottom: 24,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    headerTiles: {
        overflowX: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRight: `5px solid ${theme.palette.secondary.main}`,
    },
    headerTileIcon: {
        fontSize: 40,
        color: theme.palette.primary.main,
        paddingRight: 5
    },
    tileText: {
        fontSize: 20,
        color: theme.palette.grey["400"],
    },
    sectionTitle: {
        paddingLeft: theme.spacing(2),
    },
    chart: {
        width: '100%'
    },
});

export default withStyles(styles as any)(HomePage as any) as any;
