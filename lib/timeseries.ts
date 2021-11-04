/* ./lib/timeseries.ts */
import { FormattedTx } from '../api/selfhosted';


const mapArrayToFormattedTx = (arr: number[]): FormattedTx => {
    return {
        blockNum: arr[0],
        value: arr[1],
        totalValue: arr[2]
    }
}


const distance = (p1: FormattedTx, p2: FormattedTx) => {
    return Math.sqrt((p2.blockNum - p1.blockNum) ** 2 + (p2.totalValue - p1.totalValue) ** 2);
}


const perpendicularDistance = (_tx: number[], _start: number[], _end: number[]): number => {
    const tx = mapArrayToFormattedTx(_tx);
    const start = mapArrayToFormattedTx(_start);
    const end = mapArrayToFormattedTx(_end);

    if (start.blockNum === end.blockNum && start.totalValue == end.totalValue) {
        return distance(start, end);
    }

    const a = (start.totalValue - end.totalValue) * tx.blockNum;
    const b = (end.blockNum - start.blockNum) * tx.totalValue;
    const c = start.blockNum * end.totalValue;
    const d = end.blockNum * start.totalValue;
    const dist = Math.abs((a + b + c - d) / distance(start, end));
    return dist;
}

// reduce the number of points using a douglas-peucker algorithm to best keep its
// approximate shape at the expense of exactness
// https://en.wikipedia.org/wiki/Ramer–Douglas–Peucker_algorithm#Pseudocode
// https://gist.github.com/mubaidr/aafebc22d587ee9625d0c0c7a1b975e7
export const douglasPeucker = (series: any[], epsilon = 1): FormattedTx[] =>{
    const endIdx = series.length - 1;
    let maxDistance = 0;
    let idx = 0;
    
    let pointsToKeep: FormattedTx[] = [];

    // return if <=2 points
    if (series.length <= 2) return series;

    for (let i = 1; i < endIdx; i++) {
        // should be "shortest distance" (see wikipedia's linked RDP implementation)
        const distance = perpendicularDistance(
            series[i],
            series[0],
            series[endIdx]
        );

        if (distance > maxDistance) {
            idx = i;
            maxDistance = distance;
        }
    }

    if (maxDistance > epsilon) {
        pointsToKeep = [
            ...douglasPeucker(series.slice(0, idx), epsilon),
            ...douglasPeucker(series.slice(idx, endIdx), epsilon),
        ];
    } else {
        pointsToKeep = [series[0], series[endIdx]];
    }
    return pointsToKeep;
}
