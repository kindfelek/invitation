// ========================================
// DANE I STAN APLIKACJI
// ========================================

// Tablica z kolejnymi kwestiami do przeklikania
const textSequence = [
    "Julcia...",
    "czy...",
    "zostaniesz...",
    "moją...",
    "walentynką?"
];

// Aktualny indeks w sekwencji (zaczynamy od 0)
let currentIndex = 0;

// ========================================
// POBIERANIE ELEMENTÓW DOM
// ========================================

const clickableText = document.getElementById('clickable-text');
const hint = document.querySelector('.hint');
const dogPlaceholder = document.getElementById('dog-placeholder');
const buttonsSection = document.getElementById('buttons-section');
const btnYes = document.getElementById('btn-yes');
const btnNo = document.getElementById('btn-no');
const successMessage = document.getElementById('success-message');

// ========================================
// FUNKCJA: PRZEKLIKIWANIE TEKSTÓW
// ========================================

function handleTextClick() {
    // Zwiększamy indeks
    currentIndex++;

    // Sprawdzamy czy doszliśmy do końca sekwencji
    if (currentIndex < textSequence.length) {
        // Pokazujemy następny tekst
        clickableText.textContent = textSequence[currentIndex];
    } else {
        // Koniec sekwencji - pokazujemy pełne pytanie
        showFullQuestion();
    }
}

// ========================================
// FUNKCJA: POKAZANIE PEŁNEGO PYTANIA
// ========================================

function showFullQuestion() {
    // Zmieniamy tekst na pełne pytanie
    clickableText.textContent = "Julcia, czy zostaniesz moją walentynką? 🌹";

    // Dodajemy klasę CSS (zmienia wygląd - mniejszy font, brak hover effect)
    clickableText.classList.add('heartbeat');

    // Ukrywamy hint
    hint.classList.add('hidden');

    // Usuwamy event listener z tekstu (już nie można klikać)
    clickableText.removeEventListener('click', handleTextClick);
    clickableText.style.cursor = 'default';

    // Pokazujemy przyciski po małym opóźnieniu (dla efektu)
    setTimeout(() => {
        buttonsSection.classList.add('visible');
    }, 500);
}

// ========================================
// FUNKCJA: OBSŁUGA PRZYCISKU "TAK"
// ========================================

function handleYesClick() {
    // Ukrywamy przyciski
    buttonsSection.classList.remove('visible');
    buttonsSection.style.display = 'none';

    // Ukrywamy pytanie
    clickableText.style.opacity = '0';

    // Animacja radości pieska
    dogPlaceholder.classList.add('dog-happy');

    // Pokazujemy komunikat sukcesu
    successMessage.style.display = 'block';

    // Opcjonalnie: confetti effect (możemy dodać później)
    console.log('🎉 Sukces! Odpowiedź: TAK');
}

// ========================================
// FUNKCJA: OBSŁUGA PRZYCISKU "NIE" - UCIECZKA
// ========================================

function handleNoInteraction() {
    // Piesek reaguje smutkiem
    dogPlaceholder.classList.remove('dog-sad'); // Reset
    dogPlaceholder.classList.add('dog-sad');

    // Usuwamy klasę po animacji
    setTimeout(() => {
        dogPlaceholder.classList.remove('dog-sad');
    }, 400);

    // Przycisk ucieka!
    moveButtonToRandomPosition();
}

// ========================================
// FUNKCJA: PRZESUNIĘCIE PRZYCISKU W LOSOWE MIEJSCE
// ========================================

function moveButtonToRandomPosition() {
    // Dodajemy klasę "escaping" (zmienia position na fixed)
    btnNo.classList.add('escaping');

    // Pobieramy wymiary okna
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // Pobieramy wymiary przycisku
    const buttonWidth = btnNo.offsetWidth;
    const buttonHeight = btnNo.offsetHeight;

    // Generujemy losową pozycję (z marginesem, żeby nie wychodził poza ekran)
    const margin = 20;
    const randomX = Math.random() * (windowWidth - buttonWidth - margin * 2) + margin;
    const randomY = Math.random() * (windowHeight - buttonHeight - margin * 2) + margin;

    // Ustawiamy nową pozycję
    btnNo.style.left = `${randomX}px`;
    btnNo.style.top = `${randomY}px`;

    console.log(`Przycisk NIE uciekł na pozycję: (${randomX}, ${randomY})`);
}

// ========================================
// FUNKCJA: REAKCJA PIESKA NA HOVER "TAK"
// ========================================

function handleYesHover() {
    // Piesek się cieszy!
    dogPlaceholder.classList.remove('dog-excited'); // Reset
    dogPlaceholder.classList.add('dog-excited');

    // Usuwamy klasę po animacji
    setTimeout(() => {
        dogPlaceholder.classList.remove('dog-excited');
    }, 400);
}

// ========================================
// EVENT LISTENERS
// ========================================

// Kliknięcie w tekst
clickableText.addEventListener('click', handleTextClick);

// Kliknięcie w przycisk TAK
btnYes.addEventListener('click', handleYesClick);

// Hover na przycisk TAK - piesek reaguje
btnYes.addEventListener('mouseenter', handleYesHover);

// Hover na przycisk NIE - przycisk ucieka
btnNo.addEventListener('mouseenter', handleNoInteraction);

// Kliknięcie w przycisk NIE - też ucieka
btnNo.addEventListener('click', handleNoInteraction);

// ========================================
// DEBUGGING - możesz usunąć w finalnej wersji
// ========================================

console.log('🐶 Aplikacja walentynkowa załadowana!');
console.log('📝 Sekwencja tekstów:', textSequence);
console.log('💡 Kliknij w tekst żeby zacząć');