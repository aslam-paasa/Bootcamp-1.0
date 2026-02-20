/**
 * Step 5: splice() - Kisi bhi Position Par Add/Remove Karna
 * > splice() kisi bhi index par elements ko add, remove ya replace kar 
 *   sakta hai.
 * 
 * Syntax: 
 * a. Remove elements
 *    > array.splice(start, deleteCount)
 *
 * b. Add elements  
 *    > array.splice(start, 0, item1, item2, ...)
 *
 * c. Replace elements  
 *    > array.splice(start, deleteCount, item1, item2, ...)
 *
*/


/**
 * Example 1: Elements Remove Karna
*/

const colors = ["Red", "Green", "Blue", "Yellow", "Purple"];

console.log("Original colors:", colors);

/* Index 2 se 1 color remove karo */
const removedColors = colors.splice(2, 1);
console.log("Removed colors:", removedColors); // ["Blue"]
console.log("Updated colors:", colors); // ["Red", "Green", "Yellow", "Purple"]

/* Index 1 se 2 colors remove karo */
const removedColors2 = colors.splice(1, 2);
console.log("Removed colors:", removedColors2); // ["Green", "Yellow"]
console.log("Final colors:", colors); // ["Red", "Purple"]



/**
 * Example 2: Elements Add Karna
*/

const fruits = ["Apple", "Banana", "Mango"];

console.log("Original fruits:", fruits);

/* Index 1 par new fruits add karo (kuch remove nahi karna) */
fruits.splice(1, 0, "Orange", "Grapes");
console.log("After adding:", fruits); // ["Apple", "Orange", "Grapes", "Banana", "Mango"]



/**
 * Example 3: Elements Replace Karna
*/

const students = ["Rahul", "Priya", "Amit", "Neha"];

console.log("Original students:", students);

/* Index 2 par 1 student ko replace karo */
const replaced = students.splice(2, 1, "Raj");
console.log("Replaced student:", replaced); // ["Amit"]
console.log("Updated students:", students); // ["Rahul", "Priya", "Raj", "Neha"]



/**
 * Example 4: Real World - Playlist Management
*/

class MusicPlaylist {
    constructor() {
        this.playlist = [
            "Song1 - Artist1",
            "Song2 - Artist2", 
            "Song3 - Artist3",
            "Song4 - Artist4",
            "Song5 - Artist5"
        ];
    }
    
    removeSong(position) {
        if (position < 1 || position > this.playlist.length) {
            console.log("❌ Invalid position!");
            return;
        }
        const removed = this.playlist.splice(position - 1, 1);
        console.log(`❌ Removed: ${removed[0]}`);
    }
    
    addSong(song, position = null) {
        if (position === null) {
            /* End mein add karo */
            this.playlist.push(song);
            console.log(`✅ Added to end: ${song}`);
        } else {
            /* Specific position par add karo */
            this.playlist.splice(position - 1, 0, song);
            console.log(`✅ Added at position ${position}: ${song}`);
        }
    }
    
    moveSong(fromPosition, toPosition) {
        if (fromPosition === toPosition) {
            console.log("⚠️ Same position!");
            return;
        }
        
        const [movedSong] = this.playlist.splice(fromPosition - 1, 1);
        this.playlist.splice(toPosition - 1, 0, movedSong);
        console.log(`🔀 Moved "${movedSong}" from ${fromPosition} to ${toPosition}`);
    }
    
    showPlaylist() {
        console.log("🎵 Current Playlist:");
        this.playlist.forEach((song, index) => {
            console.log(`${index + 1}. ${song}`);
        });
    }
}

/* Usage */
const myPlaylist = new MusicPlaylist();
myPlaylist.showPlaylist();

myPlaylist.removeSong(3); // 3rd song remove karo
myPlaylist.addSong("New Song - New Artist", 2); // 2nd position par add karo
myPlaylist.moveSong(4, 1); // 4th song ko 1st position par le jao
myPlaylist.showPlaylist();