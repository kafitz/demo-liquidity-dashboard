/* ./pages/index.tsx */
import classNames from 'classnames';
import type { NextPage } from 'next';
import Box from '@mui/system/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

import DashboardCard from '../components/dashboardCard';
import Announcement from '../components/text/announcement';

import styles from './index.module.css';


const Index: NextPage = () => {
    return (
        <Container>
            <Box>
                <Typography className={styles.priceText}>
                    DEMO Price: $642.12
                </Typography>
                { true
                    ? <TrendingUpIcon className={classNames(styles.trendingArrow, styles.up)} />
                    : <TrendingDownIcon className={classNames(styles.trendingArrow, styles.down)} />
                }
            </Box>

            <Grid container spacing={2} sx={{ marginTop: 1 }}>
                {/* Total locked */}
                <Grid item xs={12}>
                    <DashboardCard title={'Total Liquidity Locked'}>
                        <Typography variant='h2' color='white'>
                            $1,000,000,000,452
                        </Typography>
                    </DashboardCard>
                </Grid>

                {/* Foreign pairs */}
                <Grid item xs={3}>
                    <DashboardCard title={'CADC/USDC'}>
                        <Typography variant='h4' color='white'>
                            $1.262
                        </Typography>
                    </DashboardCard>
                </Grid>
                <Grid item xs={3}>
                    <DashboardCard title={'EURS/USDC'}>
                        <Typography variant='h4' color='white'>
                            $0.826
                        </Typography>
                    </DashboardCard>
                </Grid>
                <Grid item xs={3}>
                    <DashboardCard title={'XSGD/USDC'}>
                        <Typography variant='h4' color='white'>
                            $1.351
                        </Typography>
                    </DashboardCard>
                </Grid>
                <Grid item xs={3}>
                    <DashboardCard title={'TRYB/USDC'}>
                        <Typography variant='h4' color='white'>
                            $0.105
                        </Typography>
                    </DashboardCard>
                </Grid>                                                

                {/* Recent news */}
                <Grid item xs={12}>
                    <DashboardCard title={'Recent Updates'}>
                        <Announcement
                            date={new Date(2022, 4, 22).getTime()}
                            text={'ICE seeks to price commodities with DFX'}
                        />
                        <Announcement
                            date={new Date(2022, 4, 15).getTime()}
                            text={'Monthly trade volume averages over $10B'}
                        />
                        <Announcement
                            date={new Date(2022, 4, 3).getTime()}
                            text={'MMXN integration for Mexico peso completed'}
                        />                               
                    </DashboardCard>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Index;
