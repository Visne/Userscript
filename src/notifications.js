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
        transition: 'none'
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
    HUDToast.options.text = `Vegan /r/place Userscript (version ${USERSCRIPT_REVISION.slice(0, 7)}${window.VEGAN_R_PLACE_USERSCRIPT_AUTO_UPDATER ? '-auto' : ''}) | ${HUDToast.title}\n${HUDToast.body}`;
    HUDToast.hideToast();
    HUDToast.toastElement.parentNode.removeChild(HUDToast.toastElement);
    HUDToast.showToast();
}

export function infoNotification(title, body = undefined) {
    Toastify({
        text: (body ? (title + '\n' + body) : title),
        duration: 5000,
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

export function warningNotification(title, body = undefined) {
    Toastify({
        text: (body ? (title + '\n' + body) : title),
        duration: 10000,
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
    if (!window.VEGAN_R_PLACE_USERSCRIPT_AUTO_UPDATER) return;

    window.VEGAN_R_PLACE_USERSCRIPT_AUTO_UPDATER.updateHook = () => {
        infoNotification(lang().TOAST_UPDATE_DETECTED);
    };
}
