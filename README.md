# World Dominion

Przeglądarkowa współczesna gra grand strategy. Jej głównym interfejsem jest wektorowa mapa polityczna: na poziomie świata pokazuje granice wszystkich państw, a po wejściu do kraju — osobne województwa, landy, stany lub inne regiony administracyjne. Zawiera wybór kraju, zarządzanie prowincjami, gospodarkę, budowę, armie, dyplomację, zapis gry i płynący w czasie rzeczywistym zegar.

## Uruchomienie

Otwórz `index.html` w przeglądarce lub uruchom lokalny serwer:

```bash
python3 -m http.server 8000
```

Następnie wejdź na <http://localhost:8000>. Połączenie internetowe jest potrzebne do pobrania wektorowych danych granic świata i regionów z Highcharts Map Collection. Gra nie korzysta z mapy drogowej ani kafelków Google/OpenStreetMap.

## Rozgrywka

- kliknij dowolne państwo, aby wejść na szczegółową mapę jego regionów administracyjnych,
- kliknij województwo, land, stan lub prowincję, aby nim zarządzać,
- wznoś budynki bezpośrednio w zaznaczonym regionie i obserwuj kolejkę budowy,
- wydaj armii rozkaz ruchu, a następnie wskaż region docelowy bezpośrednio na mapie,
- rekrutuj i trenuj armie, zarządzając pieniędzmi oraz rezerwami,
- kontroluj prędkość upływu czasu lub zatrzymaj grę,
- przełączaj mapę polityczną, gospodarczą, relacji i siły militarnej,
- zapisz postęp lokalnie przyciskiem **ZAPISZ**.
