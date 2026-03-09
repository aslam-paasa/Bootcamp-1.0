/**
 * Text Generation before LLMs:
 * 1. Statistical Models:
 *    - These models were based purely on probablity and workd frequency.
 *    - The idea was simple: 
 *      "Given previous words, what is the most probable next word?"
 *    - Example: 
 *      - If the sentence is: "I am going to the __"
 *      - The model checks training data and find:
 *        > "market" appeared 40% of time
 *        > "store" appeared 30% of time
 *        > "office" 20%
 *      - It chooses the highest probablity word.
 *      - This is called N-gram model.
 *    - Example:
 *      a. Bigram (2 words): P(word2 | word1)
 *      b. Trigram (3 words): P(word3 | word1, word2)
 * 
 *    Problem with Statistical Models:
 *    a. Only look at small context window (2-3 words)
 *    b. Cannot understand meaning
 *    c. Cannot generalize well
 *    d. Explosion of memory (huge probablity tables)
 *    e. Zero Intelligence - just counting words.
 * 
 *    An N-gram model cannot remember long dependencies. It forgets
 *    context quickly. So researchers said: We need something that
 *    remembers context and Enter RNN.
 * 
 * 2. Recurring Nerual Networks (RNN)
 *    - RNN were introduced to solve the memory problem.
 *    - Instead of just probablity tables, they use neural networks
 *      that process words one by one.
 * 
 *    How RNN works?
 * 
 * 3. Large Language Models (LLM)
*/