import {SocketClient} from './ws/SocketClient.js';
import {createToastifyStyle, hookIntoAutoUpdater} from './notifications.js';

const client = {
    ws: new SocketClient(),
    orderReference: createCanvas('vegan-r-place-userscript-order-reference'),
    orderPriority: createCanvas('vegan-r-place-userscript-order-priority'),
    placeReference: createCanvas('vegan-r-place-userscript-place-reference')
};

createToastifyStyle();
hookIntoAutoUpdater();
client.ws.connect(client);
(typeof unsafeWindow !== 'undefined' ? unsafeWindow : window).VEGAN_R_PLACE_USERSCRIPT_CLIENT = client;

function createCanvas(id) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.style.display = 'none';
    canvas.id = id;
    document.body.appendChild(canvas);

    return ctx;
}
