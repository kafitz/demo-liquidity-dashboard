/* ./components/card.tsx */
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import styles from './dashboardCard.module.css';


interface DashboardCardProps {
    children?: React.ReactNode,
    title: string;
};

const DashboardCard = (props: DashboardCardProps) => {
    return (
        <Card variant='outlined' className={styles.card}>
            <CardContent>
                <Typography color='text.secondary' gutterBottom>
                    {props.title}
                </Typography>
                {props.children}
            </CardContent>
        </Card>
    );
};

export default DashboardCard;