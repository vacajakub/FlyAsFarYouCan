Nekonečná čistě javascriptová hra inspirující se Jetpack Joyride a Flappy bird.
Cílem je vyhýbat se všem překážkám co nejdýl a tím pádem získat nejvyšší skóre. Hra se postupně ztěžuje zvětšením rychlosti.
Ve hře jsou k dispozici až 3 různé pozadí, které se náhodně vybírají při startu hry.

Architektura:

Všechny objekty ve hře, dědí od objektu GameObject, který definuje jejich výšku, šířku, pozici x a y v canvasu a jejich rychlost. Dále definuje dvě metody update pro přepočítání logiky a render pro vykreslení objektu na canvas. Takto jsem se inspiroval např. z Unity.

Dále jsou ve hře objekty:
    Player - objekt hráče
    Obstacle - objekt překážky
    Background - objekt pozadí

Veškerá logika hry je pak obsáhlá v souboru logic.js

Všechny objekty se pohybují doleva kromě hráče a tak vniká iluze pohybu vpřed.
Používáme dvě instance Backgroud, které jsou za sebou a tak na sebe nekonečně navazují při pohybu.
Dále dvě instance Obstacle, kterým se po vyběhnutí se záběru přepočítá náhodně pozice a výška. Takto se vyhneme tvoření nekonečného množství objektů. Výpočet není čistě náhodný, je zajištěno aby se dalo překážce pokaždé vyhnout.

Pro detekci kolizí hráče s překážkou je použita jednoduchá AABB collision detection. Po detekování kolize hráče s překážkou hra končí a skóre se zapíše do tabulky výsledků.

Při hře ovládáme hudbu pomocí javascriptu. Dále je objekt hráče tvořený 2 sprity, které měníme abychom dosáhli animace točení vrtule. Při naražení je přehrán zvuk srážky a obrázek hráče překreslen na poničené letadlo.


Herní smyčka:

V souboru logic.js nejdříve nadefinujeme vše potřebné k vytvoření hry. Vytvoříme objekty, načteme hudbu apod. Poté zavoláme metodu play(), která se stará o herní smyčku pomocí window.requestAnimationFrame. Při každém běhu updatujeme všechny objekty a znova je překreslíme. Dále kontrolujeme stav hry (gameOver, paused).


Ostatní funkcionalita:

Stránka je tvořená jako single page stránka, pomocí horního nav elementu se můžeme překliknout do sekcí Ovládání, Tabulka výsledků a Poslání návrhů. Přechod mezi sekcemi je animovaný pomocí jQuery.

Sekce Ovládání:
Zde je dodán svg obrázek klávesy šipky nahoru, který je animovaný při najetí.

Sekce Tabulka výsledků:
Zde je generována tabulka výsledků. Výsledky jsou uloženy v localStorage. Pokaždé se vybere pouze maximálně 10 nejlpších výsledků.

Sekce Poslání návrhů:
Zde je formulář pro poslání zprávy. Email input je opatřený regexp pro email a jsou nastaveny required a placeholdery. Odeslání formuláře je ošetřeno pouze javascriptem, jelikož nemáme žádný backend.

Detekce online/offline:
V horním levém rohu navu můžeme vidět ikonku, která ukazuje jestli jsme zrovna připojení k internetu. 

Responsivní design:
Horní meny se při detekování malé obrazovky přetransofrmuje. Dále je nastavená minimální šířka okna, kvůli canvasu.

Kompatibilita:
Pro kompatibilitu CSS jsou všude přidány vendor prefixy. Dále byla aplikace vyvíjena v Google Chroma a funkcionalita otestována i v Mozzile Firefox, kde bylo nutné změnit ES6 definici funkcí v objektech.



Postup:

Nejdříve jsem se snažil dosáhnout nekonečného loopování pozadí v canvasu. Poté jsem přidal hráče a první stacionární překážky. Následně jsem naimplementoval kolizi detekcí a poté jse se vrhnul na náhodné generování překážek a počítání skóre.
Po vytvoření hry jsem se věnoval vytvoření html a css stránky, přidáním tabulky výsledků, offline api, ovládání a přidání formuláře zlepšení.



Ovládání:

Hru stačí spustit/pauznout tlačítkem Enter, poté se ovládá již jen stisknutím šipky nahoru.
