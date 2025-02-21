import Toastify from 'toastify-js';
import css from 'toastify-js/src/toastify.css';
import {USERSCRIPT_REVISION} from './constants.js';
import {lang} from './lang/language.js';

export const HUDToast = Toastify({
    text: 'Vegan /r/place Userscript',
    duration: -1,
    close: false,
    gravity: 'bottom',
    position: 'right',
    style: {
        background: '#008230',
        opacity: 0.80,
        color: 'white',
        borderWidth: '5px',
        borderStyle: 'solid',
        borderImage: 'url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iNTAwIiBoZWlnaHQ9IjMwMCI+PHBhdGggZmlsbD0iIzAwNzdjOCIgZD0iTTAsMEg1MDBWMzAwSDB6Ii8+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTAsMEg1MDBMMjUwLDMwMHoiLz48cGF0aCBmaWxsPSIjMDBiMTQwIiBkPSJNMTAwLDBINDAwTDI1MCwxODB6Ii8+PC9zdmc+") 40 20 / 5px / 0 stretch',
        zIndex: 100000,
        transition: 'none',
        destination: 'https://discord.com/channels/959451937181409302/960687226331725854',
        newWindow: true
    }
}).showToast();
HUDToast.title = HUDToast.body = '';

export function setHUDTitle(title) {
    HUDToast.title = title;
    reshowHUD();
}

export function setHUDBody(body) {
    HUDToast.body = body;
    reshowHUD();
}

function reshowHUD() {
    HUDToast.options.text = `Vegan /r/place Userscript (version ${USERSCRIPT_REVISION.slice(0, 7)}${(typeof unsafeWindow !== 'undefined' ? unsafeWindow : window).VEGAN_R_PLACE_USERSCRIPT_AUTO_UPDATER ? '-auto' : ''}) | ${HUDToast.title}\n${HUDToast.body}`;
    HUDToast.hideToast();
    HUDToast.toastElement.parentNode.removeChild(HUDToast.toastElement);
    HUDToast.showToast();
}

export function infoNotification(title, body = undefined, duration = 5000) {
    Toastify({
        text: (body ? (title + '\n' + body) : title),
        duration,
        close: false,
        gravity: 'top',
        position: 'right',
        stopOnFocus: true,
        style: {
            background: '#008230',
            border: '2.5px solid #00B33E',
            zIndex: 1000
        }
    }).showToast();
}

export function warningNotification(title, body = undefined, duration = 10000) {
    Toastify({
        text: (body ? (title + '\n' + body) : title),
        duration,
        close: false,
        gravity: 'top',
        position: 'right',
        stopOnFocus: true,
        style: {
            background: '#930000',
            border: '2.5px solid #FF0000',
            zIndex: 1000
        }
    }).showToast();
}

export function createToastifyStyle() {
    const style = document.createElement('style');
    style.innerText = css;
    document.body.appendChild(style);
}

export function hookIntoAutoUpdater() {
    let w = typeof unsafeWindow !== 'undefined' ? unsafeWindow : window;
    if (!w.VEGAN_R_PLACE_USERSCRIPT_AUTO_UPDATER) return;

    w.VEGAN_R_PLACE_USERSCRIPT_AUTO_UPDATER.updateHook = () => {
        infoNotification(lang().TOAST_UPDATE_DETECTED);
    };
}