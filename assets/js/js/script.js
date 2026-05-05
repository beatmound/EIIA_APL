document.addEventListener("DOMContentLoaded", () => {
            const hash = window.location.hash.replace('#', '');
            if (hash && document.getElementById(hash)) {
                showScreen(hash, false);
            } else {
                showScreen('screen-main', false);
            }

            document.body.addEventListener('click', function(e) {
                const navLink = e.target.closest('a[href^="#screen-"]');
                
                if (navLink) {
                    e.preventDefault();

                    // ==========================================
                    // NEU: Validierung beim Klick auf Primär-Buttons
                    // ==========================================
                    if (navLink.classList.contains('btn-primary')) {
                        const currentScreen = navLink.closest('section');
                        const form = currentScreen.querySelector('form');
                        
                        if (form) {
                            // Spezielle Prüfung für Wochentage Checkboxen in ast-6 und man-2
                            const dayCheckboxes = form.querySelectorAll('input[type="checkbox"][id*="-t"]');
                            if (dayCheckboxes.length > 0) {
                                const isAnyChecked = Array.from(dayCheckboxes).some(cb => cb.checked);
                                if (!isAnyChecked) {
                                    // Setzt einen temporären Fehler auf die "alle"-Checkbox, um den Hinweis anzuzeigen
                                    dayCheckboxes[0].setCustomValidity('Bitte wählen Sie mindestens einen Tag aus.');
                                    form.reportValidity();
                                    dayCheckboxes[0].setCustomValidity(''); 
                                    return; // Bricht den Screen-Wechsel ab
                                }
                            }

                            // Standardprüfung für required-Felder (Radio und Select)
                            if (!form.checkValidity()) {
                                form.reportValidity(); // Zeigt den nativen Hinweis ("Wählen Sie eine der Optionen")
                                return; // Bricht den Screen-Wechsel ab
                            }
                        }
                    }

                    const targetId = navLink.getAttribute('href').replace('#', '');
                    showScreen(targetId);
                }
            });

            // "Alle" Checkbox-Logik für Wochentage
            function initSelectAll(allCheckboxId, dayCheckboxIds) {
                const cbAll = document.getElementById(allCheckboxId);
                if (!cbAll) return; 

                const cbDays = dayCheckboxIds.map(id => document.getElementById(id)).filter(el => el !== null);

                cbAll.addEventListener('change', function() {
                    const isChecked = this.checked;
                    cbDays.forEach(cb => { cb.checked = isChecked; });
                });

                cbDays.forEach(cb => {
                    cb.addEventListener('change', function() {
                        if (!this.checked) {
                            cbAll.checked = false;
                        } else {
                            const allChecked = cbDays.every(box => box.checked);
                            if (allChecked) cbAll.checked = true;
                        }
                    });
                });
            }

            // Init für Assistierte Suche (ast-6)
            initSelectAll('ast6-t1', ['ast6-t2', 'ast6-t3', 'ast6-t4', 'ast6-t5', 'ast6-t6', 'ast6-t7', 'ast6-t8']);
            
            // Init für Manuelle Suche (man-2)
            initSelectAll('man2-t1', ['man2-t2', 'man2-t3', 'man2-t4', 'man2-t5', 'man2-t6', 'man2-t7', 'man2-t8']);
        });

        function showScreen(targetId, pushToHistory = true) {
            const allScreens = document.querySelectorAll('section[id^="screen-"]');
            allScreens.forEach(s => s.classList.add('d-none'));
            
            const target = document.getElementById(targetId);
            if(target) {
                target.classList.remove('d-none');
                window.scrollTo({ top: 0, behavior: 'smooth' });
                
                if (pushToHistory) {
                    history.pushState({ screen: targetId }, '', '#' + targetId);
                }
            }
        }

        window.addEventListener('popstate', (e) => {
            if (e.state && e.state.screen) {
                showScreen(e.state.screen, false);
            } else {
                showScreen('screen-main', false);
            }
        });