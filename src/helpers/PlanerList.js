import KalenderIcon from '../assets/kalender.png';
import Splan from '../assets/splan.png';
import Vplan from '../assets/vplan.png';
import Üplan from '../assets/üplan.png';
import Pplan from '../assets/pplan.png';

import Kalender from '../helpers/Kalender'
import Stundenplan from '../helpers/Stundenplan'
import Vorlesungsplan from '../helpers/Vorlesungsplan'
import Uebungsplan from '../helpers/Uebungsplan'
import Pruefungsplan from '../helpers/Pruefungsplan'


export const PlanerList = [
    {
        name: "Kalender",
        image: KalenderIcon,
        text: "Mit unserem Kalender hast du alles im Überblick und kannst deine wichtigen Termine markieren!",
        path: "/Kalender",
        
    },
    {
        name: "Stundenplan",
        image: Splan,
        text: "Individualisiere deinen eigenen Stundenplan!",
        path: "/Stundenplan",
    },
    {
        name: "Vorlesungsplan",
        image: Vplan,
        text: "Trage deine Vorlesungen ein, damit du alle deine Module im Überblick hast.",
        path: "/Vorlesungsplan",
    },
    {
        name: "Uebungsplan",
        image: Üplan,
        text: "Trage deine Übungen und Praktika ein, damit du alle deine Abgaben im Überblick hast.",
        path: "/Uebungsplan",
    },
    {
        name: "Pruefungsplan",
        image: Pplan,
        text: "Trage deine Prüfungstermine ein, damit du alle deine Prüfungen im Überblick hast.",
        path: "/Pruefungsplan",
    },
];