// Initialisiert die App beim Laden der Seite
document.addEventListener("DOMContentLoaded", () => {
    // Prüft, ob beim Neuladen schon ein Screen in der URL steht (z.B. #screen-man-1)
    const hash = window.location.hash.replace('#', '');
    if (hash && document.getElementById(hash)) {
        showScreen(hash, false); 
        history.replaceState({ screen: hash }, '', '#' + hash);
    } else {
        showScreen('screen-main', false);
        history.replaceState({ screen: 'screen-main' }, '', '#screen-main');
    }
});

// Die Hauptfunktion zum Navigieren
function showScreen(targetId, pushToHistory = true) {
    // Verhindert Standard-Aktionen bei Links/Buttons
    if (event) event.preventDefault();

    // 1. Alle Screens verstecken
    const allScreens = document.querySelectorAll('[id^="screen-"]');
    allScreens.forEach(screen => {
        screen.classList.add('d-none');
    });
    
    // 2. Ziel-Screen einblenden
    const targetScreen = document.getElementById(targetId);
    if(targetScreen) {
        targetScreen.classList.remove('d-none');
    }
    
    // 3. Nach oben scrollen
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // 4. In die Browser-Historie eintragen (für den Zurück-Button)
    if (pushToHistory) {
        history.pushState({ screen: targetId }, '', '#' + targetId);
    }
}

// Lauscht auf den "Zurück" oder "Vor" Button des Browsers/Handys
window.addEventListener('popstate', function(event) {
    if (event.state && event.state.screen) {
        showScreen(event.state.screen, false); // false = nicht erneut in die Historie eintragen
    } else {
        showScreen('screen-main', false);
    }
});