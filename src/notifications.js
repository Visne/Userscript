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
        opacity: 0.75,
        color: 'white',
        borderWidth: '2px',
        borderStyle: 'solid',
        borderImage: 'background: linear-gradient(135deg, #00B33E 25%, transparent 25%) 150px 0px,
    linear-gradient(225deg, #00B33E 25%, transparent 25%) 150px 00px,
    linear-gradient(315deg, #0078C9 25%, transparent 25%),
    linear-gradient(45deg, #0078C9 25%, transparent 25%);
  background-color: #FFFFFF; 1 1',
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
