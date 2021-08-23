import {
    Avatar,
    Card,
    CardContent,
    Grid,
    Typography
} from '@material-ui/core';
import { indigo } from '@material-ui/core/colors';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

const StatCard = ({header, value, icon}) => (
    <Card>
        <CardContent>
            <Grid
                container
                spacing={3}
                sx={{ justifyContent: 'space-between' }}
            >
                <Grid item>
                    <Typography
                        color="textSecondary"
                        gutterBottom
                        variant="h3"
                    >
                        {header}
                    </Typography>
                    <Typography
                        color="textPrimary"
                        variant="h3"
                    >
                        {value}
                    </Typography>
                </Grid>
                <Grid item>
                </Grid>
            </Grid>
        </CardContent>
    </Card>
);

export default StatCard;