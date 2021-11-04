/* ./pages/dashboard.tsx */
import { GetStaticPropsContext } from 'next';
import fs from 'fs';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import { formatResponse, FormattedTx } from '../../api/selfhosted';
import DashboardCard from '../../components/dashboardCard';
import LineChart from '../../components/lineChart';
import LiquidityPair from '../../components/text/liquidityPair';
import { CONTRACTS } from '../../lib/contracts';
import testTokenData from './testData';

import styles from './[id].module.css';
import { douglasPeucker } from '../../lib/timeseries';



type PairLiquidity = {
    name: string;
    deposit: number;
    withdraw: number;
};

interface PairDashboardProps {
    tokenPairs: PairLiquidity[];
    selectedPair: string;
    depositHistory: FormattedTx[];
    stakingHistory: FormattedTx[];
}

const PairDashboard = (props: PairDashboardProps) => {
    return (
        <>
        <Grid container spacing={2} sx={{ marginTop: 1 }}>
            {/* Overview card */}
            <Grid item xs={12} sm={6} md={4}>
                <DashboardCard title={'Liquidity (30d)'}>
                    {props.tokenPairs.map((pair, i) => (
                        <LiquidityPair
                            className={styles.liquidityStats}
                            key={i}
                            name={pair.name}
                            deposit={pair.deposit}
                            withdraw={pair.withdraw}
                        />
                    ))}
                </DashboardCard>
            </Grid>

            {/* Chart card */}
            <Grid item xs={12} sm={6} md={8}>
                <DashboardCard title={'Amount Deposited'}>
                    <Box className={styles.chart}>
                        <LineChart
                            data={[
                                {
                                    id: 'CADC',
                                    data: props.depositHistory.map(d => {
                                        return { x: d.blockNum, y: d.totalValue };
                                    })
                                },                                 
                            ]}
                        />
                    </Box>
                </DashboardCard>
            </Grid>
        </Grid>
        </>
    );
}


export const getStaticPaths = async () => {
    const endpoints = [
        'dfx-eth',
        'cadc-usdc',
        'eurs-usdc',
        'nzds-usdc',
        'tryb-usdc',
        'xsgd-usdc',
    ];

    const paths = endpoints.map(p => (
        { params: { id: p } }
    ));
    return { paths, fallback: false };
}


export const getStaticProps = async (context: GetStaticPropsContext) => {
    const id = context.params!.id as keyof typeof CONTRACTS;  // dangerous, what's recommended?
    // Caching params
    const CACHE_FILE = `./${id}-net_positions.json`;

    fs.accessSync(CACHE_FILE, fs.constants.F_OK);
    const rawData = fs.readFileSync(CACHE_FILE).toString();
    const transactions = JSON.parse(rawData);

    // Format JSON data into Nivo data
    const reducedSeries = douglasPeucker(transactions.cur1.series, 50000);
    const deposits: FormattedTx[] = formatResponse(reducedSeries);

    return {
        props: {
            tokenPairs: testTokenData.filter(d => d.id === id),
            depositHistory: deposits
        }
    }
}

export default PairDashboard;
