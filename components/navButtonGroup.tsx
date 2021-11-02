/* ./components/navButtonGroup.tsx */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

import styles from './navButtonGroup.module.css';


interface NavButtonGroupProps {
    items: {
        label: string;
        path: string;
    }[];
    defaultValue?: string;
};

const NavButtonGroup = (props: NavButtonGroupProps) => {
    const [activeIdx, setActiveIdx] = useState<number>();

    // set a default selected value on initialization if exists
    useEffect(() => {
        const defaultIdx = props.items.findIndex(item => item.label === props.defaultValue);
        if (defaultIdx > -1) setActiveIdx(defaultIdx);
    }, []);

    return (
        <ButtonGroup variant='outlined' aria-label='outlined button group'>
            { props.items.map((item, idx) => (
                <Link key={idx} href={item.path}>
                    <Button
                        className={classNames(styles.nav, activeIdx === idx && styles.active)}
                        onClick={() => setActiveIdx(idx)}
                    >
                        {item.label}
                    </Button>
                </Link>                
            )) }
        </ButtonGroup>
    );
}

export default NavButtonGroup;