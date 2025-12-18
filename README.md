# TIJOII

## 1. Instalacja zależności

cd backend  
npm install
cd ../frontend
npm install

## 2. Uruchomienie backendu

cd backend
npm run dev

## 3. Uruchomienie frontendu

cd frontend
npm run dev

## 4. Testy

npm test  
npm run test:unit  
npm run test:integration  

## Testy manualne

| ID                | TC001                          |
|-------------------|--------------------------------|
| Tytuł             | Wyszukiwanie książek przez OpenLibrary |
| Warunki początkowe| Aplikacja jest uruchomiona |
| Kroki testowe     | 1. Wybierz źródło API "OpenLibrary".<br>2. W polu wyszukiwania wpisz "The Lord of the Rings".<br>3. Naciśnij przycisk "Szukaj".<br>4. Poczekaj na wyniki wyszukiwania. |
| Oczekiwany rezultat | Lista książek autorstwa Tolkiena wyświetla się na ekranie (maksymalnie 10 wyników). |

---

| ID                | TC002                          |
|-------------------|--------------------------------|
| Tytuł             | Wyszukiwanie filmów przez TMDB |
| Warunki początkowe| Aplikacja jest uruchomiona, klucz TMDB API jest skonfigurowany (domyślny lub własny) |
| Kroki testowe     | 1. Wybierz źródło API "TMDB".<br>2. W polu wyszukiwania wpisz "matrix".<br>3. Naciśnij przycisk "Szukaj".<br>4. Poczekaj na wyniki wyszukiwania. |
| Oczekiwany rezultat | Lista filmów zawierających "matrix" w tytule wyświetla się na ekranie (maksymalnie 10 wyników). Każdy film zawiera tytuł, rok, ocenę i plakat. |

---

| ID                | TC003                          |
|-------------------|--------------------------------|
| Tytuł             | Walidacja poprawnego klucza TMDB API |
| Warunki początkowe| Aplikacja jest uruchomiona, użytkownik ma poprawny klucz TMDB API |
| Kroki testowe     | 1. Przewiń do sekcji "TMDB API Key Configuration".<br>2. Wybierz opcję "Custom API Key".<br>3. Wklej poprawny klucz API do pola tekstowego.<br>4. Naciśnij przycisk "Save Configuration". |
| Oczekiwany rezultat | Wyświetla się komunikat "API key is valid". |

---

| ID                | TC004                          |
|-------------------|--------------------------------|
| Tytuł             | Manualne dodawanie media do kolekcji |
| Warunki początkowe| Aplikacja jest uruchomiona, formularz "Add Media Manually" jest widoczny |
| Kroki testowe     | 1. Przewiń do sekcji "Add Media Manually".<br>2. Wypełnij pole "Title" wartością "1984".<br>3. Wybierz typ "Book" z listy rozwijanej.<br>4. Ustaw ocenę na 5 gwiazdek.<br>5. W polu "Tags" wpisz "sci-fi, drama".<br>6. W polu "Description" wpisz "A dystopian novel by George Orwell".<br>7. Naciśnij przycisk "Add to Collection". |
| Oczekiwany rezultat | Nowe media "1984" pojawia się w sekcji "My Collection". Wyświetla się powiadomienie "Media added". Media zawiera wszystkie wprowadzone dane. |

---

| ID                | TC005                          |
|-------------------|--------------------------------|
| Tytuł             | Usuwanie media z kolekcji |
| Warunki początkowe| Aplikacja jest uruchomiona, w kolekcji znajduje się przynajmniej jedno media |
| Kroki testowe     | 1. Znajdź wybraną pozycję w sekcji "My Collection".<br>2. Naciśnij przycisk usunięcia - czerwony X.<br>|
| Oczekiwany rezultat | Media zostaje usunięte z kolekcji i znika z ekranu. Lista kolekcji aktualizuje się automatycznie. |

---

| ID                | TC006                          |
|-------------------|--------------------------------|
| Tytuł             | Aktualizacja oceny gwiazdkowej |
| Warunki początkowe| Aplikacja jest uruchomiona, w kolekcji znajduje się media z oceną |
| Kroki testowe     | 1. Znajdź wybrane media w sekcji "My Collection".<br>2. Kliknij na gwiazdkę reprezentującą nową ocenę.<br> |
| Oczekiwany rezultat | Ocena media zmienia się na wybraną wartość. Nowa ocena jest widoczna natychmiast bez przeładowania strony. |

---

| ID                | TC007                          |
|-------------------|--------------------------------|
| Tytuł             | Dodawanie komentarza do media |
| Warunki początkowe| Aplikacja jest uruchomiona, w kolekcji znajduje się przynajmniej jedno media |
| Kroki testowe     | 1. Znajdź wybrane media w sekcji "My Collection".<br>2. Przewiń do sekcji komentarzy danego media.<br>3. W polu tekstowym wpisz komentarz "Świetna książka, polecam!".<br>4. Naciśnij niebieski przycisk "Add" lub Enter. |
| Oczekiwany rezultat | Nowy komentarz pojawia się na liście komentarzy wybranego media. Pole tekstowe zostaje wyczyszczone po dodaniu komentarza. |

---

| ID                | TC008                          |
|-------------------|--------------------------------|
| Tytuł             | Usuwanie komentarza z media |
| Warunki początkowe| Aplikacja jest uruchomiona, wybrane media ma przynajmniej jeden komentarz |
| Kroki testowe     | 1. Znajdź wybrane media w sekcji "My Collection".<br>2. Przewiń do sekcji komentarzy danego media.<br>3. Znajdź komentarz do usunięcia.<br>4. Naciśnij czerwoną ikonę usuwania X przy komentarzu. |
| Oczekiwany rezultat | Wybrany komentarz zostaje usunięty z listy i znika z ekranu. Pozostałe komentarze pozostają niezmienione. |

---

| ID                | TC009                          |
|-------------------|--------------------------------|
| Tytuł             | Edycja szczegółów media (tytuł, opis) |
| Warunki początkowe| Aplikacja jest uruchomiona, w kolekcji znajduje się przynajmniej jedno media |
| Kroki testowe     | 1. Znajdź wybrane media w sekcji "My Collection".<br>2. Naciśnij niebieski przycisk edycji na karcie media.<br>3. W oknie edycji zmień tytuł na "1984 - Updated".<br>4. Zmień opis na "A classic dystopian novel".<br>5. Dodaj tag "horror" do istniejących tagów.<br>6. Naciśnij zielony przycisk zapisywania "V". |
| Oczekiwany rezultat | Media zostaje zaktualizowane z nowymi danymi. Zmiany są widoczne natychmiast w kolekcji. Okno edycji zamyka się automatycznie po zapisaniu. |

---

| ID                | TC010                          |
|-------------------|--------------------------------|
| Tytuł             | Dodawanie filmów z wyników wyszukiwania |
| Warunki początkowe| Aplikacja jest uruchomiona, wyszukiwanie zostało wykonane i zwróciło wyniki |
| Kroki testowe     | 1. Ustaw źródło na TMDB.<br>2. Wyszukaj "The Lord of the Rings".<br>3. Wybierz pozycję z listy wyników.<br>4. Naciśnij przycisk "Add to Collection" przy wybranym wyniku. |
| Oczekiwany rezultat | Wybrane media zostaje dodane do kolekcji z danymi. Wyświetla się powiadomienie  potwierdzające dodanie. Media pojawia się w sekcji "My Collection" z domyślną oceną 1 gwiazdki. |
