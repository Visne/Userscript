import {USERSCRIPT_REVISION} from '../../constants.js';

export function handleHello(client, payload) {
    client.ws.connected = true;
    client.ws.id = payload.id;
    client.ws.keepaliveTimeout = payload.keepaliveTimeout;

    client.ws.subscribe('announcements');
    client.ws.subscribe('orders');

    client.ws.enableCapability('priorityMappings');

    client.ws.sendPayload('brand', {
        author: 'Visne',
        name: 'Userscript',
<<<<<<< HEAD
        version: USERSCRIPT_REVISION + (window.VEGAN_R_PLACE_USERSCRIPT_AUTO_UPDATER ? '-auto' : '')
=======
        version: USERSCRIPT_REVISION + ((typeof unsafeWindow !== 'undefined' ? unsafeWindow : window).PLACENL_USERSCRIPT_AUTO_UPDATER ? '-auto' : '')
>>>>>>> 954654c28f94ae78b16d4a9e3c4f81b42310804e
    });

    client.ws.sendPayload('getOrder');
}
