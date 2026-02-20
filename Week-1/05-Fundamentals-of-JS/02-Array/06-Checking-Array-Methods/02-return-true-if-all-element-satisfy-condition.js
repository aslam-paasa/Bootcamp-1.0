/**
 * Step 2: every() - Saare Elements Condition Satisfy Kare
 * > every() check karta hai ki array ke saare elements condition satisfy 
 *   karte hain ya nahi.
 * > Syntax: 
 *   array.every(function(currentValue, index, array) {
 *       return condition;
 *   });
*/


/**
 * Example 1: Basic every operation
*/

const numbers = [2, 4, 6, 8, 10];

console.log("🔢 Numbers:", numbers);

/* Saare numbers even hain? */
const allEven = numbers.every(num => num % 2 === 0);
console.log("All numbers even?", allEven); // true

/* Saare numbers positive hain? */
const allPositive = numbers.every(num => num > 0);
console.log("All numbers positive?", allPositive); // true

/* Saare numbers 5 se bade hain? */
const allGreaterThan5 = numbers.every(num => num > 5);
console.log("All numbers > 5?", allGreaterThan5); // false (2,4 are not)



/**
 * Example 2: Real World - Quality Control System
*/

class QualityControl {
    static checkProductBatch(products) {
        console.log("🏭 Quality Control Check:");

        /* Saare products available hain? */
        const allAvailable = products.every(product => product.inStock);
        if (!allAvailable) {
            console.log("❌ Some products are out of stock");
            return false;
        }

        /* Saare products ki quality acceptable hai? */
        const allGoodQuality = products.every(product => product.quality >= 8);
        if (!allGoodQuality) {
            console.log("❌ Some products have low quality");
            return false;
        }

        /* Saare products properly priced hain? */
        const allProperlyPriced = products.every(product => 
            product.price > 0 && product.price < 100000
        );
        if (!allProperlyPriced) {
            console.log("❌ Some products have invalid pricing");
            return false;
        }

        /* Saare products ke required fields hain? */
        const allHaveRequiredFields = products.every(product =>
            product.name && product.price && product.category
        );
        if (!allHaveRequiredFields) {
            console.log("❌ Some products missing required fields");
            return false;
        }

        console.log("✅ All quality checks passed! Batch is ready for shipping.");
        return true;
    }

    static checkStudentEligibility(students, minAttendance = 75, minMarks = 60) {
        console.log("🎓 Student Eligibility Check:");

        const allEligible = students.every(student => 
            student.attendance >= minAttendance && 
            student.marks >= minMarks
        );

        if (allEligible) {
            console.log("✅ All students are eligible for exams!");
        } else {
            console.log("❌ Some students are not eligible for exams");
            
            /* Find which students failed */
            const ineligibleStudents = students.filter(student => 
                student.attendance < minAttendance || 
                student.marks < minMarks
            );
            
            ineligibleStudents.forEach(student => {
                const issues = [];
                if (student.attendance < minAttendance) issues.push(`attendance (${student.attendance}%)`);
                if (student.marks < minMarks) issues.push(`marks (${student.marks})`);
                console.log(`   ❌ ${student.name}: ${issues.join(', ')}`);
            });
        }

        return allEligible;
    }
}

/* Usage */
const productBatch = [
    { name: "Laptop", price: 50000, inStock: true, quality: 9 },
    { name: "Mouse", price: 1500, inStock: true, quality: 8 },
    { name: "Keyboard", price: 3000, inStock: true, quality: 7 } // Low quality
];

QualityControl.checkProductBatch(productBatch);

console.log("\n--- Student Check ---");
const students = [
    { name: "Rahul", attendance: 80, marks: 75 },
    { name: "Priya", attendance: 90, marks: 85 },
    { name: "Amit", attendance: 70, marks: 55 } // Low attendance and marks
];

QualityControl.checkStudentEligibility(students);



/**
 * Example 3: Game Level Completion Check
*/

class GameProgress {
    constructor() {
        this.levels = [
            { level: 1, name: "Tutorial", completed: true, stars: 3 },
            { level: 2, name: "Forest", completed: true, stars: 2 },
            { level: 3, name: "Castle", completed: false, stars: 0 },
            { level: 4, name: "Dungeon", completed: false, stars: 0 }
        ];
    }

    checkGameProgress() {
        console.log("🎮 Game Progress Check:");

        /* Saare levels complete hain? */
        const allLevelsCompleted = this.levels.every(level => level.completed);
        if (allLevelsCompleted) {
            console.log("🎉 Congratulations! You completed the game!");
            return true;
        }

        /* Saare completed levels mein at least 1 star hai? */
        const completedLevels = this.levels.filter(level => level.completed);
        const allHaveStars = completedLevels.every(level => level.stars > 0);
        
        if (allHaveStars) {
            console.log("⭐ Good job! All completed levels have stars!");
        }

        /* Next incomplete level find karo */
        const nextLevel = this.levels.find(level => !level.completed);
        if (nextLevel) {
            console.log(`➡️ Next level to complete: ${nextLevel.name} (Level ${nextLevel.level})`);
        }

        /* Progress percentage */
        const completedCount = this.levels.filter(level => level.completed).length;
        const progress = (completedCount / this.levels.length) * 100;
        console.log(`📊 Progress: ${progress.toFixed(1)}% (${completedCount}/${this.levels.length} levels)`);

        return false;
    }

    canUnlockBonusContent() {
        /* Bonus content ke liye saare levels complete hone chahiye with at least 2 stars */
        const canUnlock = this.levels.every(level => 
            level.completed && level.stars >= 2
        );

        console.log(canUnlock ? 
            "🎁 Bonus content unlocked!" : 
            "🔒 Complete all levels with 2+ stars to unlock bonus content"
        );

        return canUnlock;
    }
}

/* Usage */
const game = new GameProgress();
game.checkGameProgress();
game.canUnlockBonusContent();