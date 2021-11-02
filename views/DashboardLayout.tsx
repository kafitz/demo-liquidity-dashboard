/* ./views/DashboardLayout.tsx */
import React from 'react';
import Link from 'next/link';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import styles from './dashboardLayout.module.css';


interface DashboardLayoutProps {
    children?: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    return (
        <Container maxWidth={false} sx={{ marginTop: 1 }}>
            <Typography variant='h4' className={styles.logo}>
                DFX Dashboard
            </Typography>

            <Container className={styles.buttonGroup}>
                {/* Page select */}
                <ButtonGroup variant='outlined' aria-label='outlined button group'>
                    <Link href='/pairs/dfx-eth'>
                        <Button className='nav' disabled>DFX/ETH</Button>
                    </Link>
                    <Link href='/pairs/cadc-usdc'>
                        <Button className='nav' disabled>CADC/USDC</Button>
                    </Link>
                    <Link href='/pairs/eurs-usdc'>    
                        <Button className='nav' disabled>EURS/USDC</Button>
                    </Link>
                    <Link href='/pairs/xsgd-usdc'>
                        <Button className='nav' disabled>XSGD/USDC</Button>
                    </Link>
                    <Link href='/pairs/tryb-usdc'>
                        <Button className='nav'>TRYB/USDC</Button>
                    </Link>
                </ButtonGroup>
            </Container>
        
            {children}
        </Container>
    );
}

export default DashboardLayout;
