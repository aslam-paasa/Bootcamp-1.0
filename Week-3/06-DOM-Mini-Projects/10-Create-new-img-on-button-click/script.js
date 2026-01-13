/**
 * 1. Button ko select karo
 */
const button = document.querySelector('button');
const body = document.querySelector('body');

/**
 * 2. Button pe click event add karo
 */
button.addEventListener('click', function() {
    
    /**
     * 3. Random number generate karo
    */
    var x = Math.random()*100;
    var y = Math.random()*100;
    
    /**
     * 3. New image element create karo
     */
    const img = document.createElement('img');
    
    /**
     * 4. Image ki properties set karo
     */
    img.src = 'https://images.unsplash.com/photo-1745139755672-88c05b1e47e5?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
    img.style.height = '200px';
    img.style.position = 'absolute';
    img.style.left = x+'%';
    img.style.top = y+'%';
    
    /**
     * 5. Image ko body mein add karo
     */
    body.appendChild(img);
});
