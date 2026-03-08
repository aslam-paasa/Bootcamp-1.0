/**
 * UDP Protocol (User Datagram Protocol):
 * > UDP is another protocol used in the Transport Layer of the TCP/IP model.
 * > It is a simple protocol used to send data quickly from one machine
 *   to another.
 *
 * > Like TCP, UDP receives data from the application layer and breaks it
 *   into smaller pieces called segments (often called datagrams).
 * > These segments are then sent across the network to the destination.
 *
 * > However, UDP works differently from TCP:
 *   - It does NOT establish a connection before sending data.
 *   - It does NOT guarantee that packets will reach the destination.
 *   - It does NOT ensure packets arrive in order.
 *   - It does NOT retransmit lost packets.
 *
 * > Because UDP avoids these extra reliability mechanisms, it is much
 *   faster and has lower overhead compared to TCP.
 *
 *
 * Why UDP is Fast:
 * - No connection setup (no 3-way handshake)
 * - No acknowledgment system
 * - No retransmission of lost packets
 * - Very small header size (only 8 bytes)
 * > Because of this lightweight design, UDP is commonly used in
 *   applications where speed is more important than reliability.
 *
 *
 * Common Use Cases of UDP
 * - Video calls (WebRTC, Zoom, Google Meet)
 * - Online multiplayer games
 * - DNS queries
 * - Live streaming
 * - VoIP (Voice over IP)
 * In these applications, a small amount of lost data is acceptable,
 * but low latency is critical.
 *
 *
 * UDP Header Structure:
 *
 *    0               7 8              15 16             23 24             31
 *   +-----------------+-----------------+-----------------+-----------------+
 *   |      Source Port (16 bits)        | Destination Port (16 bits)        |
 *   +-----------------+-----------------+-----------------+-----------------+
 *   |        Length (16 bits)           |      Checksum (16 bits)           |
 *   +-----------------+-----------------+-----------------+-----------------+
 *   |                                                                       |
 *   |                        Data (variable length)                         |
 *   |                                                                       |
 *   +-----------------------------------------------------------------------+
 *
 *                      Fig: User Datagram Header Format
 *
 *
 * Explanation of UDP Header Fields:
 *
 * a. Source Port (16 bits)
 *    - The port number of the application sending the data.
 *    - Helps the receiver know which application sent the packet.
 *
 * b. Destination Port (16 bits)
 *    - The port number of the application that should receive the data.
 *    - Example:
 *        DNS → Port 53
 *
 * c. Length (16 bits)
 *    - Indicates the total size of the UDP packet.
 *    - This includes both the UDP header and the data.
 *
 * d. Checksum (16 bits)
 *    - Used for basic error detection.
 *    - Helps detect whether the packet was corrupted during transmission.
 *    - If the checksum fails, the packet is discarded.
 *
 * e. Data (Payload)
 *    - The actual data sent by the application.
 *    - Example:
 *        video frames
 *        game updates
 *        DNS queries
 *
 *
 * UDP Header Size:
 * +-------------------+---------------+---------------+
 * | Field             | Size (bits)   |  Size (bytes) |
 * +-------------------+---------------+---------------+
 * | Source Port       | 16 bits       |  2 bytes      |
 * | Destination Port  | 16 bits       |  2 bytes      |
 * | Length            | 16 bits       |  2 bytes      |
 * | Checksum          | 16 bits       |  2 bytes      |
 * +-------------------+---------------+---------------+
 * | Total Header Size | 64 bits       | 8 bytes       |
 * +-------------------+---------------+---------------+
 *
 * Summary
 * > TCP vs UDP
 * > TCP
 *   - Reliable
 *   - Ordered delivery
 *   - Retransmissions
 *   - Slower
 * > UDP
 *   - Fast
 *   - No guarantee of delivery
 *   - No retransmissions
 *   - Very small header
 * > UDP sacrifices reliability for speed, which makes it ideal for
 *   real-time applications.
 */