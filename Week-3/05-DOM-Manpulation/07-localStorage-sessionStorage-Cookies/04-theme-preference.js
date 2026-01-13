/**
 * window.matchMedia()
 * - Isme ek special property hoti hai called 'matches.
 *   a. matches = true  : dark mode hai
 *   a. matches = false : light mode hai
*/


function toggleTheme() {
    if(window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.add('dark'); // dark mode
        document.body.classList.remove('light');
    } else {
        document.body.classList.add('light'); // light mode
        document.body.classList.remove('dark');
    }
}

toggleTheme();

if(localStorage.getItem('theme')) {
    document.body.classList.add(localStorage.getItem('theme'));
} else {
    toggleTheme();
}

/**
 * Jab bhi user dark mode ya light mode ko change karega, toh yeh function
 * call hoga aur theme change hoga.
*/
window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', function() {
        if(!localStorage.getItem('theme')) {
            toggleTheme(); 
        }
    });


let btn = document.getElementById('toggleTheme');
btn.addEventListener('click', function() {
    if(document.body.classList.contains('dark')) {
        document.body.classList.remove('dark');
        document.body.classList.add('light');
        localStorage.setItem('theme', 'light');
    } else {
        document.body.classList.remove('light');
        document.body.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    }
});