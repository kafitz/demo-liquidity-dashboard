/* ./api/selfhosted.ts */


export type DepositSeries = {
    cur1Name: string;
    cur2Name: string;
    cur1: FormattedTx[];
    cur2: FormattedTx[];
};

export type FormattedTx = {
    blockNum: number;
    value: number;
    totalValue: number;
}


// Format API response into chart data
export const formatResponse = (series: FormattedTx[]) => {
    var formattedItems: FormattedTx[] = [],
        lastValue = 0;
    series.forEach((item: any, i: number) => {
        if (formattedItems.length) lastValue = formattedItems[formattedItems.length-1].totalValue;
        const [blockNum, value, totalValue] = item;
        formattedItems.push({ blockNum, value, totalValue });
    });
    return formattedItems;
};
