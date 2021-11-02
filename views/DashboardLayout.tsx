/* ./views/DashboardLayout.tsx */
import React, { useState } from 'react';
import Link from 'next/link';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import styles from './dashboardLayout.module.css';
import NavButtonGroup from '../components/navButtonGroup';


interface DashboardLayoutProps {
    children?: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    const [navGroupActive, setNavGroupActive] = useState(false);

    return (
        <>
        <Container maxWidth={false} sx={{ marginTop: 1 }} className={styles.menuBar}>
            <Link href='/'>
                <a 
                    className={styles.logo}
                    onClick={() => setNavGroupActive(false)}
                >
                    <Typography variant='h4' className={styles.logo}>
                        Demo Dashboard
                    </Typography>
                </a>
            </Link>

        </Container>
        <Container>
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
                    onClick={() => setNavGroupActive(true)}
                    navGroupActive={navGroupActive}
                />
            </Container>
            
            {children}
        </Container>
        </>
    );
}

export default DashboardLayout;
