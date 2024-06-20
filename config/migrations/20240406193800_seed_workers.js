//20240406193800_seed_workers.js
// Importowanie biblioteki Knex
const knex = require('knex');
const path = require('path'); // Importowanie modułu path

// Ścieżka do pliku knexfile.js
const knexConfigPath = path.resolve(__dirname, '../knexfile');

// Wczytanie konfiguracji z pliku knexfile.js
const knexConfig = require(knexConfigPath);

// Wybranie konfiguracji dla środowiska development
const db = knex(knexConfig.development);

// Dodawanie pracowników do bazy danych
async function addWorkers() {
    try {
        await db('workers').insert([
            { name: 'John', surname: 'Doe', email: 'john@example.com', position: 'Developer', 'contract': 'umowa o prace', 'vacationDays': 20, 'workHours': 40, 'moneyperHour': 50, 'seniorityinYears': 2 },
            { name: 'Jane', surname: 'Doe', email: 'jane@example.com', position: 'Designer', 'contract': 'umowa zlecenie', 'vacationDays': 15, 'workHours': 30, 'moneyperHour': 40, 'seniorityinYears': 3 }
            // Dodaj więcej pracowników według potrzeb
        ]);
        console.log('Pracownicy zostali pomyślnie dodani do bazy danych.');
    } catch (error) {
        console.error('Wystąpił błąd podczas dodawania pracowników:', error);
    } finally {
        // Zakończ połączenie z bazą danych po zakończeniu operacji
        db.destroy();
    }
}

// Wywołanie funkcji dodającej pracowników
addWorkers();

// Funkcja up - dodaje pracowników
exports.up = async function(knex) {
    try {
        await knex('workers').insert([
            { name: 'John', surname: 'Doe', email: 'john@example.com', position: 'Developer', 'contract': 'umowa o prace', 'vacationDays': 20, 'workHours': 40, 'moneyperHour': 50, 'seniorityinYears': 2 },
            { name: 'Jane', surname: 'Doe', email: 'jane@example.com', position: 'Designer', 'contract': 'umowa zlecenie', 'vacationDays': 15, 'workHours': 30, 'moneyperHour': 40, 'seniorityinYears': 3 }
        ]);
        console.log('Pracownicy zostali pomyślnie dodani do bazy danych.');
    } catch (error) {
        console.error('Wystąpił błąd podczas dodawania pracowników:', error);
        throw error;
    }
};

// Funkcja down - usuwa pracowników
exports.down = async function(knex) {
    try {
        await knex('workers').truncate(); // Usunięcie wszystkich rekordów z tabeli
        console.log('Pracownicy zostali usunięci z bazy danych.');
    } catch (error) {
        console.error('Wystąpił błąd podczas usuwania pracowników:', error);
        throw error;
    }
};
