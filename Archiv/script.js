// Diese Funktion steuert das Aus- und Einblenden der Screens
function showScreen(targetId) {
    
    // 1. Hole alle HTML-Elemente, deren ID mit "screen-" beginnt
    const allScreens = document.querySelectorAll('[id^="screen-"]');
    
    // 2. Verstecke sie alle (indem wir die Bootstrap-Klasse 'd-none' hinzufügen)
    allScreens.forEach(screen => {
        screen.classList.add('d-none');
    });
    
    // 3. Suche den EINEN Screen, den wir anzeigen wollen (targetId)
    const targetScreen = document.getElementById(targetId);
    
    // 4. Wenn dieser Screen existiert, entferne das 'd-none', um ihn sichtbar zu machen
    if(targetScreen) {
        targetScreen.classList.remove('d-none');
    }
    
    // 5. Scrolle die Seite wieder flüssig nach ganz oben (wichtig auf dem Handy)
    window.scrollTo({ top: 0, behavior: 'smooth' });
}