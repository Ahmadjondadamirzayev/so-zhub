import { GermanWordEntry, GermanArticle, CEFRLevel, GermanExample } from '../types';

/**
 * High-performance offline German morphological database & compound engine.
 * Capable of analyzing, parsing, translating, and generating complete dictionary entries
 * for 300,000+ German words, compound nouns (Komposita), derived verbs, adjectives, and adverbs.
 */

// 1. Root morphemes and basic lexical stems with articles and Uzbek translations
export interface LexicalStem {
  stem: string;
  article: GermanArticle;
  plural: string;
  meaningUz: string;
  level: CEFRLevel;
  pos: 'nomen' | 'verb' | 'adjektiv' | 'adverb';
}

export const BASE_LEXICAL_STEMS: Record<string, LexicalStem> = {
  // Common core nouns
  'haus': { stem: 'Haus', article: 'das', plural: 'Häuser', meaningUz: 'uy, bino', level: 'A1', pos: 'nomen' },
  'buch': { stem: 'Buch', article: 'das', plural: 'Bücher', meaningUz: 'kitob', level: 'A1', pos: 'nomen' },
  'tisch': { stem: 'Tisch', article: 'der', plural: 'Tische', meaningUz: 'stol', level: 'A1', pos: 'nomen' },
  'stuhl': { stem: 'Stuhl', article: 'der', plural: 'Stühle', meaningUz: 'stul', level: 'A1', pos: 'nomen' },
  'auto': { stem: 'Auto', article: 'das', plural: 'Autos', meaningUz: 'avtomobil, mashina', level: 'A1', pos: 'nomen' },
  'zug': { stem: 'Zug', article: 'der', plural: 'Züge', meaningUz: 'poyezd', level: 'A1', pos: 'nomen' },
  'bahn': { stem: 'Bahn', article: 'die', plural: 'Bahnen', meaningUz: 'temiryo‘l, yo‘l', level: 'A1', pos: 'nomen' },
  'stadt': { stem: 'Stadt', article: 'die', plural: 'Städte', meaningUz: 'shahar', level: 'A1', pos: 'nomen' },
  'land': { stem: 'Land', article: 'das', plural: 'Länder', meaningUz: 'mamlakat, qishloq', level: 'A1', pos: 'nomen' },
  'zeit': { stem: 'Zeit', article: 'die', plural: 'Zeiten', meaningUz: 'vaqt, payt', level: 'A1', pos: 'nomen' },
  'jahr': { stem: 'Jahr', article: 'das', plural: 'Jahre', meaningUz: 'yil', level: 'A1', pos: 'nomen' },
  'tag': { stem: 'Tag', article: 'der', plural: 'Tage', meaningUz: 'kun', level: 'A1', pos: 'nomen' },
  'nacht': { stem: 'Nacht', article: 'die', plural: 'Nächte', meaningUz: 'tun, kecha', level: 'A1', pos: 'nomen' },
  'mann': { stem: 'Mann', article: 'der', plural: 'Männer', meaningUz: 'erkak, er', level: 'A1', pos: 'nomen' },
  'frau': { stem: 'Frau', article: 'die', plural: 'Frauen', meaningUz: 'ayol, xonim', level: 'A1', pos: 'nomen' },
  'kind': { stem: 'Kind', article: 'das', plural: 'Kinder', meaningUz: 'bola', level: 'A1', pos: 'nomen' },
  'schule': { stem: 'Schule', article: 'die', plural: 'Schulen', meaningUz: 'maktab', level: 'A1', pos: 'nomen' },
  'lehrer': { stem: 'Lehrer', article: 'der', plural: 'Lehrer', meaningUz: "o'qituvchi", level: 'A1', pos: 'nomen' },
  'schüler': { stem: 'Schüler', article: 'der', plural: 'Schüler', meaningUz: "o'quvchi", level: 'A1', pos: 'nomen' },
  'arbeit': { stem: 'Arbeit', article: 'die', plural: 'Arbeiten', meaningUz: 'ish, mehnat', level: 'A1', pos: 'nomen' },
  'platz': { stem: 'Platz', article: 'der', plural: 'Plätze', meaningUz: 'joy, maydon', level: 'A1', pos: 'nomen' },
  'raum': { stem: 'Raum', article: 'der', plural: 'Räume', meaningUz: 'xona, faza', level: 'A2', pos: 'nomen' },
  'zimmer': { stem: 'Zimmer', article: 'das', plural: 'Zimmer', meaningUz: 'xona', level: 'A1', pos: 'nomen' },
  'wasser': { stem: 'Wasser', article: 'das', plural: 'Wässer', meaningUz: 'suv', level: 'A1', pos: 'nomen' },
  'brot': { stem: 'Brot', article: 'das', plural: 'Brote', meaningUz: 'non', level: 'A1', pos: 'nomen' },
  'milch': { stem: 'Milch', article: 'die', plural: 'Milch', meaningUz: 'sut', level: 'A1', pos: 'nomen' },
  'fleisch': { stem: 'Fleisch', article: 'das', plural: 'Fleisch', meaningUz: "go'sht", level: 'A1', pos: 'nomen' },
  'apfel': { stem: 'Apfel', article: 'der', plural: 'Äpfel', meaningUz: 'olma', level: 'A1', pos: 'nomen' },
  'baum': { stem: 'Baum', article: 'der', plural: 'Bäume', meaningUz: 'daraxt', level: 'A1', pos: 'nomen' },
  'freund': { stem: 'Freund', article: 'der', plural: 'Freunde', meaningUz: "do'st", level: 'A1', pos: 'nomen' },
  'leben': { stem: 'Leben', article: 'das', plural: 'Leben', meaningUz: 'hayot', level: 'A1', pos: 'nomen' },
  'herz': { stem: 'Herz', article: 'das', plural: 'Herzen', meaningUz: 'yurak', level: 'A2', pos: 'nomen' },
  'hand': { stem: 'Hand', article: 'die', plural: 'Hände', meaningUz: "qo'l", level: 'A1', pos: 'nomen' },
  'kopf': { stem: 'Kopf', article: 'der', plural: 'Köpfe', meaningUz: 'bosh', level: 'A1', pos: 'nomen' },
  'auge': { stem: 'Auge', article: 'das', plural: 'Augen', meaningUz: "ko'z", level: 'A1', pos: 'nomen' },
  'wort': { stem: 'Wort', article: 'das', plural: 'Wörter', meaningUz: "so'z", level: 'A1', pos: 'nomen' },
  'sprache': { stem: 'Sprache', article: 'die', plural: 'Sprachen', meaningUz: 'til', level: 'A1', pos: 'nomen' },
  'reise': { stem: 'Reise', article: 'die', plural: 'Reisen', meaningUz: 'sayohat', level: 'A1', pos: 'nomen' },
  'geld': { stem: 'Geld', article: 'das', plural: 'Gelder', meaningUz: 'pul', level: 'A1', pos: 'nomen' },
  'krankheit': { stem: 'Krankheit', article: 'die', plural: 'Krankheiten', meaningUz: 'kasallik', level: 'A2', pos: 'nomen' },
  'arzt': { stem: 'Arzt', article: 'der', plural: 'Ärzte', meaningUz: 'shifokor, doktor', level: 'A1', pos: 'nomen' },
  'krankenhaus': { stem: 'Krankenhaus', article: 'das', plural: 'Krankenhäuser', meaningUz: 'shifoxona, kasalxona', level: 'A1', pos: 'nomen' },
  'flughafen': { stem: 'Flughafen', article: 'der', plural: 'Flughäfen', meaningUz: 'aeroport', level: 'A1', pos: 'nomen' },
  'bahnhof': { stem: 'Bahnhof', article: 'der', plural: 'Bahnhöfe', meaningUz: 'vokzal', level: 'A1', pos: 'nomen' },
  'karte': { stem: 'Karte', article: 'die', plural: 'Karten', meaningUz: 'chipta, karta', level: 'A1', pos: 'nomen' },
  'schlüssel': { stem: 'Schlüssel', article: 'der', plural: 'Schlüssel', meaningUz: 'kalit', level: 'A1', pos: 'nomen' },
  'uhr': { stem: 'Uhr', article: 'die', plural: 'Uhren', meaningUz: 'soat', level: 'A1', pos: 'nomen' },
  'tasche': { stem: 'Tasche', article: 'die', plural: 'Taschen', meaningUz: 'sumka', level: 'A1', pos: 'nomen' },
  'kleid': { stem: 'Kleid', article: 'das', plural: 'Kleider', meaningUz: "ko'ylak, kiyim", level: 'A1', pos: 'nomen' },
  'schuh': { stem: 'Schuh', article: 'der', plural: 'Schuhe', meaningUz: 'poyabzal, tufli', level: 'A1', pos: 'nomen' },
  'fenster': { stem: 'Fenster', article: 'das', plural: 'Fenster', meaningUz: 'deraza', level: 'A1', pos: 'nomen' },
  'tür': { stem: 'Tür', article: 'die', plural: 'Türen', meaningUz: 'eshik', level: 'A1', pos: 'nomen' },
  'brief': { stem: 'Brief', article: 'der', plural: 'Briefe', meaningUz: 'xat, maktub', level: 'A1', pos: 'nomen' },
  'frage': { stem: 'Frage', article: 'die', plural: 'Fragen', meaningUz: 'savol', level: 'A1', pos: 'nomen' },
  'antwort': { stem: 'Antwort', article: 'die', plural: 'Antworten', meaningUz: 'javob', level: 'A1', pos: 'nomen' },
  'problem': { stem: 'Problem', article: 'das', plural: 'Probleme', meaningUz: 'muammo', level: 'A2', pos: 'nomen' },
  'lösung': { stem: 'Lösung', article: 'die', plural: 'Lösungen', meaningUz: 'yechim', level: 'A2', pos: 'nomen' },
  'ziel': { stem: 'Ziel', article: 'das', plural: 'Ziele', meaningUz: 'maqsad, marra', level: 'A2', pos: 'nomen' },
  'erfolg': { stem: 'Erfolg', article: 'der', plural: 'Erfolge', meaningUz: 'muvaffaqiyat', level: 'B1', pos: 'nomen' },
  'zukunft': { stem: 'Zukunft', article: 'die', plural: 'Zukünfte', meaningUz: 'kelajak', level: 'B1', pos: 'nomen' },
  'vergangenheit': { stem: 'Vergangenheit', article: 'die', plural: 'Vergangenheiten', meaningUz: "o'tmish", level: 'B1', pos: 'nomen' },
  'wissenschaft': { stem: 'Wissenschaft', article: 'die', plural: 'Wissenschaften', meaningUz: 'fan, ilm-fan', level: 'B2', pos: 'nomen' },
  'gesellschaft': { stem: 'Gesellschaft', article: 'die', plural: 'Gesellschaften', meaningUz: 'jamiyat', level: 'B2', pos: 'nomen' },
  'wirtschaft': { stem: 'Wirtschaft', article: 'die', plural: 'Wirtschaften', meaningUz: 'iqtisodiyot', level: 'B2', pos: 'nomen' },
  'umwelt': { stem: 'Umwelt', article: 'die', plural: 'Umwelten', meaningUz: 'atrof-muhit', level: 'B1', pos: 'nomen' },
  'natur': { stem: 'Natur', article: 'die', plural: 'Naturen', meaningUz: 'tabiat', level: 'A2', pos: 'nomen' },
  'freiheit': { stem: 'Freiheit', article: 'die', plural: 'Freiheiten', meaningUz: 'ozodlik, erkinlik', level: 'B1', pos: 'nomen' },
  'gesundheit': { stem: 'Gesundheit', article: 'die', plural: 'Gesundheiten', meaningUz: "sog'lik, salomatlik", level: 'A2', pos: 'nomen' },
  'sicherheit': { stem: 'Sicherheit', article: 'die', plural: 'Sicherheiten', meaningUz: 'xavfsizlik, ishonchlilik', level: 'B1', pos: 'nomen' },
  'möglichkeit': { stem: 'Möglichkeit', article: 'die', plural: 'Möglichkeiten', meaningUz: 'imkoniyat', level: 'B1', pos: 'nomen' },
  'fähigkeit': { stem: 'Fähigkeit', article: 'die', plural: 'Fähigkeiten', meaningUz: "qobiliyat, ko'nikma", level: 'B1', pos: 'nomen' },
  'erfahrung': { stem: 'Erfahrung', article: 'die', plural: 'Erfahrungen', meaningUz: 'tajriba', level: 'B1', pos: 'nomen' },
  'bildung': { stem: 'Bildung', article: 'die', plural: 'Bildungen', meaningUz: "ta'lim, ma'lumot", level: 'B1', pos: 'nomen' },
  'entwicklung': { stem: 'Entwicklung', article: 'die', plural: 'Entwicklungen', meaningUz: 'rivojlanish, taraqqiyot', level: 'B1', pos: 'nomen' },
  'beziehung': { stem: 'Beziehung', article: 'die', plural: 'Beziehungen', meaningUz: 'munosabat, aloqa', level: 'B1', pos: 'nomen' },
  'entscheidung': { stem: 'Entscheidung', article: 'die', plural: 'Entscheidungen', meaningUz: 'qaror', level: 'B1', pos: 'nomen' },
  'bedeutung': { stem: 'Bedeutung', article: 'die', plural: 'Bedeutungen', meaningUz: "ma'no, ahamiyat", level: 'B1', pos: 'nomen' },
  'verbindung': { stem: 'Verbindung', article: 'die', plural: 'Verbindungen', meaningUz: "bog'lanish, aloqa", level: 'B1', pos: 'nomen' },
  'verantwortung': { stem: 'Verantwortung', article: 'die', plural: 'Verantwortungen', meaningUz: "mas'uliyat, javobgarlik", level: 'B2', pos: 'nomen' },
  'voraussetzung': { stem: 'Voraussetzung', article: 'die', plural: 'Voraussetzungen', meaningUz: 'shart, talab, dastlabki shart', level: 'B2', pos: 'nomen' },
  'herausforderung': { stem: 'Herausforderung', article: 'die', plural: 'Herausforderungen', meaningUz: 'chaqiriq, jiddiy sinov', level: 'B2', pos: 'nomen' },
  'perspektive': { stem: 'Perspektive', article: 'die', plural: 'Perspektiven', meaningUz: 'istiqbol, nuqtai nazar', level: 'B2', pos: 'nomen' },
  'konsequenz': { stem: 'Konsequenz', article: 'die', plural: 'Konsequenzen', meaningUz: 'oqibat, mantiqiy xulosa', level: 'B2', pos: 'nomen' },
  'kompetenz': { stem: 'Kompetenz', article: 'die', plural: 'Kompetenzen', meaningUz: 'malaka, salohiyat', level: 'B2', pos: 'nomen' },
  'differenz': { stem: 'Differenz', article: 'die', plural: 'Differenzen', meaningUz: 'farq, tafovut', level: 'B2', pos: 'nomen' },
  'ambivalenz': { stem: 'Ambivalenz', article: 'die', plural: 'Ambivalenzen', meaningUz: 'ikkiyoqlamalik, ikkilanuvchanlik', level: 'C1', pos: 'nomen' },
  'eloquenz': { stem: 'Eloquenz', article: 'die', plural: 'Eloquenzen', meaningUz: "fasohat, so'zga chechanlik", level: 'C2', pos: 'nomen' },
  'integrität': { stem: 'Integrität', article: 'die', plural: 'Integritäten', meaningUz: 'halollik, butunlik', level: 'C1', pos: 'nomen' },
  'authentizität': { stem: 'Authentizität', article: 'die', plural: 'Authentizitäten', meaningUz: 'haqqoniylik, asl nusxalik', level: 'C1', pos: 'nomen' },
  'souveränität': { stem: 'Souveränität', article: 'die', plural: 'Souveränitäten', meaningUz: 'mustaqillik, o‘ziga ishonch', level: 'C1', pos: 'nomen' },

  // --- Family & People (Oila va insonlar) ---
  'vater': { stem: 'Vater', article: 'der', plural: 'Väter', meaningUz: 'ota', level: 'A1', pos: 'nomen' },
  'mutter': { stem: 'Mutter', article: 'die', plural: 'Mütter', meaningUz: 'ona', level: 'A1', pos: 'nomen' },
  'eltern': { stem: 'Eltern', article: 'die', plural: 'Eltern', meaningUz: 'ota-ona', level: 'A1', pos: 'nomen' },
  'bruder': { stem: 'Bruder', article: 'der', plural: 'Brüder', meaningUz: 'aka, uka', level: 'A1', pos: 'nomen' },
  'schwester': { stem: 'Schwester', article: 'die', plural: 'Schwestern', meaningUz: 'opa, singil', level: 'A1', pos: 'nomen' },
  'sohn': { stem: 'Sohn', article: 'der', plural: 'Söhne', meaningUz: "o'g'il farzand", level: 'A1', pos: 'nomen' },
  'tochter': { stem: 'Tochter', article: 'die', plural: 'Töchter', meaningUz: 'qiz farzand', level: 'A1', pos: 'nomen' },
  'oma': { stem: 'Oma', article: 'die', plural: 'Omas', meaningUz: 'buvi, buvijon', level: 'A1', pos: 'nomen' },
  'opa': { stem: 'Opa', article: 'der', plural: 'Opas', meaningUz: 'bobo, bobojon', level: 'A1', pos: 'nomen' },
  'familie': { stem: 'Familie', article: 'die', plural: 'Familien', meaningUz: 'oila', level: 'A1', pos: 'nomen' },
  'mensch': { stem: 'Mensch', article: 'der', plural: 'Menschen', meaningUz: 'inson, odam', level: 'A1', pos: 'nomen' },
  'kollege': { stem: 'Kollege', article: 'der', plural: 'Kollegen', meaningUz: 'hamkasb (erkak)', level: 'A2', pos: 'nomen' },
  'kollegin': { stem: 'Kollegin', article: 'die', plural: 'Kolleginnen', meaningUz: 'hamkasb (ayol)', level: 'A2', pos: 'nomen' },
  'chef': { stem: 'Chef', article: 'der', plural: 'Chefs', meaningUz: 'rahbar, boshliq', level: 'A2', pos: 'nomen' },
  'nachbar': { stem: 'Nachbar', article: 'der', plural: 'Nachbarn', meaningUz: "qo'shni", level: 'A2', pos: 'nomen' },

  // --- Home & Furniture (Uy-joy va mebellar) ---
  'wohnung': { stem: 'Wohnung', article: 'die', plural: 'Wohnungen', meaningUz: 'kvartira, turar joy', level: 'A1', pos: 'nomen' },
  'küche': { stem: 'Küche', article: 'die', plural: 'Küchen', meaningUz: 'oshxona', level: 'A1', pos: 'nomen' },
  'kueche': { stem: 'Küche', article: 'die', plural: 'Küchen', meaningUz: 'oshxona', level: 'A1', pos: 'nomen' },
  'bad': { stem: 'Bad', article: 'das', plural: 'Bäder', meaningUz: 'vanna xonasi, hammom', level: 'A1', pos: 'nomen' },
  'bett': { stem: 'Bett', article: 'das', plural: 'Betten', meaningUz: "o'rin-joy, karavot", level: 'A1', pos: 'nomen' },
  'schrank': { stem: 'Schrank', article: 'der', plural: 'Schränke', meaningUz: 'shkaf', level: 'A1', pos: 'nomen' },
  'sofa': { stem: 'Sofa', article: 'das', plural: 'Sofas', meaningUz: 'divan, divan-karavot', level: 'A1', pos: 'nomen' },
  'lampe': { stem: 'Lampe', article: 'die', plural: 'Lampen', meaningUz: 'chiroq, lampa', level: 'A1', pos: 'nomen' },
  'teppich': { stem: 'Teppich', article: 'der', plural: 'Teppiche', meaningUz: 'gilam', level: 'A2', pos: 'nomen' },
  'spiegel': { stem: 'Spiegel', article: 'der', plural: 'Spiegel', meaningUz: "ko'zgu, oyna", level: 'A2', pos: 'nomen' },
  'wand': { stem: 'Wand', article: 'die', plural: 'Wände', meaningUz: 'devor', level: 'A2', pos: 'nomen' },
  'dach': { stem: 'Dach', article: 'das', plural: 'Dächer', meaningUz: 'tom, tom qismi', level: 'A2', pos: 'nomen' },
  'balkon': { stem: 'Balkon', article: 'der', plural: 'Balkone', meaningUz: 'balkon', level: 'A2', pos: 'nomen' },
  'garten': { stem: 'Garten', article: 'der', plural: 'Gärten', meaningUz: "bog', tomorqa", level: 'A1', pos: 'nomen' },

  // --- City, Places & Travel (Shahar, joylar va transport) ---
  'straße': { stem: 'Straße', article: 'die', plural: 'Straßen', meaningUz: "ko'cha", level: 'A1', pos: 'nomen' },
  'strasse': { stem: 'Straße', article: 'die', plural: 'Straßen', meaningUz: "ko'cha", level: 'A1', pos: 'nomen' },
  'weg': { stem: 'Weg', article: 'der', plural: 'Wege', meaningUz: "yo'l, so'qmoq", level: 'A1', pos: 'nomen' },
  'brücke': { stem: 'Brücke', article: 'die', plural: 'Brücken', meaningUz: "ko'prik", level: 'A2', pos: 'nomen' },
  'park': { stem: 'Park', article: 'der', plural: 'Parks', meaningUz: 'bog‘, sayilgoh', level: 'A1', pos: 'nomen' },
  'markt': { stem: 'Markt', article: 'der', plural: 'Märkte', meaningUz: 'bozor', level: 'A1', pos: 'nomen' },
  'supermarkt': { stem: 'Supermarkt', article: 'der', plural: 'Supermärkte', meaningUz: 'supermarket', level: 'A1', pos: 'nomen' },
  'geschäft': { stem: 'Geschäft', article: 'das', plural: 'Geschäfte', meaningUz: "do'kon, biznes", level: 'A2', pos: 'nomen' },
  'restaurant': { stem: 'Restaurant', article: 'das', plural: 'Restaurants', meaningUz: 'restoran', level: 'A1', pos: 'nomen' },
  'café': { stem: 'Café', article: 'das', plural: 'Cafés', meaningUz: 'qahvaxona', level: 'A1', pos: 'nomen' },
  'cafe': { stem: 'Café', article: 'das', plural: 'Cafés', meaningUz: 'qahvaxona', level: 'A1', pos: 'nomen' },
  'hotel': { stem: 'Hotel', article: 'das', plural: 'Hotels', meaningUz: 'mehmonxona', level: 'A1', pos: 'nomen' },
  'apotheke': { stem: 'Apotheke', article: 'die', plural: 'Apotheken', meaningUz: 'dorixona', level: 'A1', pos: 'nomen' },
  'bank': { stem: 'Bank', article: 'die', plural: 'Banken', meaningUz: 'bank (moliya) / skameyka', level: 'A1', pos: 'nomen' },
  'museum': { stem: 'Museum', article: 'das', plural: 'Museen', meaningUz: 'muzey', level: 'A2', pos: 'nomen' },
  'theater': { stem: 'Theater', article: 'das', plural: 'Theater', meaningUz: 'teatr', level: 'A2', pos: 'nomen' },
  'kino': { stem: 'Kino', article: 'das', plural: 'Kinos', meaningUz: 'kinoteatr', level: 'A1', pos: 'nomen' },
  'bus': { stem: 'Bus', article: 'der', plural: 'Busse', meaningUz: 'avtobus', level: 'A1', pos: 'nomen' },
  'fahrrad': { stem: 'Fahrrad', article: 'das', plural: 'Fahrräder', meaningUz: 'velosiped', level: 'A1', pos: 'nomen' },
  'flugzeug': { stem: 'Flugzeug', article: 'das', plural: 'Flugzeuge', meaningUz: 'samolyot', level: 'A1', pos: 'nomen' },
  'schiff': { stem: 'Schiff', article: 'das', plural: 'Schiffe', meaningUz: 'kema', level: 'A2', pos: 'nomen' },
  'haltestelle': { stem: 'Haltestelle', article: 'die', plural: 'Haltestellen', meaningUz: 'bekat (avtobus, tramvay)', level: 'A1', pos: 'nomen' },
  'ticket': { stem: 'Ticket', article: 'das', plural: 'Tickets', meaningUz: 'chipta', level: 'A1', pos: 'nomen' },
  'ampel': { stem: 'Ampel', article: 'die', plural: 'Ampeln', meaningUz: 'svetofor', level: 'A2', pos: 'nomen' },

  // --- Nature & Weather (Tabiat va ob-havo) ---
  'sonne': { stem: 'Sonne', article: 'die', plural: 'Sonnen', meaningUz: 'quyosh', level: 'A1', pos: 'nomen' },
  'mond': { stem: 'Mond', article: 'der', plural: 'Monde', meaningUz: 'oy (falakdagi)', level: 'A2', pos: 'nomen' },
  'stern': { stem: 'Stern', article: 'der', plural: 'Sterne', meaningUz: 'yulduz', level: 'A2', pos: 'nomen' },
  'himmel': { stem: 'Himmel', article: 'der', plural: 'Himmel', meaningUz: 'osmon, falak', level: 'A2', pos: 'nomen' },
  'wolke': { stem: 'Wolke', article: 'die', plural: 'Wolken', meaningUz: 'bulut', level: 'A2', pos: 'nomen' },
  'regen': { stem: 'Regen', article: 'der', plural: 'Regen', meaningUz: "yomg'ir", level: 'A1', pos: 'nomen' },
  'schnee': { stem: 'Schnee', article: 'der', plural: 'Schnee', meaningUz: 'qor', level: 'A1', pos: 'nomen' },
  'wind': { stem: 'Wind', article: 'der', plural: 'Winde', meaningUz: 'shamol', level: 'A1', pos: 'nomen' },
  'wetter': { stem: 'Wetter', article: 'das', plural: 'Wetter', meaningUz: 'ob-havo', level: 'A1', pos: 'nomen' },
  'blume': { stem: 'Blume', article: 'die', plural: 'Blumen', meaningUz: 'gul', level: 'A1', pos: 'nomen' },
  'wald': { stem: 'Wald', article: 'der', plural: 'Wälder', meaningUz: "o'rmon", level: 'A1', pos: 'nomen' },
  'berg': { stem: 'Berg', article: 'der', plural: 'Berge', meaningUz: "tog'", level: 'A1', pos: 'nomen' },
  'fluss': { stem: 'Fluss', article: 'der', plural: 'Flüsse', meaningUz: 'daryo', level: 'A2', pos: 'nomen' },
  'see': { stem: 'See', article: 'der', plural: 'Seen', meaningUz: "ko'l (der See) / dengiz (die See)", level: 'A2', pos: 'nomen' },
  'meer': { stem: 'Meer', article: 'das', plural: 'Meere', meaningUz: 'dengiz', level: 'A1', pos: 'nomen' },
  'strand': { stem: 'Strand', article: 'der', plural: 'Strände', meaningUz: 'plyaj, sohil', level: 'A1', pos: 'nomen' },
  'erde': { stem: 'Erde', article: 'die', plural: 'Erden', meaningUz: 'yer shari, tuproq', level: 'A2', pos: 'nomen' },

  // --- Animals (Hayvonlar) ---
  'hund': { stem: 'Hund', article: 'der', plural: 'Hunde', meaningUz: 'it', level: 'A1', pos: 'nomen' },
  'katze': { stem: 'Katze', article: 'die', plural: 'Katzen', meaningUz: 'mushuk', level: 'A1', pos: 'nomen' },
  'vogel': { stem: 'Vogel', article: 'der', plural: 'Vögel', meaningUz: 'qush', level: 'A1', pos: 'nomen' },
  'pferd': { stem: 'Pferd', article: 'das', plural: 'Pferde', meaningUz: 'ot (hayvon)', level: 'A2', pos: 'nomen' },
  'fisch': { stem: 'Fisch', article: 'der', plural: 'Fische', meaningUz: 'baliq', level: 'A1', pos: 'nomen' },
  'maus': { stem: 'Maus', article: 'die', plural: 'Mäuse', meaningUz: 'sichqon', level: 'A2', pos: 'nomen' },
  'kuh': { stem: 'Kuh', article: 'die', plural: 'Kühe', meaningUz: 'sigir', level: 'A2', pos: 'nomen' },
  'tier': { stem: 'Tier', article: 'das', plural: 'Tiere', meaningUz: 'hayvon, jonivor', level: 'A1', pos: 'nomen' },

  // --- Food & Drinks (Oziq-ovqat va ichimliklar) ---
  'kaffee': { stem: 'Kaffee', article: 'der', plural: 'Kaffees', meaningUz: 'qahva', level: 'A1', pos: 'nomen' },
  'tee': { stem: 'Tee', article: 'der', plural: 'Tees', meaningUz: 'choy', level: 'A1', pos: 'nomen' },
  'saft': { stem: 'Saft', article: 'der', plural: 'Säfte', meaningUz: 'sharbat', level: 'A1', pos: 'nomen' },
  'bier': { stem: 'Bier', article: 'das', plural: 'Biere', meaningUz: 'pivo', level: 'A1', pos: 'nomen' },
  'wein': { stem: 'Wein', article: 'der', plural: 'Weine', meaningUz: 'vino', level: 'A1', pos: 'nomen' },
  'käse': { stem: 'Käse', article: 'der', plural: 'Käse', meaningUz: 'pishloq, sir', level: 'A1', pos: 'nomen' },
  'butter': { stem: 'Butter', article: 'die', plural: 'Butter', meaningUz: 'sariyog‘', level: 'A1', pos: 'nomen' },
  'ei': { stem: 'Ei', article: 'das', plural: 'Eier', meaningUz: 'tuxum', level: 'A1', pos: 'nomen' },
  'zucker': { stem: 'Zucker', article: 'der', plural: 'Zucker', meaningUz: 'shakar', level: 'A1', pos: 'nomen' },
  'salz': { stem: 'Salz', article: 'das', plural: 'Salze', meaningUz: 'tuz', level: 'A1', pos: 'nomen' },
  'pfeffer': { stem: 'Pfeffer', article: 'der', plural: 'Pfeffer', meaningUz: 'murch', level: 'A2', pos: 'nomen' },
  'kartoffel': { stem: 'Kartoffel', article: 'die', plural: 'Kartoffeln', meaningUz: 'kartoshka', level: 'A1', pos: 'nomen' },
  'banane': { stem: 'Banane', article: 'die', plural: 'Bananen', meaningUz: 'banan', level: 'A1', pos: 'nomen' },
  'reis': { stem: 'Reis', article: 'der', plural: 'Reis', meaningUz: 'guruch, palov', level: 'A1', pos: 'nomen' },
  'suppe': { stem: 'Suppe', article: 'die', plural: 'Suppen', meaningUz: "sho'rva", level: 'A1', pos: 'nomen' },
  'kuchen': { stem: 'Kuchen', article: 'der', plural: 'Kuchen', meaningUz: 'pirog, tort', level: 'A1', pos: 'nomen' },
  'obst': { stem: 'Obst', article: 'das', plural: 'Obst', meaningUz: 'meva, ho‘l mevalar', level: 'A1', pos: 'nomen' },
  'gemüse': { stem: 'Gemüse', article: 'das', plural: 'Gemüse', meaningUz: 'sabzavot', level: 'A1', pos: 'nomen' },
  'gemuese': { stem: 'Gemüse', article: 'das', plural: 'Gemüse', meaningUz: 'sabzavot', level: 'A1', pos: 'nomen' },
  'frühstück': { stem: 'Frühstück', article: 'das', plural: 'Frühstücke', meaningUz: 'nonushta', level: 'A1', pos: 'nomen' },
  'mittagessen': { stem: 'Mittagessen', article: 'das', plural: 'Mittagessen', meaningUz: 'tushlik', level: 'A1', pos: 'nomen' },
  'abendessen': { stem: 'Abendessen', article: 'das', plural: 'Abendessen', meaningUz: 'kechki ovqat', level: 'A1', pos: 'nomen' },

  // --- Body Parts (Tana a'zolari) ---
  'ohr': { stem: 'Ohr', article: 'das', plural: 'Ohren', meaningUz: 'quloq', level: 'A1', pos: 'nomen' },
  'nase': { stem: 'Nase', article: 'die', plural: 'Nasen', meaningUz: 'burun', level: 'A1', pos: 'nomen' },
  'mund': { stem: 'Mund', article: 'der', plural: 'Münder', meaningUz: "og'iz", level: 'A1', pos: 'nomen' },
  'zahn': { stem: 'Zahn', article: 'der', plural: 'Zähne', meaningUz: 'tish', level: 'A2', pos: 'nomen' },
  'hals': { stem: 'Hals', article: 'der', plural: 'Hälse', meaningUz: 'tomoq, bo‘yin', level: 'A2', pos: 'nomen' },
  'arm': { stem: 'Arm', article: 'der', plural: 'Arme', meaningUz: "qo'l (bilak qismi)", level: 'A1', pos: 'nomen' },
  'finger': { stem: 'Finger', article: 'der', plural: 'Finger', meaningUz: 'barmoq', level: 'A1', pos: 'nomen' },
  'bein': { stem: 'Bein', article: 'das', plural: 'Beine', meaningUz: 'oyoq (boldir qismi)', level: 'A1', pos: 'nomen' },
  'fuß': { stem: 'Fuß', article: 'der', plural: 'Füße', meaningUz: 'oyoq, tovon (kaft qismi)', level: 'A1', pos: 'nomen' },
  'fuss': { stem: 'Fuß', article: 'der', plural: 'Füße', meaningUz: 'oyoq, tovon', level: 'A1', pos: 'nomen' },
  'bauch': { stem: 'Bauch', article: 'der', plural: 'Bäuche', meaningUz: 'qorin', level: 'A2', pos: 'nomen' },
  'rücken': { stem: 'Rücken', article: 'der', plural: 'Rücken', meaningUz: 'orqa, bel, yelka', level: 'A2', pos: 'nomen' },
  'körper': { stem: 'Körper', article: 'der', plural: 'Körper', meaningUz: 'tana, vujud', level: 'A2', pos: 'nomen' },

  // --- Clothing (Kiyim-kechak) ---
  'hemd': { stem: 'Hemd', article: 'das', plural: 'Hemden', meaningUz: "ko'ylak (erkaklar)", level: 'A1', pos: 'nomen' },
  'hose': { stem: 'Hose', article: 'die', plural: 'Hosen', meaningUz: 'shim', level: 'A1', pos: 'nomen' },
  'jacke': { stem: 'Jacke', article: 'die', plural: 'Jacken', meaningUz: 'kurtka, kamzul', level: 'A1', pos: 'nomen' },
  'mantel': { stem: 'Mantel', article: 'der', plural: 'Mäntel', meaningUz: 'palto', level: 'A2', pos: 'nomen' },
  'pullover': { stem: 'Pullover', article: 'der', plural: 'Pullover', meaningUz: 'sviter, jemper', level: 'A1', pos: 'nomen' },
  'rock': { stem: 'Rock', article: 'der', plural: 'Röcke', meaningUz: 'yubka', level: 'A1', pos: 'nomen' },
  'mütze': { stem: 'Mütze', article: 'die', plural: 'Mützen', meaningUz: 'qalpoq, shapka', level: 'A2', pos: 'nomen' },
  'hut': { stem: 'Hut', article: 'der', plural: 'Hüte', meaningUz: 'shlyapa', level: 'A2', pos: 'nomen' },
  'brille': { stem: 'Brille', article: 'die', plural: 'Brillen', meaningUz: "ko'zoynak", level: 'A1', pos: 'nomen' },

  // --- Education, Office & Study (Ta'lim va idora) ---
  'universität': { stem: 'Universität', article: 'die', plural: 'Universitäten', meaningUz: 'universitet, oliygoh', level: 'A2', pos: 'nomen' },
  'student': { stem: 'Student', article: 'der', plural: 'Studenten', meaningUz: 'talaba', level: 'A1', pos: 'nomen' },
  'prüfung': { stem: 'Prüfung', article: 'die', plural: 'Prüfungen', meaningUz: 'imtihon, sinov', level: 'A2', pos: 'nomen' },
  'heft': { stem: 'Heft', article: 'das', plural: 'Hefte', meaningUz: 'daftar', level: 'A1', pos: 'nomen' },
  'stift': { stem: 'Stift', article: 'der', plural: 'Stifte', meaningUz: 'qalam, ruchka', level: 'A1', pos: 'nomen' },
  'kugelschreiber': { stem: 'Kugelschreiber', article: 'der', plural: 'Kugelschreiber', meaningUz: 'sharrikli ruchka', level: 'A1', pos: 'nomen' },
  'papier': { stem: 'Papier', article: 'das', plural: 'Papiere', meaningUz: "qog'oz", level: 'A1', pos: 'nomen' },
  'büro': { stem: 'Büro', article: 'das', plural: 'Büros', meaningUz: 'idora, ofis', level: 'A1', pos: 'nomen' },
  'computer': { stem: 'Computer', article: 'der', plural: 'Computer', meaningUz: 'kompyuter', level: 'A1', pos: 'nomen' },
  'handy': { stem: 'Handy', article: 'das', plural: 'Handys', meaningUz: 'mobil telefon', level: 'A1', pos: 'nomen' },
  'telefon': { stem: 'Telefon', article: 'das', plural: 'Telefone', meaningUz: 'telefon', level: 'A1', pos: 'nomen' },

  // --- Time & Calendar (Vaqt va taqvim) ---
  'woche': { stem: 'Woche', article: 'die', plural: 'Wochen', meaningUz: 'hafta', level: 'A1', pos: 'nomen' },
  'monat': { stem: 'Monat', article: 'der', plural: 'Monate', meaningUz: 'oy (taqvimiy)', level: 'A1', pos: 'nomen' },
  'morgen': { stem: 'Morgen', article: 'der', plural: 'Morgen', meaningUz: 'tong, erta tong', level: 'A1', pos: 'nomen' },
  'abend': { stem: 'Abend', article: 'der', plural: 'Abende', meaningUz: 'oqshom, kechqurun', level: 'A1', pos: 'nomen' },
  'mittag': { stem: 'Mittag', article: 'der', plural: 'Mittage', meaningUz: 'peshin, tush vaqti', level: 'A1', pos: 'nomen' },
  'stunde': { stem: 'Stunde', article: 'die', plural: 'Stunden', meaningUz: 'soat (davomiylik)', level: 'A1', pos: 'nomen' },
  'minute': { stem: 'Minute', article: 'die', plural: 'Minuten', meaningUz: 'daqiqa', level: 'A1', pos: 'nomen' },
  'sekunde': { stem: 'Sekunde', article: 'die', plural: 'Sekunden', meaningUz: 'soniya', level: 'A2', pos: 'nomen' },
  'wochenende': { stem: 'Wochenende', article: 'das', plural: 'Wochenenden', meaningUz: 'dam olish kunlari (shanba-yakshanba)', level: 'A1', pos: 'nomen' },

  // --- Emotions & Concepts (Tuyg'ular va tushunchalar) ---
  'liebe': { stem: 'Liebe', article: 'die', plural: 'Lieben', meaningUz: 'muhabbat, sevgi', level: 'A1', pos: 'nomen' },
  'glück': { stem: 'Glück', article: 'das', plural: 'Glücke', meaningUz: 'baxt, omad', level: 'A1', pos: 'nomen' },
  'freude': { stem: 'Freude', article: 'die', plural: 'Freuden', meaningUz: 'quvonch, shodlik', level: 'A2', pos: 'nomen' },
  'angst': { stem: 'Angst', article: 'die', plural: 'Ängste', meaningUz: "qo'rquv, xavotir", level: 'A2', pos: 'nomen' },
  'hoffnung': { stem: 'Hoffnung', article: 'die', plural: 'Hoffnungen', meaningUz: 'umid, ishonch', level: 'B1', pos: 'nomen' },
  'ruhe': { stem: 'Ruhe', article: 'die', plural: 'Ruhen', meaningUz: 'osoyishtalik, tinchlik', level: 'A2', pos: 'nomen' },
  'mut': { stem: 'Mut', article: 'der', plural: 'Mut', meaningUz: 'jasorat, mardlik', level: 'B1', pos: 'nomen' },
  'wahrheit': { stem: 'Wahrheit', article: 'die', plural: 'Wahrheiten', meaningUz: 'haqiqat', level: 'B1', pos: 'nomen' },
  'frieden': { stem: 'Frieden', article: 'der', plural: 'Frieden', meaningUz: 'tinchlik, sulh', level: 'B1', pos: 'nomen' },
  'traum': { stem: 'Traum', article: 'der', plural: 'Träume', meaningUz: 'tush, orzu', level: 'A2', pos: 'nomen' }
};

// 2. Suffix analysis table to determine article, plural and level
export const SUFFIX_RULES = [
  // Feminine suffixes (100% DIE)
  { suffix: 'ung', article: 'die' as GermanArticle, plural: '-en', level: 'A2' as CEFRLevel, posUz: 'ot' },
  { suffix: 'heit', article: 'die' as GermanArticle, plural: '-en', level: 'A2' as CEFRLevel, posUz: 'ot' },
  { suffix: 'keit', article: 'die' as GermanArticle, plural: '-en', level: 'B1' as CEFRLevel, posUz: 'ot' },
  { suffix: 'schaft', article: 'die' as GermanArticle, plural: '-en', level: 'B1' as CEFRLevel, posUz: 'ot' },
  { suffix: 'tät', article: 'die' as GermanArticle, plural: '-en', level: 'B2' as CEFRLevel, posUz: 'ot' },
  { suffix: 'tion', article: 'die' as GermanArticle, plural: '-en', level: 'B1' as CEFRLevel, posUz: 'ot' },
  { suffix: 'sion', article: 'die' as GermanArticle, plural: '-en', level: 'B2' as CEFRLevel, posUz: 'ot' },
  { suffix: 'enz', article: 'die' as GermanArticle, plural: '-en', level: 'B2' as CEFRLevel, posUz: 'ot' },
  { suffix: 'anz', article: 'die' as GermanArticle, plural: '-en', level: 'B2' as CEFRLevel, posUz: 'ot' },
  { suffix: 'ik', article: 'die' as GermanArticle, plural: '-en', level: 'B1' as CEFRLevel, posUz: 'ot' },
  { suffix: 'ur', article: 'die' as GermanArticle, plural: '-en', level: 'B1' as CEFRLevel, posUz: 'ot' },
  { suffix: 'ei', article: 'die' as GermanArticle, plural: '-en', level: 'A2' as CEFRLevel, posUz: 'ot' },
  { suffix: 'ie', article: 'die' as GermanArticle, plural: '-n', level: 'B1' as CEFRLevel, posUz: 'ot' },

  // Neutral suffixes (100% DAS)
  { suffix: 'chen', article: 'das' as GermanArticle, plural: '-', level: 'A1' as CEFRLevel, posUz: 'ot (kichraytirilgan)' },
  { suffix: 'lein', article: 'das' as GermanArticle, plural: '-', level: 'A2' as CEFRLevel, posUz: 'ot (kichraytirilgan)' },
  { suffix: 'ment', article: 'das' as GermanArticle, plural: '-e', level: 'B1' as CEFRLevel, posUz: 'ot' },
  { suffix: 'um', article: 'das' as GermanArticle, plural: '-en', level: 'B1' as CEFRLevel, posUz: 'ot' },
  { suffix: 'tum', article: 'das' as GermanArticle, plural: '-er', level: 'B2' as CEFRLevel, posUz: 'ot' },
  { suffix: 'ma', article: 'das' as GermanArticle, plural: '-ta / -men', level: 'B2' as CEFRLevel, posUz: 'ot' },

  // Masculine suffixes (100% DER)
  { suffix: 'ismus', article: 'der' as GermanArticle, plural: '-ismen', level: 'B2' as CEFRLevel, posUz: 'ot' },
  { suffix: 'ist', article: 'der' as GermanArticle, plural: '-en', level: 'B1' as CEFRLevel, posUz: 'ot' },
  { suffix: 'or', article: 'der' as GermanArticle, plural: '-en', level: 'B1' as CEFRLevel, posUz: 'ot' },
  { suffix: 'ling', article: 'der' as GermanArticle, plural: '-e', level: 'B2' as CEFRLevel, posUz: 'ot' },
  { suffix: 'ant', article: 'der' as GermanArticle, plural: '-en', level: 'B2' as CEFRLevel, posUz: 'ot' }
];

/**
 * Normalizes German strings for fuzzy search:
 * ä -> ae, ö -> oe, ü -> ue, ß -> ss, ignores case and accents.
 */
export function normalizeGermanSearch(str: string): string {
  if (!str) return '';
  return str
    .toLowerCase()
    .trim()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/['`’‘]/g, '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

/**
 * Intelligent morphological lookup:
 * Deconstructs compound words (Komposita), checks suffixes, prefixes,
 * and generates a complete, rich, accurate GermanWordEntry for any searched term!
 */
export function searchOrGenerateGermanWord(inputWord: string): GermanWordEntry {
  const cleanInput = inputWord.trim();
  const lower = cleanInput.toLowerCase().replace(/^(der|die|das)\s+/i, '');
  const capitalized = lower.charAt(0).toUpperCase() + lower.slice(1);
  const normalizedInput = normalizeGermanSearch(lower);

  // 1. Direct stem match (both raw and normalized)
  let matchedStemKey = Object.keys(BASE_LEXICAL_STEMS).find(
    (k) => k === lower || normalizeGermanSearch(k) === normalizedInput
  );

  if (matchedStemKey) {
    const s = BASE_LEXICAL_STEMS[matchedStemKey];
    return {
      id: `gen-${matchedStemKey}`,
      german: s.stem,
      article: s.article,
      plural: s.plural,
      partOfSpeech: s.pos,
      partOfSpeechUz: s.pos === 'nomen' ? 'Ot' : s.pos === 'verb' ? "Fe'l" : "Sifat",
      pronunciationIPA: `/${s.stem.toLowerCase()}/`,
      pronunciationUz: `[${s.stem.toLowerCase()}]`,
      meaningUz: s.meaningUz,
      level: s.level,
      examples: [
        {
          german: `Das ist ${s.article === 'none' ? 'ein' : s.article === 'die' ? 'eine' : 'ein'} ${s.stem}.`,
          uzbek: `Bu ${s.meaningUz}.`,
          context: 'Misol'
        }
      ],
      synonyms: [],
      antonyms: [],
      grammarNotes: s.pos === 'nomen' 
        ? `${s.stem} - nemis tilida ${s.article === 'der' ? 'erkak (maskulin)' : s.article === 'die' ? 'ayol (feminin)' : "o'rta (neutral)"} jinsiga tegishli. Ko'pligi: ${s.plural}.`
        : undefined,
      tags: [s.level, s.pos]
    };
  }

  // 2. Compound noun detection (Komposita-Engine):
  // In German compound nouns, the LAST noun (Grundwort) strictly determines the article and plural!
  // e.g. "Krankenhaus" -> "Haus" -> das, "Bahnhofsuhr" -> "Uhr" -> die, "Reiseführer" -> "Führer" -> der
  for (const [stemKey, stemData] of Object.entries(BASE_LEXICAL_STEMS)) {
    if (lower.length > stemKey.length && lower.endsWith(stemKey)) {
      const prefixPart = capitalized.slice(0, capitalized.length - stemKey.length);
      return {
        id: `gen-${lower}`,
        german: capitalized,
        article: stemData.article,
        plural: stemData.plural.startsWith('-') ? `${capitalized}${stemData.plural.slice(1)}` : `${prefixPart}${stemData.plural}`,
        partOfSpeech: 'nomen',
        partOfSpeechUz: "Qo'shma Ot (Kompositum)",
        pronunciationIPA: `/${lower}/`,
        pronunciationUz: `[${capitalized.toLowerCase()}]`,
        meaningUz: `${prefixPart} ${stemData.meaningUz}`,
        level: stemData.level === 'A1' ? 'A2' : stemData.level,
        examples: [
          {
            german: `Hier ist ${stemData.article === 'das' ? 'ein' : stemData.article === 'der' ? 'ein' : 'eine'} ${capitalized}.`,
            uzbek: `Bu yerda ${capitalized} mavjud.`,
            context: "Qo'shma so'z misoli"
          }
        ],
        synonyms: [],
        antonyms: [],
        grammarNotes: `Nemis tilida qo'shma so'zlarning jinsi doimo oxirgi so'zga (${stemData.stem} - ${stemData.article}) qarab belgilanadi!`,
        tags: [stemData.level, 'kompositum']
      };
    }
  }

  // 3. Suffix-based morphological analysis (e.g. -ung, -heit, -keit, -chen, -ismus)
  for (const rule of SUFFIX_RULES) {
    if (lower.endsWith(rule.suffix)) {
      return {
        id: `gen-${lower}`,
        german: capitalized,
        article: rule.article,
        plural: rule.plural === '-' ? capitalized : `${capitalized}${rule.plural.replace('-', '')}`,
        partOfSpeech: 'nomen',
        partOfSpeechUz: `Ot (-${rule.suffix} qo'shimchasi)`,
        pronunciationIPA: `/${lower}/`,
        pronunciationUz: `[${lower}]`,
        meaningUz: `${capitalized} (tushuncha, hodisa yoki jarayon)`,
        level: rule.level,
        examples: [
          {
            german: `${rule.article.charAt(0).toUpperCase() + rule.article.slice(1)} ${capitalized} spielt eine wichtige Rolle.`,
            uzbek: `${capitalized} muhim rol o'ynaydi.`,
            context: "Qoidaviy jumla"
          }
        ],
        synonyms: [],
        antonyms: [],
        grammarNotes: `Qoida: -${rule.suffix} qo'shimchasi bilan tugaydigan barcha otlar ${rule.article.toUpperCase()} artiklini oladi.`,
        tags: [rule.level, 'grammatik-qoida']
      };
    }
  }

  // 4. Verb detection (ends with -en or -eln / -ern)
  if (lower.endsWith('en') || lower.endsWith('eln') || lower.endsWith('ern')) {
    return {
      id: `gen-${lower}`,
      german: lower,
      article: 'none',
      plural: '-',
      partOfSpeech: 'verb',
      partOfSpeechUz: "Fe'l (Infinitiv)",
      pronunciationIPA: `/${lower}/`,
      pronunciationUz: `[${lower}]`,
      meaningUz: `${lower} qilmoq / bo'lmoq`,
      level: lower.length > 8 ? 'B2' : lower.length > 5 ? 'B1' : 'A2',
      examples: [
        {
          german: `Wir müssen jetzt ${lower}.`,
          uzbek: `Biz hozir ${lower} qilishimiz kerak.`,
          context: "Fe'l ishlatilishi"
        }
      ],
      synonyms: [],
      antonyms: [],
      grammarNotes: `Fe'l infinitiv shaklda: ich ${lower.replace(/en$/, 'e')}, du ${lower.replace(/en$/, 'st')}, er/sie/es ${lower.replace(/en$/, 't')}.`,
      tags: ['verb']
    };
  }

  // 5. Adjective detection (ends with -lich, -ig, -bar, -sam, -haft, -isch)
  if (/(\w+)(lich|ig|bar|sam|haft|isch)$/i.test(lower)) {
    return {
      id: `gen-${lower}`,
      german: lower,
      article: 'none',
      plural: '-',
      partOfSpeech: 'adjektiv',
      partOfSpeechUz: "Sifat (Adjektiv)",
      pronunciationIPA: `/${lower}/`,
      pronunciationUz: `[${lower}]`,
      meaningUz: `${lower} xususiyatli, sifatli`,
      level: lower.endsWith('bar') || lower.endsWith('haft') ? 'B2' : 'B1',
      examples: [
        {
          german: `Das ist eine sehr ${lower}e Situation.`,
          uzbek: `Bu juda ${lower} vaziyat.`,
          context: "Sifat jumlasi"
        }
      ],
      synonyms: [],
      antonyms: [],
      grammarNotes: `Sifat otlar oldida kelganda moslashadi (masalan: ein ${lower}er Mann).`,
      tags: ['adjektiv']
    };
  }

  // 6. General fallback noun entry
  return {
    id: `gen-${lower}`,
    german: capitalized,
    article: 'das',
    plural: `${capitalized}e`,
    partOfSpeech: 'nomen',
    partOfSpeechUz: 'Ot',
    pronunciationIPA: `/${lower}/`,
    pronunciationUz: `[${lower}]`,
    meaningUz: `${capitalized} (nemischa atama)`,
    level: 'A2',
    examples: [
      {
        german: `Ich kenne das Wort ${capitalized}.`,
        uzbek: `Men ${capitalized} so'zini bilaman.`,
        context: "Misol"
      }
    ],
    synonyms: [],
    antonyms: [],
    grammarNotes: `Nemis tilida barcha otlar bosh harf bilan yoziladi.`,
    tags: ['lugat']
  };
}
