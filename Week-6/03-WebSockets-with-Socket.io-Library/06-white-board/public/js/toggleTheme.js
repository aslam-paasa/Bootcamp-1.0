function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', newTheme);
    
    // Update theme icon
    const themeIcon = document.querySelector('.theme-toggle .tool-img');
    if (themeIcon) {
        themeIcon.src = newTheme === 'light' 
            ? 'https://img.icons8.com/?size=100&id=BLH852a7CpTm&format=png&color=000000'
            : 'https://img.icons8.com/?size=100&id=20012&format=png&color=000000';
    }
    
    socket.emit('theme-change', newTheme);
}