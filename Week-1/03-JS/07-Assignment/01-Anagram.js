/**
 * Write a function isAnagram which takes 2 parameters and returns 
 * true/false if those are anagrams or not. What's Anagram? A word,
 * phrase, or name formed by rearranging the letters of another, 
 * such as spar, formed from rasp.
*/


function isAnagram(str1, str2) {
    let sortedStr1 = str1.toLowerCase().split('').sort().join('');
    let sortedStr2 = str2.toLowerCase().split('').sort().join('');
    return sortedStr1 === sortedStr2;
  }


/**
 * Here's how the fn works:
 * a. Convert the input strings to lowercase, split them into arrays so
 *    that we can sort them, and then join them back into strings.
 * b. Compare the two strings and return true if they are anagrams of 
 *    each other, and false if they are not.
*/

