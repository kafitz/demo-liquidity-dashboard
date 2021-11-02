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
        <>
            <Typography variant='h2'>
                DFX Dashboard
            </Typography>

            <Container className={styles.buttonGroup}>
                {/* Page select */}
                <ButtonGroup variant='outlined' aria-label='outlined button group'>
                    <Link href='/pairs/dfx-eth'>
                        <Button>DFX/ETH</Button>
                    </Link>
                    <Link href='/pairs/cadc-usdc'>
                        <Button>CADC/USDC</Button>
                    </Link>
                    <Link href='/pairs/eurs-usdc'>    
                        <Button>EURS/USDC</Button>
                    </Link>
                    <Link href='/pairs/xsgd-usdc'>
                        <Button>XSGD/USDC</Button>
                    </Link>
                    <Link href='/pairs/tryb-usdc'>
                        <Button>TRYB/USDC</Button>
                    </Link>
                </ButtonGroup>
            </Container>
        
            {children}
        </>
    );
}

export default DashboardLayout;
