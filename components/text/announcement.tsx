/* ./components/text/announcement.tsx */
import classNames from 'classnames';
import Box from '@mui/system/Box';
import Typography from '@mui/material/Typography';
import format from 'date-fns/format';

import styles from './announcement.module.css';



interface AnnouncementProps {
    className?: string;
    key?: string | number;
    date: number | Date;
    text: string;
};

const Announcement = (props: AnnouncementProps) => {
    return (
        <Box>
            <Typography className={classNames(styles.announcementText, styles.spacer)}> 
                &bull;
            </Typography>            

            <Typography className={classNames(styles.announcementText, styles.date)}>
                {format(new Date(props.date), 'MMM d, yyyy')}
            </Typography>

            <Typography className={classNames(styles.announcementText, styles.spacer)}> 
                &mdash;
            </Typography>            

            <Typography className={classNames(styles.announcementText, styles.headline)}>
                {props.text}
            </Typography>            
        </Box>
    );
}

export default Announcement;        