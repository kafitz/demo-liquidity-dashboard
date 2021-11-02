/* ./pages/index.tsx */
import type { NextPage } from 'next';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import DashboardCard from '../components/dashboardCard';
import { Typography } from '@mui/material';


const Index: NextPage = () => {
    return (
        <Container>
            DFX Price: $642.12

            <Grid container spacing={2} sx={{ marginTop: 1 }}>
                {/* Total locked */}
                <Grid item xs={12}>
                    <DashboardCard title={'Total Liquidity Locked'}>
                        <Typography variant='h2' color='white'>
                            $1,000,000,000
                        </Typography>
                    </DashboardCard>
                </Grid>

                {/* Recent news */}
                <Grid item xs={12}>
                    <DashboardCard title={'Recent Updates'}>
                        <Typography variant='body1' color='white'>
                            - hamsters dance
                        </Typography>
                        <Typography variant='body1' color='white'>
                            - more hamsters dance
                        </Typography>
                        <Typography variant='body1' color='white'>
                            - 17 hamsters dance
                        </Typography>                                          
                    </DashboardCard>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Index;
