## Basic Info & Access:
1. str.length - Returns the number of characters in a string
2. str[index] - Access character at a specific index
3. charAt[index] - Same as above but as a method.

## Searching & Checking:
1. indexOf(substring) : Returns first index of substring, else -1
2. lastIndexOf(substring) : Returns last index of substring
3. includes(substring) : Returns true of substring exists.
4. startsWith(prefix) : Check if string starts with given substring
5. endsWith(suffix) : Check if string ends with given substring.


## Extracting Substrings:
1. slice(start, end): Extracts part of string, supports negative indexes.
2. substring(start, end) : Similar to slice but not negative index support.
3. substr(start, length) : (Deprecated) Extracts part based on start & length

## Changing/Modifying Strings:
1. toUpperCase() : Converts all letters to uppercase.
2. toLowerCase() : Converts all letters to lowercase.
3. trim() : Removes spaces from both ends
4. trimStart()/trimEnd() : Trims only start and end
5. replace(search, replace) : Replaces first match
6. replaceAll(search, replace) : Replace all matches (ES2021+)
7. padStart(length, char) : Pads string from start
8. padEnd(length, char) : Pads string from end
9. repeat(count) : Repeats string count times.


## Splitting & Joining:
1. split(separator) : Splits string into an array
2. .join(separator) : (Array method) Joins array back to string.

## Comparing:
1. localeCompare(str) : Compares strings (used for sorting)
2. == / === : Compares equality

## Template Literals:
- Not method but super useful feature

## Conversion:
1. string(value) : Converts any value to string
2. value.toString() : Converts a number/boolean to string.