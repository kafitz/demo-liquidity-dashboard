/* ./components/liquidityPair.tsx */
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

interface LiquidityPairProps {
    key: string | number;
    name: string;
    deposit: number;
    withdraw: number;
};

const LiquidityPair = (props: LiquidityPairProps) => {
    return (
        <Grid container>
            <Grid item xs={6}>
                <Typography variant='h5'>
                    {props.name}
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography variant='h6'>
                    <b>Added:</b> ${props.deposit}
                </Typography>
                <Typography variant='h6'>
                    <b>Removed:</b> ${props.withdraw}
                </Typography>
            </Grid>
        </Grid>
    );
}

export default LiquidityPair;