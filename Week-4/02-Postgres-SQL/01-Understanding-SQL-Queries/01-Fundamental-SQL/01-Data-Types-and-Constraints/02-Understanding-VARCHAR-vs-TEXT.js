/**
 * Understanding VARCHAR vs TEXT:
 * > VARCHAR(n) has a max length limit, TEXT has no limit. 
 * > Both store text/strings.
 * 
 * > VARCHAR(n) limits characters to n. 
 * > TEXT has no limit but might be slower. 
 * > Use VARCHAR for short text (names, codes), TEXT for long content 
 *   (descriptions, comments).
*/

/**
 * Q. Select name (VARCHAR 100) and description (TEXT) from products. 
 *    Notice VARCHAR has length limits, TEXT does not.
*/