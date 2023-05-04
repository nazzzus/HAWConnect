import React, { useState } from 'react';
import Bibliothek from '../components/BibItem';
import '../styles/BibList.css'

function BibList(){

    const [bibliotheken, setBibliotheken] = useState([
    {
        name: "Fachbibliothek TWI",
        adresse: "Berliner Tor 7, 20099 Hamburg (2. Stock)",
        oeffnungszeiten1: "Montag von 9-20 Uhr geöffnet.",
        oeffnungszeiten2: "Dienstag von 9-20 Uhr geöffnet.",
        oeffnungszeiten3: "Mittwoch von 9-20 Uhr geöffnet.",
        oeffnungszeiten4: "Donnerstag  von 9-20 Uhr geöffnet.",
        oeffnungszeiten5: "Freitag von 9-16 Uhr geöffnet.",
        standort: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d592.5108624027505!2d10.021577541713945!3d53.55699183229736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b18fb1e7882a5b%3A0xb5a6c4405c2387a2!2sFachbibliothek%20Technik%20Wirtschaft%20Information%202!5e0!3m2!1sde!2sde!4v1683065378126!5m2!1sde!2sde",
    },
    {
        name: "Lernort Berliner Tor 5 (TWI Zeitschriften)",
        adresse: "Berliner Tor 5, 20099 Hamburg (7. und 8. Stock)",
        oeffnungszeiten1: "Aktuell nicht geöffnet!",
        standort: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d296.2584991191012!2d10.021837719894199!3d53.556553698871284!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b18ec26ec12277%3A0x1a24798c7fa26335!2sHAW%20Hamburg%20-%20Department%20Public%20Management!5e0!3m2!1sde!2sde!4v1683065468565!5m2!1sde!2sde",
    },
    {
        name: "Fachbibliothek Soziale Arbeit & Pflege (S&P)",
        adresse: "Alexanderstraße 1, 20099 Hamburg (Haus A, Eingang Raum 1.01)",
        oeffnungszeiten1: "Montag von 9-16 Uhr geöffnet.",
        oeffnungszeiten2: "Dienstag von 9-16 Uhr geöffnet.",
        oeffnungszeiten3: "Mittwoch von 9-18 Uhr geöffnet.",
        oeffnungszeiten4: "Donnerstag  von 9-16 Uhr geöffnet.",
        oeffnungszeiten5: "Freitag von 9-14 Uhr geöffnet.",
        standort: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d296.2683863221032!2d10.017671604909248!3d53.5551416773767!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b18ee86b1dad3f%3A0x8336d7b797d846e5!2sFachbibliothek%20Soziale%20Arbeit%20und%20Pflege!5e0!3m2!1sde!2sde!4v1683065524411!5m2!1sde!2sde",
    },
    {
        name: "Fachbibliothek Design Medien Information (DMI)",
        adresse: "Finkenau 35, 22081 Hamburg (Neubau, 2. Stock)",
        oeffnungszeiten1: "Montag von 9-19 Uhr geöffnet.",
        oeffnungszeiten2: "Dienstag von 9-19 Uhr geöffnet.",
        oeffnungszeiten3: "Mittwoch von 9-19 Uhr geöffnet.",
        oeffnungszeiten4: "Donnerstag  von 9-19 Uhr geöffnet.",
        oeffnungszeiten5: "Freitag von 9-14 Uhr geöffnet.",
        standort: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d592.3386179597602!2d10.0339223625633!3d53.56929005246403!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b18f2d9d479bb5%3A0xb650199b66543469!2sFachbibliothek%20Design%20Medien%20Information!5e0!3m2!1sde!2sde!4v1683065654086!5m2!1sde!2sde",
    },
    {
        name: "Fachbibliothek Life Sciences",
        adresse: "Ulmenliet 20, 21033 Hamburg",
        oeffnungszeiten1: "Montag von 9-19 Uhr geöffnet.",
        oeffnungszeiten2: "Dienstag von 9-19 Uhr geöffnet.",
        oeffnungszeiten3: "Mittwoch von 9-19 Uhr geöffnet.",
        oeffnungszeiten4: "Donnerstag  von 9-19 Uhr geöffnet.",
        oeffnungszeiten5: "Freitag von 9-19 Uhr geöffnet.",
        standort: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d148.3492169238557!2d10.201424317283543!3d53.4937003854943!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b1f29252fce2cf%3A0xa674bae1dce806fa!2sUlmenliet%2020%2C%2021033%20Hamburg!5e0!3m2!1sde!2sde!4v1683066023702!5m2!1sde!2sde",
    },
]);

return (
    <div className='BibListMain'>
        {bibliotheken.map(bibliothek => (
            <Bibliothek
                key={bibliothek.name}
                name={bibliothek.name}
                adresse={bibliothek.adresse}
                oeffnungszeiten1={bibliothek.oeffnungszeiten1}
                oeffnungszeiten2={bibliothek.oeffnungszeiten2}
                oeffnungszeiten3={bibliothek.oeffnungszeiten3}
                oeffnungszeiten4={bibliothek.oeffnungszeiten4}
                oeffnungszeiten5={bibliothek.oeffnungszeiten5}
                standort={bibliothek.standort}
            />
        ))}
    </div>
)
        }

        export default BibList;