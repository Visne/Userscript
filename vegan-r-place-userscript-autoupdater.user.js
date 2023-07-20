// ==UserScript==
// @name         Vegan /r/place Userscript (Autoupdater)
// @namespace    https://github.com/Visne/Userscript
// @version      0.0.1
// @description  The easiest way to run our automated placer and keep it up to date, right from your browser
// @author       Visne
// @match        https://www.reddit.com/r/place/*
// @match        https://new.reddit.com/r/place/*
// @connect      reddit.com
// @icon         https://www.google.com/s2/favicons?sz=64&domain=reddit.com
// @updateURL    https://github.com/Visne/Userscript/releases/download/latest/vegan-r-place-userscript-autoupdater.user.js
// @downloadURL  https://github.com/Visne/Userscript/releases/download/latest/vegan-r-place-userscript-autoupdater.user.js
// @grant        GM.xmlHttpRequest
// @connect      github.com
// @connect      objects.githubusercontent.com
// ==/UserScript==

const SCRIPT_LOCATION = 'https://github.com/Visne/Userscript/releases/download/latest/vegan-r-place-userscript.user.js';
const UPDATE_CHECK_INTERVAL = 10 * 60 * 1000;

(function () {
    window.VEGAN_R_PLACE_USERSCRIPT_AUTO_UPDATER = {
        version: '0.0.2',
        updateHook: () => {
        }
    };

    GM.xmlHttpRequest({
        method: 'GET',
        url: SCRIPT_LOCATION,
        onload: (response) => {
            if (response.status < 200 || response.status > 299) {
                alert('An error occured while loading the script. Please wait a bit and refresh the page.');
                return;
            }
            const scriptData = response.responseText;

            try {
                eval(scriptData);
            } catch (e) {
                alert('An error occurred while starting the script. Please wait a bit and refresh the page.');
                return;
            }

            setInterval(() => {
                GM.xmlHttpRequest({
                    method: 'GET',
                    url: SCRIPT_LOCATION,
                    onload: async (response) => {
                        const newScriptData = response.responseText;
                        if (scriptData === newScriptData) return;

                        // Give the userscript some time to display its update message
                        await window.VEGAN_R_PLACE_USERSCRIPT_AUTO_UPDATER.updateHook();
                        setTimeout(() => window.location.reload(), 5000);
                    }
                });
            }, UPDATE_CHECK_INTERVAL);
        }
    });
})();
