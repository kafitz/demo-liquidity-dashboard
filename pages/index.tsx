/* ./pages/index.tsx */

import { useEffect } from 'react';
import type { NextPage } from 'next';
import Router from 'next/router';


const Index: NextPage = () => {
    useEffect(() => {
        Router.push('/pairs/tryb-usdc')
    });

    return (
        <div />
    );
}

export default Index;
