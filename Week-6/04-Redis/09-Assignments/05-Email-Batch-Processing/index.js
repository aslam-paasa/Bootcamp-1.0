/**
 * Email Batch Processing:
 * 
 * +------+ CSV Upload  +-----+ Parse CSV  +---------------+ a. Count Nums
 * | User |------------>| API |----------->| Relational DB | b. CSV File Name
 * +------+             +-----+            +---------------+ c. Status(Pending)
 *                                                                    |
 *                                                                    | Once done, update in DB
 *                                                                    |
 *                                                                    V
 *     Publish batchID  +-------+  Push it to Queue (LPUSH)  +-------------------------+
 *    +-----------------| Queue |<---------------------------|  BatchID created in DB  |
 *    | status = queued +-------+                            +-------------------------+
 *    |
 *    V
 * +--------+ a. Jaise hi Queue m koi batchId aaega to worker usse pick kr lega
 * | Worker |    and it will respond to User: batchId, status = processing
 * +--------+ b. One processing done and queue is empty then we will publish
 *               msg: batchId, status = completed.
 * 
 * Tech Stack:
 * 1. Express
 * 2. Postgres/Prisma
 * 3. Redis Queue, Pub Sub (Upstash)
 * 4. HTML, CSS, JS
 * 
 * 27:40
*/ 