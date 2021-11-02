/* ./views/DashboardLayout.tsx */
import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import styles from './dashboardLayout.module.css';
import NavButtonGroup from '../components/navButtonGroup';


interface DashboardLayoutProps {
    children?: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {


    return (
        <Container maxWidth={false} sx={{ marginTop: 1 }}>
            <Typography variant='h4' className={styles.logo}>
                DFX Dashboard
            </Typography>

            {/* Page select */}
            <Container className={styles.navButtons}>
                <NavButtonGroup
                    items={[
                        {label: 'DFX-ETH', path: '/pairs/dfx-eth'},
                        {label: 'CADC-USDC', path: '/pairs/cadc-usdc'},
                        {label: 'EURS-USDC', path: '/pairs/eurs-usdc'},
                        {label: 'XSGD-USDC', path: '/pairs/xsgd-usdc'},
                        {label: 'TRYB-USDC', path: '/pairs/tryb-usdc'},
                    ]}
                    defaultValue='TRYB-USDC'
                />
            </Container>
            {children}
        </Container>
    );
}

export default DashboardLayout;
