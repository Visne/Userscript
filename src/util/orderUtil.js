import {shuffle} from 'weighted-shuffle'; // your ide may scream that this is wrong, but it is not

const LIGHT_COLORS = ['#FFD635', '#FFF8B8', '#FFFFFF', '#D4D7D9', '#51E9F4', '#7EED56','#FF99AA', '#B44AC0', '#FFA800', '#FF4500', '#898D90', '#3690EA']
const DARK_COLORS = ['#000000', '#BE0039', '#493AC1', '#9B6825', '#2350A3', '#801E9E', '#00A368']

export function getIncorrectPixels(client) {
    const wrong = [];

    const orderReference = client.orderReference.getImageData(0, 0, client.orderReference.canvas.width, client.orderReference.canvas.height);
    const orderPriority = client.orderPriority.getImageData(0, 0, client.orderPriority.canvas.width, client.orderPriority.canvas.height);
    const placeReference = client.placeReference.getImageData(0, 0, client.placeReference.canvas.width, client.placeReference.canvas.height);

    for (let y = 0; y < orderReference.height; y++) {
        for (let x = 0; x < orderReference.width; x++) {
            const i = ((y * orderReference.width) + x) * 4;
            const a = orderReference.data[i + 3];
            if (a === 0) continue;

            const r = orderReference.data[i];
            const g = orderReference.data[i + 1];
            const b = orderReference.data[i + 2];

            const targetHEX = rgbToHex([r, g, b])

            const currentR = placeReference.data[i];
            const currentG = placeReference.data[i + 1];
            const currentB = placeReference.data[i + 2];

            const currentHEX = rgbToHex([currentR, currentG, currentB])

            
            // this pixel is right
            if (r === currentR && g === currentG && b === currentB) continue;
            
            let priority = getPriority(orderPriority.data[i], orderPriority.data[i + 1], orderPriority.data[i + 2], orderPriority.data[i + 3]);
            
            // checks if color NEED to be changed according to selected palette
            if (LIGHT_COLORS.includes(targetHEX) && LIGHT_COLORS.includes(currentHEX)){
                priority = 1;
            }
            else if (LIGHT_COLORS.includes(targetHEX) && DARK_COLORS.includes(currentHEX)) {
                priority = 16777215/1.5
            }
            priority += Math.floor(Math.random() * 10_000); // increase randomness
        
            wrong.push([[x, y, [r, g, b]], priority]);
        }
    }

    return shuffle(wrong, 'desc').map((i) => i[0]);
}

export function getPriority(r, g, b, a) {
    if (a === 0) {
        return 0;
    }

    return (r << 16) + (g << 8) + b;
}

function componentToHex(c) {
    const hex = c.toString(16).toUpperCase();
    return hex.length === 1 ? '0' + hex : hex;
}

export function rgbToHex([r, g, b]) {
    return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
