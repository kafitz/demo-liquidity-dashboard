/* ./api/etherscan.ts */
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || '';


export type EtherscanTokenTx = {
    blockNumber: number;
    timeStamp: number;
    hash: string;
    nonce: number;
    blockHash: string;
    from: string;
    contractAddress: string;
    to: string;
    value: number;
    tokenName: string;
    tokenSymbol: string;
    tokenDecimal: number;
    transactionIndex: number;
    gas: number;
    gasPrice: number;
    gasUser: number;
    cumulativeGasUsed: number;
    input: string;
    confirmation: number;
};

export type FormattedTx = {
    timestamp: number;
    value: number;
    totalValue: number;
}


export const fetchContractTransactions = async (contractAddress: string, startBlock: number, endBlock: number) => {
    const encodedParams = new URLSearchParams({
        module: 'account',
        action: 'tokentx',
        contractAddress: contractAddress,
        startblock: String(startBlock),
        endblock: String(endBlock),
        page: '1',
        offset: '1000',
        sort: 'asc',
        apikey: ETHERSCAN_API_KEY,
    }).toString();
    const res = await fetch(`https://api.etherscan.io/api?${encodedParams}`);
    const data = await res.json();
    if (!Array.isArray(data.result)) {
        return [];
    }
    return data.result;
}


// Format API response into chart timeseries data depending transaction type of 'stake LP' or 'deposit/withdraw LP'
export const formatResponse = (transactions: EtherscanTokenTx[], contractAddress: string, isStaking: boolean) => {
    var formattedItems: FormattedTx[] = [],
        lastValue = 0;
    transactions.forEach((item: EtherscanTokenTx, i: number) => {
        const timestamp = Number(item.timeStamp) * 1000;
        const value = Number(item.value) / 1E18;

        if (formattedItems.length) lastValue = formattedItems[formattedItems.length-1].totalValue;

        // staking
        if (isStaking) {
            if (item.to === contractAddress) {
                formattedItems.push({
                    timestamp,
                    value: value,
                    totalValue: lastValue + value
                });
            } else if (item.from === contractAddress) {
                formattedItems.push({
                    timestamp,
                    value: -value,
                    totalValue: lastValue - value
                });
            }
        }
        // deposits & withdrawals
        else {
            if (item.from === contractAddress) {
                formattedItems.push({
                    timestamp,
                    value: value,
                    totalValue: lastValue + value
                });
            } else if (item.to === contractAddress) {
                formattedItems.push({
                    timestamp,
                    value: -value,
                    totalValue: lastValue - value
                });          
            }
        }
    });
    return formattedItems;
};