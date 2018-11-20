DROP TABLE IF EXISTS kommentar;
DROP TABLE IF EXISTS artikkel;
DROP TABLE IF EXISTS kategori;

CREATE TABLE kategori (
    navn VARCHAR(30) PRIMARY KEY
);

CREATE TABLE artikkel (
    id INT PRIMARY KEY AUTO_INCREMENT,
    tittel VARCHAR(150) NOT NULL,
    bilde VARCHAR(1024) NOT NULL,
    innhold VARCHAR(10240) NOT NULL,
    kategori VARCHAR(30) NOT NULL,
    viktighet INT DEFAULT 2,
    tidspunkt VARCHAR(20),
    CONSTRAINT FOREIGN KEY artikkel(kategori) REFERENCES kategori(navn)
);

CREATE TRIGGER artikkeltid BEFORE INSERT ON artikkel
    FOR EACH ROW SET NEW.tidspunkt=concat(current_date(),' ',hour(current_time()),':',minute(current_time()));

INSERT INTO kategori VALUES ('Sport');
INSERT INTO kategori VALUES ('Mat');
INSERT INTO kategori VALUES ('Underholdning');
INSERT INTO kategori VALUES ('Drap');
INSERT INTO kategori VALUES ('Utenriks');

INSERT INTO artikkel (tittel, bilde, innhold, kategori) VALUES ("Så lett brekker nye iPad Pro", "https://tek.vgc.no/2365/2365598/brekke.956x538.jpg", "Apples nye og svindyre nettbrett, iPad Pro, kan lett brekkes på midten. Det viser en video publisert av YouTube-kanalen JerryRigEverything, som også var blant de første til å melde om Apples bøyeproblemer med iPhone 6 tilbake i 2014.\nI videoen JerryRigEverything har publisert går han igjennom alle de nye funksjonene ved Apples nye nettbrett, og som har blitt hans vanlige testmetodikk prøver han å bøye og brekke produktet mot slutten av videoen. Som du kan se i videoen går det tilsynelatende overraskende lett:\nVideoskaperen sier at ettersom både ladeporten til Apple Pencil og mikrofonhullene på den andre siden er sentrerte i midten, gjør nettbrettet ekstra utsatt for å bli bøyd. Det finnes heller ingen nevneverdige forsterkninger på innsiden som forhindrer at nettbrettet blir bøyd.", "Underholdning");

INSERT INTO artikkel (tittel, bilde, innhold, kategori, viktighet) VALUES ("Matvarene du kan spise etter at de har passert datostemplingen", "https://1.vgc.no/drpublish/images/article/2018/11/09/24488671/1/big_10/2605710.jpg", "I 2017 ble rundt 385.000 tonn spiselig mat kastet i Norge, ifølge en rapport fra Østfoldforskning.\nIfølge rapporten er den viktigste årsaken til matkasting «glemt i kjøleskap/matskap». Undersøkelsen indikerer at den største utfordringen for forbrukerne er å holde oversikt i sitt eget kjøleskap, og bruke opp maten før det kjøpes inn nye varer.\nStadig færre kaster imidlertid mat på grunn av passert holdbarhetsdato, noe som er en positiv utvikling. Likevel gjør fortsatt datostemplingen at vi kaster mye mer enn vi hadde trengt.\nIfølge seniorforskerne Hanne Møller hos Østfoldforskning og Askild Holck hos Nofima er alle varer merket med «best før», så lenge de er oppbevart korrekt, i utgangspunktet trygge å spise etter utgått dato.", "Mat", 1);

INSERT INTO artikkel (tittel, bilde, innhold, kategori, viktighet) VALUES ("Kim har et nytt våpen", "https://smp.vgc.no/v2/images/45504c8b-1b83-45fc-8e17-d03f63f0653e?fit=crop&h=1067&w=1600&s=defd3895e63f7d0022b97c45b4512a371d26c035", "I sommer sa Donald Trump at han stolte på Kim Jong-uns løfter om atomnedrustning. På en pressekonferansen i forbindelse med toppmøtet i Singapore sa presidenten:\n-Det kan være at jeg står foran dere om seks måneder og sier at jeg tok feil. Etter noen sekunders pause la han til: -Jeg vet ikke om jeg ville innrømme det, jeg vil nok finne en aller annen unnskyldning.\nDet er gått vel fem måneder og Trump bør snart finne en forklaring på manglende fremskritt i atomvåpenforhandlingene.\nTrump har sagt at den nordkoreanske trusselen er borte, takket være ham. Den største forandringen er imidlertid at det militære og politiske presset mot Nord-Korea har avtatt. Det var massivt i november i fjor etter at regimet foretok prøveutskytning av en langdistanserakett som skal kunne nå vestkysten av USA.\nKim har ikke skrotet et eneste våpen. Nord-Koreas kjernefysiske arsenal består og regimet har i det siste truet med å gjenoppta testing av raketter og atomvåpen hvis ikke USA hever sanksjonene mot landet. Senteret for strategiske og internasjonale studier, en tenketank i Washington, D.C., rapporterte i forrige uke at de hadde lokalisert mer enn et dusin nordkoreanske rakettbaser. Washington Post siterte i sommer amerikanske etterretningskilder på at de tror Nord-Korea er i gang med å utvikle nye rakettsystemer.\nNå har også Kim avlagt et besøk på et militært testanlegg for første gang på ett år. Fredag sendte det nordkoreanske propaganda-apparatet ut en kryptisk melding om at Kim så en vellykket test av et nytt høyteknologisk våpen som “betydelig vil forbedre kampstyrken”.\nI dokumentet fra toppmøtet i Singapore heter det at partene skal arbeide for atomnedrustning på den koreanske halvøy, uten at det beskrives hvordan og når det skal skje. Det minner om 1990-tallet, da det også ble oppnådd en såkalt historisk enighet om atomnedrustning. Enigheten varte ikke lenge, men i 2003 ble det gjort et nytt diplomatisk forsøk. Seks-lands forhandlingene pågikk noen år, inntil også de kollapset.\nTrump ønsker å fremstille sin dialog med Nord-Koreas diktator som unik og historisk. Men denne prosessen minner i stadig sterkere grad om tidligere presidenters forsøk på det samme. I tillegg til å være en brutal diktator har Kim Jong-un vist betydelige diplomatiske evner. Han har oppnådd den amerikanske presidentens anerkjennelse uten å gi avkall på noe.", "Utenriks", 1);

INSERT INTO artikkel (tittel, bilde, innhold, kategori, viktighet) VALUES ("Tidligere legionærkollega om antatt drapsvåpen: – Ikke et våpen du vil ha i huset", "https://smp.vgc.no/v2/images/12346303-b9c6-466a-858b-cc8641991f4b?fit=crop&h=700&w=850&s=6b85e3c6c8c0206f33b8489e0d01a59f561d3d8e", "– Jeg sa til Svein: Det er ikke et våpen du vil ha i huset. Om politiet ransaker huset ditt og finnet et slikt våpen, så har du problemer. Da fikk jeg beskjed om at våpenet var borte, forteller en tidligere legionær i Hedmarken tingrett mandag.\nSamtalen skal ifølge mannen i 40-årene ha funnet sted 7. januar i år, seks dager før Svein Jemtland ble pågrepet og siktet for drap.\nMannen i 40-årene ble kjent med Jemtland mens de begge tjenestegjorde for den franske hæren Fremmedlegionen. Han forteller at han ble vist dette våpenet, som politiet mener Jemtland skjøt sin kone med natt til 29. desember i fjor, for et par år siden.\nSelv har Jemtland hele tiden hevdet at Makarov-pistolen tilhørte hans avdøde kone og at hun oppbevarte den i nattbordskuffen, men flere vitner har mandag bestridt forklaringen hans. Deriblant Janne Jemtlands bror, Terje Opheim, som hevder at den ble oppbevart på svogerens kontor og at ektemannen hadde virket stolt over å vise det frem.\n«Et leiemord-våpen»\nEn annen venn i 50-årene forklarte at han også for noen år siden ble fremvist et håndvåpen hjemme hos ekteparet i Brumunddal, som han mener er den aktuelle Makarov-pistolen.\n– Han ville vise meg det, og lurte på om jeg kunne se om det var noe spesielt med våpenet. Jeg så at det var et glattboret løp. Da sa Svein: «Det er det man kaller et leiemord-våpen». Det setter ikke spor på kulene, sier kameraten.\nSvein Jemtland vervet seg for den franske hæren Fremmedlegionen etter at han ikke fikk innpass i det norske militæret. Bakgrunnen for det, var en fem måneders voldsdom han ble idømt i 1991, hvor han sammen med andre skal ha utøvt vold mot en vietnamesisk flyktning.", "Drap", 1);

INSERT INTO artikkel (tittel, bilde, innhold, kategori) VALUES ("SØRLOTH FORTVILER: – KUN DE JÆVLA MÅLENE SOM SKAL INN", "https://smp.vgc.no/v2/images/4e56c036-1bac-4e24-9cdc-e6f94f82149e?fit=crop&h=1067&w=1600&s=a979ed7777d62c5543e812b1dd748f60be9f6762", "Crystal Palace-spissen har slitt med lite spilletid i Premier League og ble følgelig vraket av landslagssjef Lars Lagerbäck til troppen mot Slovenia og Kypros. Men på grunn av Joshua Kings forfall ble han hentet inn igjen.\nEtter et anonymt kvarter mot Slovenia fikk trønderspissen muligheten i 20 minutter i 2–0-seieren mot Kypros. Det var nok tid til å skaffe seg to gigantiske muligheter, men Sørloth misbrukte begge – først en for veik avslutning fra kort hold, så en bom på åpent mål.\n– Jeg prøver så godt jeg kan å glemme det, bare gå videre. Ser du bort fra sjansene, så gjør jeg jo et godt innhopp. Det er kun de jævla målene som skal inn. Men det er gjerne litt sånn som spiss at enten så sitter alt, eller så sitter ingenting, sier en slukøret Sørloth til VG.\nMålet hans i ligacupen mot Swansea i slutten av august er Sørloths eneste på de siste fem månedene. Dermed hadde det smakt ekstra godt med et par landslagsmål på Kypros.\nPå sosiale medier ble det uttrykt sympati og medfølelse etter spissens sjansesløsing. «Huff. Fikk vondt i magen av Sørloth», skrev for eksempel Eurosport-profil Susanne Wergeland på Twitter etter den andre misbrukte muligheten.\n– Jeg skal selvfølgelig score, det tror jeg de fleste skjønner. Det er sånn i fotball, det er opp- og nedturer, og jeg er i en dal akkurat nå, sier Sørloth.\n– Hva kan du gjøre for å snu det?\n– Det er egentlig ikke så mye å gjøre. Det er bare snakk om å få det første målet. Jeg vet at ketsjupeffekten kommer hvis jeg scorer ett. Da kan jeg slippe ned skuldrene.\nTrønderkamerat Markus Henriksen erkjenner at Sørloth «hadde to veldig store muligheter han burde scoret på», men roser spissen for de andre bidragene etter innhoppet.\n– Jeg synes han gir oss et helt annet spillmønster fordi han er så stor og vanskelig å håndtere. Stopperne deres var ganske store og solide, men han brukte dem som ryggsekk, sier Henriksen til VG.\nSpisskollega Tarik Elyounoussi har følgende oppmuntrende beskjed til Sørloth:\n– Jeg har vært der jeg også. Alle må ha en sånn periode. Jeg kan love deg at du kommer styrket ut av den perioden. Det er mye å lære. Alexander er jo så ung, han kommer til å lære av dette. Han an er et dyr, så han kommer nok styrket ut av det.", "Sport");

INSERT INTO artikkel (tittel, bilde, innhold, kategori) VALUES ("Én pågrepet etter knivstikking på Blå", "https://smp.vgc.no/v2/images/1d8f1bcc-a683-4f43-bcd7-468f7cfbd817?fit=crop&h=1067&w=1600&s=3e61daf2444d57480d34f307479e53e684f40a35", "– Den siktede personen meldte seg for politiet klokken 20.00 i går kveld, sier politiadvokat Sturla Henriksbø til VG.\nHan sier til VG at mannen gikk rett i avhør etter at han meldte seg for politiet.\n– Han vil bli avhørt mer, men foreløpig har vi ikke satt noe tidspunkt for det. Han vil bli fremstilt for varetektsfengsling onsdag, sier Henriksbø\nPolitiadvokaten sier mannen har forklart at han var på utestedet Blå natt til søndag, og at han var involvert i håndgemeng der.\n– Men han erkjenner ikke straffskyld for å ha stukket noen med kniv.\nPolitiet opplyser til VG at mannen fortsatt er siktet for drapsforsøk:\n– Opplysningene han har gitt oss i avhør stemmer ikke overens med den informasjonen vi har, sier han.\nDet var like før klokken 02.30 natt til søndag at politiet rykket ut etter melding om slagsmål inne på utestedet Blå på Grünerløkka i Oslo. Da de kom frem viste det seg at to personer var knivstukket.\nSøndag ble en mann siktet for drapsforsøk, selv om han på det tidspunktet ikke var pågrepet.\n– Vi kan ikke si noe om opptakten eller motivet nå, men vi har opplysninger som gjør at vi har tatt ut siktelse og aktivt søker etter en konkret, navngitt person, uttalte politiinspektør Grete Lien Metlid til VG søndag ettermiddag.\nPolitikilder har tidligere opplyst til TV 2 at de involverte i saken har tilknytning til den kriminelle gjengen Young Bloods fra Holmlia i Oslo. Det har også politiinspektør Grete Lien Metlid bekreftet overfor TV-kanalen.\n– Vi ser at det er folk involvert som vi har kjennskap til, og som vi kan knytte til et kriminelt miljø, uttalte Metlid til VG.\nI fjor sommer ble fire personer skadet da en mann i 20-årene løsnet skudd utenfor det samme utestedet. Mannen forklarte senere at han skjøt fordi han ble avvist av dørvakten, men nektet straffskyld for drapsforsøk.", "Drap");