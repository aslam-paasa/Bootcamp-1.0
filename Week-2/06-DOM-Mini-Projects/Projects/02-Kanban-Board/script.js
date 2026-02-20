/**
 * Kanban Board - Ek Simple Project Management Tool:
 * - Ye ek visual tool hai jisse aap apne tasks ko track kar sakte hain
 * - Isme 3 columns hote hain:
 *   1. Todo - Jo tasks abhi start nahi kiye
 *   2. In Progress - Jo tasks abhi kar rahe hain
 *   3. Done - Jo tasks complete ho gaye hain
 * - Example: Trello, JIRA jaise apps mein use hota hai
*/

/**
 * Drag and Drop Events ka Basic Concept:
 * 
 * Card (Task) ke liye events:
 * - dragstart: Jab user card ko drag karna shuru karta hai
 * - dragend: Jab user card ko drag karna band karta hai
 * 
 * Board (Column) ke liye events:
 * - dragover: Jab user card ko board ke upar drag kar raha hota hai
 * - drop: Jab user card ko board par drop karta hai
 * 
 * Simple Explanation:
 * - Jab aap kisi card ko ek board se dusre board par drag karte hain
 * - To wo card automatically us naye board mein add ho jata hai
 * - Jaise Trello mein cards ko move karte hain
*/

/**
 * Step 1: Basic Elements ko Select karna
 * - Add Task button ko select karo
 * - Todo board ko select karo
 */
const addTaskBtn = document.getElementById('add-task-btn');
const todoBoard = document.getElementById('todo-board');

/**
 * Step 2: Drag Events ko Handle karne wala Function
 * - Jab card ko drag karna shuru karein: 'flying' class add karo
 * - Jab card ko drag karna band karein: 'flying' class remove karo
 */
function attachDragEvents(target) {
    target.addEventListener('dragstart', () => {
        target.classList.add('flying');
    })

    target.addEventListener('dragend', () => {
        target.classList.remove('flying');
    })
}

/**
 * Step 3: Add Task Button ka Click Event
 * - User se task ka naam pucho
 * - Naya card banayo
 * - Card ko Todo board mein add karo
 */
addTaskBtn.addEventListener('click', () => {
    // User se task ka naam pucho
    const input = prompt('What is the task?');
    if (!input) return;  // Agar user ne kuch nahi likha to return

    // Naya card banayo
    const taskCard = document.createElement('p');
    taskCard.classList.add('item');
    taskCard.setAttribute('draggable', 'true');  // Card ko drag karne layak banayo
    taskCard.innerText = input;

    // Card ko drag karne ki functionality add karo
    attachDragEvents(taskCard);
    
    // Card ko Todo board mein add karo
    todoBoard.appendChild(taskCard);
})

/**
 * Step 4: Saare Boards aur Items ko Select karna
 */
const allBoards = document.querySelectorAll('.board');
const allItems = document.querySelectorAll('.item');

/**
 * Step 5: Har Item ko Drag karne layak banana
 */
allItems.forEach((item) => {
    attachDragEvents(item);
});

/**
 * Step 6: Boards ko Drop Zone banana
 * - Jab koi card board ke upar drag ho raha ho
 * - To us card ko us board mein add karo
 */
allBoards.forEach(board => {
    board.addEventListener('dragover', () => {
        const flyingElement = document.querySelector('.flying');
        if (flyingElement) {
            board.appendChild(flyingElement);
        }
    })
})
