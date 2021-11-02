/* ./pages/dashboard.tsx */
import fs from 'fs';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import subDays from 'date-fns/subDays';

import DashboardCard from '../../components/dashboardCard';
import LineChart from '../../components/lineChart';
import LiquidityPair from '../../components/liquidityPair';
import { fetchContractTransactions, formatResponse, FormattedTx } from '../../api/etherscan';
import { BLACKHOLE_ADDRESS, CONTRACTS } from '../../lib/contracts';
import { GetStaticPropsContext } from 'next';



type PairLiquidity = {
    name: string;
    deposit: number;
    withdraw: number;
};

type DepositLP = FormattedTx;
type StakeLP = FormattedTx;

interface PairDashboardProps {
    tokenPairs: PairLiquidity[];
    selectedPair: string;
    depositHistory: DepositLP[];
    stakingHistory: StakeLP[];
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
                <DashboardCard title={'Amount Staked'}>
                    <Box 
                        sx={{
                            height: 440
                        }}
                    >
                        <LineChart
                            data={[
                                {
                                    id: 'Staking',
                                    data: props.stakingHistory.map(d => {
                                        return {
                                            x: new Date(d.timestamp),
                                            y: d.totalValue
                                        };
                                    })
                                },
                                {
                                    id: 'Deposits',
                                    data: props.depositHistory.map(d => {
                                        return {
                                            x: new Date(d.timestamp),
                                            y: d.totalValue
                                        };
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
        'xsgd-usdc',
        'tryb-usdc',
    ];

    const paths = endpoints.map(p => (
        { params: { id: p } }
    ));
    return { paths, fallback: false };
}


export const getStaticProps = async (context: GetStaticPropsContext) => {
    const id = context.params!.id as keyof typeof CONTRACTS;  // dangerous, what's recommended?
    // Datetime Params
    const now = new Date();
    const startDate = subDays(now, 30);
    const startBlock = 13331168;  // https://www.npmjs.com/package/eth-block-timestamp or binary search
    const endBlock = 13532773;
    // Caching params
    const CACHE_FILE = `./${id}-cache.json`;
    // Contract params
    const poolContract = CONTRACTS[id].pool;
    const stakingContract = CONTRACTS[id].staking;


    // Query etherscan for transactions or read from cache if doesn't exist
    var transactions;
    try {
        // read from cache
        fs.accessSync(CACHE_FILE, fs.constants.F_OK);
        const rawData = fs.readFileSync(CACHE_FILE).toString();
        transactions = JSON.parse(rawData);
    } catch (err) {
        // fetch from etherscan
        transactions = await fetchContractTransactions(poolContract, startBlock, endBlock);
        fs.writeFileSync(CACHE_FILE, JSON.stringify(transactions));
    }
    // Format JSON data into Nivo data
    const deposits: DepositLP[] = formatResponse(transactions, BLACKHOLE_ADDRESS, false);;
    const stakes: StakeLP[] = formatResponse(transactions, stakingContract, true);

    return {
        props: {
            tokenPairs: [
                {
                    name: 'DFX/ETH',
                    deposit: 60394.43,
                    withdraw: 2643.23,
                }, {
                    name: 'CADC/USDC',
                    deposit: 23523.32,
                    withdraw: 15033.32,
                }, {
                    name: 'EURS/USDC',
                    deposit: 23412.43,
                    withdraw: 3215.34,                    
                }, {
                    name: 'XSGD/USDC',
                    deposit: 2354.32,
                    withdraw: 233.45,                    
                }, {
                    name: 'NZDS/USDC',
                    deposit: 5935.35,
                    withdraw: 8473.41,                    
                }, {
                    name: 'TRYB/USDC',
                    deposit: 1253.54,
                    withdraw: 6632.23,
                },       
            ],
            depositHistory: deposits,
            stakingHistory: stakes,
            selectedPair: 'TRYB/USDC',
        }
    }
}

export default PairDashboard;
