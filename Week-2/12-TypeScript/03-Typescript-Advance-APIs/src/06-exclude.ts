/**
 * Pehle, hum ek EventType union type banayenge jisme teen events ho sakte hain:
 * > 'click'     => Mouse click event
 * > 'scroll'    => Page scroll event
 * > 'mousemove' => Mouse movement event
 */
type EventType = 'click' | 'scroll' | 'mousemove';

/**
 * Exclude utility type ka use karke hum EventType mein se 'scroll' ko hata denge:
 * 
 * > Exclude<Type, ExcludedUnion> ka matlab hai:
 *   - Type: Original union type (yahan EventType)
 *   - ExcludedUnion: Jo type nikalna hai (yahan 'scroll')
 * 
 * Jaise kisi list mein se ek item ko remove karna!
 */
type ExcludeType = Exclude<EventType, 'scroll'>;

/**
 * Ab hum ek function banayenge jo sirf ExcludeType events handle karega
 * Yani sirf 'click' ya 'mousemove' events, 'scroll' nahi
 */
const handleEvent = (event: ExcludeType) => {
    console.log(`Handling Event: ${event}`);
}

/**
 * Function ko 'click' event ke saath call karte hain
 * Ye valid hai kyunki 'click' ExcludeType ka part hai
 */
handleEvent('click');
