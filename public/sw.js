import { cleanupOutdatedCaches, createHandlerBoundToURL, precacheAndRoute } from 'workbox-precaching';
import { clientsClaim } from 'workbox-core';
import { NavigationRoute, registerRoute } from 'workbox-routing';

import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging/sw";
import {firebaseConfig} from "./firebase-config.ts";

// self.__WB_MANIFEST is default injection point
precacheAndRoute(self.__WB_MANIFEST);

// clean old assets
cleanupOutdatedCaches();

let allowlist;
if (import.meta.env.DEV) {
    allowlist = [/^\/$/];
}

// to allow work offline
registerRoute(new NavigationRoute(
    createHandlerBoundToURL('index.html'),
    { allowlist },
));

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

self.skipWaiting();
clientsClaim();