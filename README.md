# TurboTuner

!! Derzeit kann die Applikation nur ausgeführt werden, wenn in der Datei `server/src/index.ts` Zeile 48 auskommentiert wird und 49 kommentiert wird. Zusätzlich muss in der Datei `server/src/Configs/saveSession.ts` in Zeile 16 _mongoUriCloud_ in _mongoUri_ geändert werden.
Der Vorgang ist nötig, da ich in der Entwicklung mit einer Cloud-Datenbank arbeite, während die Applikation für externe Benutzer mit einer Datenbank im Docker Container funktioniert.

Die Applikation kann gestart werden, indem das Projekt mit `git clone https://github.com/erikrei/TurboTuner.git` kopiert wird. Danach muss man ins Verzeichnis des Projekts und folgenden Befehl eingeben: `docker compose up`. Nach kurzer Zeit ist die Applikation unter folgender Adresse erreichbar: `http://localhost:4200/`

Browsergame, in dem es die Hauptaufgabe ist seine Autos so gut wie möglich zu verbessern und mit denen simulierte Rennen zu fahren.

Die Bilder auf der Seite wurden von folgenden Künstlern erstellt:

- <a href="https://www.freepik.com/free-vector/realistic-car-headlights-ad-composition-headlights-with-green-purple-illumination_13841402.htm#page=2&query=tuning%20car&position=1&from_view=search&track=ais&uuid=bbebc944-6986-4562-ba3a-3ab37069bd21">Image by macrovector</a> on Freepik
- Foto von <a href="https://unsplash.com/de/@obionyeador?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Obi - @pixel8propix</a> auf <a href="https://unsplash.com/de/fotos/graustufenfoto-eines-autos-auf-der-strasse-JIcR3-O8ko8?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
- Foto von <a href="https://unsplash.com/de/@loganmeis?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Logan Meis</a> auf <a href="https://unsplash.com/de/fotos/schwarzes-auto-7qLT-Msda1k?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
