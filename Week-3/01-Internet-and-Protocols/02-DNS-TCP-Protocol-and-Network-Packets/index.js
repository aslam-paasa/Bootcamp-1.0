/**
 * Agenda:
 * 1. DNS
 * 2. How data is sent on Network
 * 3. TCP Protocol
 * 4. UDP Protocol
 * 5. Practical/Live Coding
 * 6. QnA
*/

/**
 * DNS:
 * > DNS = Domain Name System = Phonebook of Internet.
 * > It translates Domain Names to IP Addresses and managed by ICANN
 *   (Internet Corporation for Assigned Names and Numbers) which is
 *   a non-profit organization.
 * > The reason why we need Domain names because remembering numbers 
 *   especially IP addresses are not easy for humans but remembering 
 *   names are comparatively easy.
*/

/**
 * How DNS works?
 * > When you visit www.codersgyan.com, the process of finding the
 *   website’s IP address is similar to asking a librarian where a book
 *   is located.
 * 
 * Step-1: Checking Local Cache
 * > Before making a request to an external server, your system first 
 *   checks its local storage:
 *   a. Browser Cache: If you've visited the website before, your browser
 *      may have already stored its IP address.
 *   b. OS-Level Cache (DNS Client): If the browser doesn’t have the 
 *      record, the operating system looks into its DNS cache to find 
 *      a match.
 * 
 * Step-2: DNS Resolver/Recursor
 * > If the local cache doesn’t have the record, the request is sent to
 *   a DNS Resolver—like a librarian who helps find the right section.
 * > By default, your Internet Service Provider (ISP) provides a 
 *   resolver. You can also use third-party resolvers like Google’s 
 *   (8.8.8.8) or Cloudflare’s (1.1.1.1) for potentially faster or more
 *   secure lookups.
 * 
 * Step-3: Root Nameservers
 * > The DNS Resolver doesn’t know the exact location but knows where to
 *   start looking. It asks the Root Nameserver, which acts like an index
 *   in a library. The Root Nameserver directs the resolver to the 
 *   correct Top-Level Domain (TLD) server based on the domain extension
 *   (e.g., .com).
 * 
 * Step-4: TLD Nameservers
 * > The .com TLD nameserver acts like a section in the library 
 *   dedicated to .com domains. It knows where to find codersgyan.com 
 *   and directs the resolver to the Authoritative Nameserver.
 * 
 * Step-5: Authoritative Nameserver
 * > The Authoritative Nameserver holds the final answer. It provides the
 *   exact IP address for codersgyan.com, much like a bookshelf contains 
 *   the book you were looking for.
 * > In this case, codersgyan.com is stored at 104.21.16.1.
 * > Now that the resolver has the IP address, it sends it back to your
 *   browser, which then loads the website.
*/

/**
 * Why not direct communication with ICANN?
 * > Our request doesn’t go directly to ICANN (the organization managing
 *   domain names). Instead, it interacts with DNS Resolvers, which handle
 *   communication with the Root, TLD, and Authoritative Nameservers. 
 *   This distributed system makes the process efficient and scalable.
*/

/**
 * Why do DNS updates takes time?
 * > DNS changes take time to propagate globally because Root, TLD, and
 *   Authoritative Nameservers around the world need to update their
 *   records. This delay is due to the Time-to-Live (TTL) settings, which
 *   determine how long DNS records are cached before refreshing.
*/


/**
 * DNS Caching:
 * > To speed up the process, DNS caching is used at multiple levels:
 *   a. Browser Cache: The browser stores previously visited domain 
 *      records to avoid repeated lookups.
 *   b. OS-Level Cache (DNS Client): The operating system keeps a 
 *      temporary DNS cache.
 *   c. DNS Resolver Cache: ISPs and major DNS providers (e.g., Google
 *      8.8.8.8, Cloudflare 1.1.1.1) maintain large caches to optimize 
 *      domain lookups and reduce DNS traffic.
 *      This caching system ensures that websites load faster and reduces the
 *      overall burden on DNS infrastructure.
 * 
 * > Role of Public DNS Providers (Cloudflare, Google DNS):
 *   - Public DNS providers act as high-performance recursive resolvers.
 *   - When a query reaches them, they first check their cache.
 *   - If the domain exists in cache and its TTL (Time To Live) has not
 *     expired, they immediately return the IP address.
 *   - If the record is not cached, they perform a recursive DNS lookup
 *     by querying the root server, then the TLD server, and finally the
 *     authoritative server.
 *   - Once the IP address is obtained, it is cached so future requests
 *     can be answered much faster.
 *
 * > These providers operate global DNS infrastructures using Anycast
 *   routing. Multiple servers around the world share the same IP address
 *   (e.g., 1.1.1.1 or 8.8.8.8), and the request is automatically routed
 *   to the nearest server, reducing latency and improving reliability.
 *
 * > Overall, this multi-level caching system:
 *   - Speeds up website loading
 *   - Reduces the number of DNS queries sent to root and authoritative servers
 *   - Improves scalability of the DNS system
 *
 * 
 *      +----------+     +--------------+            +-------------+                +------------+     +----------------------+
 *      | Computer |     | DNS Resolver |            | Root Server |                | TLD Server |     | Authoritative Server |
 *      +----------+     +--------------+            +-------------+                +------------+     +----------------------+
 *            |                    |                        |                             |                     |
 *            | Query "example.com"|                        |                             |                     |
 *            |------------------->|                        |                             |                     |
 *            |                    | Query "example.com"    |                             |                     |
 *            |                    |----------------------->|                             |                     |
 *            |                    |                        |                             |                     |
 *            |                    | Refer "com" TLD Server |                             |                     |
 *            |                    |<-----------------------|                             |                     |
 *            |                    |                        |                             |                     |
 *            |                    |---------Query "example.|com"(.com)------------------>|                     |
 *            |                    |                        |                             |                     |
 *            |                    |<--------Refer "example.|com" Authoritative Server----|                     |
 *            |                    |                        |                             |                     |
 *            |                    |                        |                             |                     |
 *            |                    |---------Query "example.|com" (example.com)-----------|-------------------->|
 *            |                    |                        |                             |                     |
 *            |                    |<--------IP Address for |"example.com"----------------|---------------------|
 *            |                    |                        |                             |                     |
 *            |                    |                        |                             |                     |
 *            |   IP Address for   |                        |                             |                     |
 *            |<-------------------|                        |                             |                     |
 *            |    "example.com"   |                        |                             |                     |
 *      +----------+     +--------------+            +-------------+                +------------+     +----------------------+
 *      | Computer |     | DNS Resolver |            | Root Server |                | TLD Server |     | Authoritative Server |
 *      +----------+     +--------------+            +-------------+                +------------+     +----------------------+
 * 
 *                                  Fig: DNS Resolution Sequence
 *      
*/



/**
 * Understand Network and How Data is Sent:
 *
 * 1. Basic Network Setup:
 * 
 *    Scenario:
 *    - Mere laptop me Ubuntu installed hai aur mai chahta hu ki mere laptop 
 *      ko Internet ka access mile.
 *    - Internet se connect hone ke liye hume ek device chahiye hota hai called
 *      Router. And Router ke paas already Internet connection hota hai 
 *      (ISP ke through).
 *    - Ab laptop ko router se connect karne ke 2 tarike hote hai:
 *      a. WiFi (wireless connection)
 *      b. Ethernet cable (wired connection)
 *    - Ek router se multiple devices connect ho sakte hai, jaise:
 *      Laptop, Printer, Mobile, Smart TV, etc.
 *    - Agar sab devices same router se connected hai, to ye devices aapas me
 *      communicate bhi kar sakte hai.
 *    - Example: Laptop printer ko print command bhej sakta hai.
 *
 *
 * 2. Router's Main Functions:
 *    Router do important kaam karta hai:
 *    a. Internet access provide karna
 *       - Router Internet aur home network ke beech bridge ki tarah kaam 
 *         karta hai.
 *    b. Devices ko aapas me communicate karwana
 *       - Same network ke devices ek dusre ko data bhej sakte hai.
 *
 * 3. Types of IP Addresses on Router
 *    Router k paas 2 types ke IP Address hote hai:
 *    a. Public IP Address
 *       - Ye Internet ke liye use hota hai.
 *       - Internet pe jo bhi request aur response hota hai, wo iss Public IP ke
 *         through hota hai.
 *       - Ye ISP provide karta hai.
 *    b. Private IP Address
 *       - Ye Home Network ke andar use hota hai.
 *       - Example:
 *         Router IP: 192.168.1.1
 *         Laptop IP: 192.168.1.10
 *         Printer IP: 192.168.1.20
 *       - Har device ko router ek unique private IP assign karta hai.
 *
 *
 * Example: Laptop se Printer pe print command bhejna
 * - Jab laptop print command bhejta hai, to ye network ke through printer 
 *   tak jata hai.
 *   > Actual flow hota hai: Laptop → Switch → Printer
 *   > Agar printer same network me hai, to router ki zarurat nahi padti.
 *   > Agar destination outside network hai (Internet), tab switch request 
 *    router ko bhejta hai.
 *
 *
 * 4. What is a Switch?
 *    - Switch ek networking device hai jo multiple devices ko connect karta hai.
 *    - Switch ka kaam hota hai data ko correct device tak forward karna.
 *    - Switch MAC Address use karta hai device identify karne ke liye.
 *    - Modern routers ke andar switch already built-in hota hai, isliye hume 
 *      separate switch ghar me nahi dikhta.
 *
 *
 * 5. MAC Address:
 *    - Har device ke paas ek unique MAC Address hota hai.
 *    - Ye network card (NIC) ke andar hardcoded hota hai.
 *    - Example: 00:1A:2B:3C:4D:5E
 *
 * 6. Why we need MAC Address when we have IP Address?
 *    - OSI Model me different layers different address use karti hai.
 *    - Network Layer (Layer 3)
 *      → IP Address use karti hai
 *      → Device ko logically identify karta hai
 *    - Data Link Layer (Layer 2)
 *      → MAC Address use karti hai
 *      → Physical device tak data pahuchata hai
 *
 *
 * Important summary:
 * - To identify device in network         : IP Address use hota hai
 * - To send data to actual physical device: MAC Address use hota hai
 */


/**
 * How Laptop finds Printer MAC Address using IP Address:
 *
 * Let's say we want to send one data packet from laptop to printer.
 * 
 * The Problem:
 * > To send data from laptop to printer, we need the physical address 
 *   (MAC Address), because actual data transfer inside the local network 
 *   happens using MAC Address, not directly using IP Address.
 * > Laptop ke paas initially printer ka MAC Address nahi hota hai.
 *   Laptop ko sirf printer ka IP Address pata hota hai 
 *   (example: 192.168.1.74).
 * > Isliye laptop ek request broadcast karta hai network ke andar.
 *
 *
 * What is Broadcast?
 * > Har network me ek broadcast mechanism hota hai jisme ek device network
 *   ke sabhi devices ko ek message bhejta hai.
 * > Laptop ek broadcast message bhejta hai:
 *   "Who has IP 192.168.1.74?"
 *   "Tell me your MAC Address"
 * > This process is called ARP (Address Resolution Protocol).
 *
 * Role of ARP:
 * > IP Address ko MAC Address me convert (resolve) karna.
 *
 *
 * Message flow:
 * Step 1:
 * - Laptop → Broadcast message to all devices in network:
 *   "Who has IP 192.168.1.74?"
 *
 * Step 2:
 * - Ye message network ke sabhi devices receive karte hai.
 * - Jinke paas ye IP Address nahi hota → wo ignore kar dete hai
 * - Jiske paas ye IP Address hota hai (Printer) → wo reply karta hai
 *
 * Step 3:
 * - Printer reply karta hai:
 *   "Yes, this is my IP Address"
 *   "This is my MAC Address: AA:BB:CC:DD:EE:FF"
 *
 * Step 4:
 * - Laptop printer ka MAC Address receive kar leta hai.
 * 
 *
 * ARP Cache:
 * > Laptop is MAC Address ko apne local memory me store kar leta hai.
 * > Is storage ko ARP Cache bolte hai.
 * > ARP Cache me mapping store hoti hai:
 *   IP Address → MAC Address
 * > Example:
 *   192.168.1.74 → AA:BB:CC:DD:EE:FF
 *
 *
 * Benefit of ARP Cache:
 * > Next time jab laptop ko printer ko data bhejna hoga, to laptop direct
 *   ARP Cache me check karega, aur broadcast nahi karega.
 * > Isse network fast aur efficient ban jata hai.
 *
 *
 * Final Summary:
 * > IP Address use hota hai device identify karne ke liye.
 * > MAC Address use hota hai actual data send karne ke liye.
 * > ARP use hota hai IP Address se MAC Address find karne ke liye.
 * > ARP Cache use hota hai IP-MAC mapping store karne ke liye.
 */

/**
 * How Switch knows where to Send Data?
 * > Switch ko kaise pata chalta hai ki request andar bhejna hai ya bahar?
 * > Actually, ye decision Switch nahi leta, ye decision Laptop (host device)
 *   leta hai using Subnet Mask and Default Gateway.
 *
 * What is Subnet Mask?
 * > Laptop ke network configuration me ek option hota hai called Subnet Mask.
 * > Subnet Mask hume batata hai:
 *   - Network ka kaunsa part Network ID hai
 *   - Aur kaunsa part Host ID hai
 *   - Aur kaunsi IP range same network ke andar aati hai
 * > Example:
 *   Laptop IP Address: 192.168.1.10
 *   Subnet Mask:       255.255.255.0
 * > Iska matlab:
 *   Network range: 192.168.1.0 to 192.168.1.255
 * > Is range ke andar jitni bhi IPs hai, wo same local network me hai.
 *
 *
 * How Laptop decides where to send data?
 * > Jab laptop ko kisi destination IP pe data bhejna hota hai,
 *   to laptop Subnet Mask ka use karke check karta hai:
 *
 *   Case 1: Destination IP same network me hai
 *   Laptop IP:      192.168.1.10
 *   Destination IP: 192.168.1.20  (Printer)
 *
 *   > Ye same subnet me hai.
 *   > Laptop direct ARP karega aur data directly send karega.
 *   > Flow:
 *     Laptop → Switch → Printer
 *
 *
 *   Case 2: Destination IP different network me hai (Internet)
 *   Laptop IP:      192.168.1.10
 *   Destination IP: 8.8.8.8
 *
 *   > Ye same subnet me nahi hai.
 *   > Laptop direct us device ko send nahi karega.
 *   > Laptop data Default Gateway (Router) ko bhejega.
 *
 *   Flow:
 *   Laptop → Switch → Router → Internet
 *
 *
 * Actual Role of Switch:
 * > Switch khud decision nahi leta ki data Internet jana hai ya local device
 *   ko.
 * > Switch ka kaam simple hota hai:
 *   - MAC Address check karna
 *   - Aur data ko correct device ya Router tak forward karna
 *
 *
 * Final Summary:
 * > Subnet Mask decide karta hai ki destination same network me hai ya nahi.
 * > Agar same network me hai:
 *   Laptop → Switch → Destination device
 * > Agar same network me nahi hai:
 *   Laptop → Switch → Router (Default Gateway) → Internet
 * > Switch sirf MAC Address ke basis pe data forward karta hai,
 *   decision Laptop leta hai using Subnet Mask.
 */

/**
 * How to send data over the Internet?
 * 
 * Basic Flow:
 * > Jab laptop ko Internet pe kisi server ko data bhejna hota hai, to laptop
 *   directly Internet ko data nahi bhej sakta.
 * > Laptop pehle data apne Router ko bhejta hai, kyuki Router hi Internet 
 *   ka Default Gateway hota hai.
 * 
 * Default Gateway ka matlab:
 * - Ye wo device hota hai jo local network ko Internet se connect karta hai.
 * - Har device ko pata hota hai uska Default Gateway ka IP Address kya hai.
 * - Example:
 *   Laptop IP: 192.168.1.10
 *   Router (Gateway) IP: 192.168.1.1
 *
 *
 * Step 1: Laptop finds Router MAC Address using ARP
 * > Laptop ko Router ka IP Address pata hota hai, but MAC Address nahi pata
 *   hota.
 * > Isliye laptop ek ARP request broadcast karta hai:
 *   "Who has IP 192.168.1.1?"
 *   "Tell me your MAC Address"
 * > Ye request network ke sabhi devices tak jaati hai via Switch.
 * > Baaki sab devices ignore kar dete hai, but Router apna MAC Address reply
 *   karta hai.
 * > Laptop Router ka MAC Address receive karke ARP Cache me store kar leta 
 *   hai.
 *
 * Step 2: Laptop sends data to Router
 * > Ab laptop Router ke MAC Address ka use karke data Router ko bhej deta hai.
 * > Important:
 *   Source IP: Laptop Private IP (192.168.1.10)
 *   Destination IP: Internet Server IP (example: 142.250.183.14)
 *
 * Step 3: Router performs NAT (Network Address Translation)
 * > Problem: Laptop ka IP Address private IP hai, aur private IP Internet 
 *   pe valid nahi hota.
 * > Solution: Router NAT perform karta hai.
 *
 * > NAT Table ka kaam:
 *   - Private IP ko Public IP me convert karna.
 *   - Example:
 *     Before NAT: Source IP: 192.168.1.10   (Private IP)
 *     After NAT : Source IP: 49.36.152.210  (Public IP of Router)
 *
 * Step 4: Router stores mapping in NAT Table
 * > Router ek mapping store karta hai:
 *   Private IP      ↔      Public IP
 *   192.168.1.10    ↔      49.36.152.210
 * > Isse NAT Table bolte hai.
 *
 * Step 5: Router sends data to Internet Server
 * > Router ab Internet pe server ko request bhejta hai using Public IP.
 *
 * Step 6: Server sends response back to Router
 * > Server response Router ke Public IP pe bhejta hai.
 *
 * Step 7: Router checks NAT Table and forwards to Laptop
 * > Router NAT Table check karta hai aur dekhta hai ki ye response kis
 *   Private IP ke liye hai.
 * > Router response ko correct device (Laptop) ke Private IP pe forward kar
 *   deta hai.
 *
 *
 * Final Flow Summary:
 * > Laptop → Switch → Router → NAT → Internet → Server
 * > Server → Router → NAT Table check → Switch → Laptop
 */



/**
 * Transport Data using TCP Protocol: Layer-4 
*/

/**
 * What is TCP?
 * > TCP (Transmission Control Protocol) is one of the main protocols of
 *   the TCP/IP suite. It lies between the Application and Network Layers
 *   which are used in providing reliable delivery services.
 *   a. Connection-Oritented Protocl:
 *      - Establishes a connection before data transfer.
 *   b. Data Segmentation:
 *      - Breaks down data into small bundles (segments)
 *   c. Reassembly:
 *      - Reassembles bundles into original message at destination
 *   d. Multi-Path Routing:
 *      - Segments may travel along multiple routes if one route
 *        is jammed but the destination remains the same.
 * 
 *      [Application Data] 
 *              |
 *              V
 *      [Disassemble into Segments]
 *              |
 *              V 
 *      [Send over Network] 
 *              |
 *              V
 *      [Reassemble at Destination]
*/

/**
 * Why do we use TCP?
 * a. Reliability:
 *    - TCP’s acknowledgment and retransmission mechanism ensures that 
 *      if a segment is lost or corrupted, it will be resent. 
 *    - This is critical for applications where data integrity is a 
 *      priority (e.g., file transfers, emails).
 * b. Ordered Data Delivery:
 *    - TCP guarantees that the data will be received in the same 
 *      sequence in which it was sent, preventing misordered data issues
 *      common in lower-level protocols.
 * c. Congestion Control and Flow Control:
 *    - By adjusting the rate of data transmission based on network 
 *      conditions and receiver capacity, TCP optimizes throughput and 
 *      avoids overwhelming the network or the receiving host.
 * d. Universality:
 *    - TCP is a fundamental protocol used by many well-known applications
 *      and services (HTTP, SMTP, FTP, etc.). 
 *    - Adopting TCP means benefiting from widespread support and a 
 *      mature, stable protocol.
 * e. Error Detection and Correction:
 *    - Every segment has a checksum that the receiver can use to detect
 *      transmission errors, prompting a retransmission if necessary.
*/

/**
 * TCP Header Structure
 *
 * > Every TCP packet (segment) contains a TCP header before the actual
 *   data. This header contains important information that helps TCP
 *   deliver data correctly and reliably.
 *
 * > The TCP header size can range from 20 bytes (minimum) to 60 bytes
 *   (maximum) depending on whether optional fields are present.
 *
 * > The header helps TCP:
 *   - identify sender and receiver
 *   - track packet order
 *   - acknowledge received data
 *   - detect transmission errors
 *   - manage network congestion
 *
 *
 * Standard TCP Header Layout
 *
 *     0                   1                   2                   3
 *     0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
 *    +-------------------------------+-------------------------------+
 *    |          Source Port          |       Destination Port        |
 *    +-------------------------------+-------------------------------+
 *    |                        Sequence Number                        |
 *    +---------------------------------------------------------------+
 *    |                    Acknowledgment Number                      |
 *    +----+---------+---------------+--------------------------------+
 *    |Data |        | C E U A P R S F|                               |
 *    |Offs | Resvd  | W C R G C S Y I|            Window             |
 *    |et   |        | R E G K H T N N|                               |
 *    +-------------------------------+-------------------------------+
 *    |           Checksum            |         Urgent Pointer        |
 *    +-------------------------------+-------------------------------+
 *    |                           Options                             |
 *    +---------------------------------------------------------------+
 *    |                              Data                             |
 *    +---------------------------------------------------------------+
 *
 * Note: Each tick mark represents 1 bit.
 *
 *
 * Explanation of TCP Header Fields
 * a. Source Port
 *    - The port number of the application that is sending the data.
 *    - Example: When your browser sends a request, the OS assigns
 *      a temporary port number like 49152.
 *
 * b. Destination Port
 *    - The port number of the application that will receive the data.
 *    - Example:
 *        HTTP  → Port 80
 *        HTTPS → Port 443
 *        SMTP  → Port 25
 *
 * c. Sequence Number
 *    - Shows the position of the first byte of data in this packet.
 *    - Helps TCP keep packets in the correct order.
 *
 *    Example:
 *      If sequence number = 1001
 *      and payload size = 1460 bytes
 *      then the next sequence number will be 2461.
 *
 * d. Acknowledgment Number
 *    - Used to confirm that data was received successfully.
 *    - It tells the sender which byte the receiver expects next.
 *    - Example:
 *      ACK = 2461 → Receiver has received bytes up to 2460.
 *
 * e. Data Offset
 *    - Indicates the size of the TCP header.
 *    - Helps the receiver know where the actual data begins.
 *
 * f. Reserved
 *    - Reserved bits for future use.
 *    - Usually set to 0.
 *
 * g. Control Flags
 *    These small flags control TCP connection behavior.
 *    - SYN: Used to start a TCP connection.
 *    - ACK: Used to acknowledge received data.
 *    - FIN: Used to close a connection gracefully.
 *    - RST: Immediately terminates a connection.
 *    - PSH: Tells the receiver to pass data directly to the application.
 *    - URG: Indicates urgent data is present.
 *    (Other flags like CWR, ECE are used for congestion control.)
 *
 * h. Window Size
 *    - Tells how much data the receiver can accept at one time.
 *    - Helps control the flow of data so the receiver is not overloaded.
 *
 * i. Checksum
 *    - Used to detect errors in the packet.
 *    - If the checksum does not match, the packet is considered
 *      corrupted and will be retransmitted.
 *
 * j. Urgent Pointer
 *    - Points to urgent data inside the packet.
 *    - Only used when the URG flag is set.
 *    - Rarely used in modern applications.
 *
 * k. Options
 *    - Optional settings that extend TCP functionality.
 *    - Examples:
 *      - MSS (Maximum Segment Size)
 *      - Window Scaling
 *      - Selective Acknowledgment (SACK)
 *      - Timestamps
 *
 * l. Data (Payload)
 *    - The actual data being transmitted.
 *    - Example:
 *        HTTP request
 *        file data
 *        email message
 *
 *
 * Summary
 *
 * The TCP header allows TCP to:
 *   • identify sender and receiver
 *   • keep packets in order
 *   • confirm successful delivery
 *   • detect errors
 *   • control data flow
 *
 * Without the TCP header, reliable communication over the internet
 * would not be possible.
 */

/**
 * TCP Connection Establishment and Reliable Data Transfer
 *
 * TCP (Transmission Control Protocol) ensures reliable, ordered, and
 * error-checked delivery of data between two machines. Before any data
 * can be transmitted, TCP must first establish a connection between
 * the client and the server using a process called the Three-Way Handshake.
 *
 * 
 * 1. 3-way Handshake: To establish connection b/w two machines
 *    - The TCP Three-Way Handshake is the process used to establish a
 *      reliable connection between a client and a server before data 
 *      transfer begins. Which means it comes even before the application
 *      layer to establish the connection.
 * 
 *    Step-1: Client sends SYN
 *      [Sender -> Receiver] [Seq No] [Ack No] [Flag]
 *      [Client -> Server]   [1000]   [0]      [SYN]
 * 
 *    - The client wants to establish a TCP connection with the server.
 *    - It sends a SYN (Synchronize) packet to begin the connection.
 *    - This packet contains the client’s Initial Sequence Number (ISN),
 *      which is 1000 in this example.
 *    - The ISN is usually randomly generated for security reasons.
 *    - The acknowledgment number is 0 because no data has been received
 *      yet from the server.
 *
 *   Step-2: Server sends SYN-ACK
 *      [Sender -> Receiver] [Seq No] [Ack No] [Flag]
 *      [Server -> Client]   [5000]   [1001]   [SYN-ACK]
 * 
 *    - The server receives the SYN packet from the client.
 *    - It responds with a SYN-ACK packet (Synchronize + Acknowledge).
 *    - This packet serves two purposes:
 *        1. Acknowledge the client’s SYN request.
 *        2. Send the server’s own SYN to initiate its side of the connection.
 *    - The server selects its own Initial Sequence Number (ISN) = 5000.
 *    - The acknowledgment number is set to 1001, which is the client’s
 *      sequence number (1000) + 1, confirming receipt of the SYN packet.
 *    - This message indicates that the server is ready to establish
 *      the connection.
 *
 *   Step-3: Client sends ACK
 *      [Sender -> Receiver] [Seq No] [Ack No] [Flag]
 *      [Client -> Server]   [1001]   [5001]   [ACK] 
 * 
 *    - The client receives the SYN-ACK packet from the server.
 *    - It sends back an ACK (Acknowledgment) packet to confirm receipt.
 *    - The client’s sequence number becomes 1001 (previous sequence
 *      number + 1).
 *    - The acknowledgment number is set to 5001, which is the server’s
 *      sequence number (5000) + 1.
 *    - This confirms that the client successfully received the server’s SYN.
 *    - At this point, both the client and server have acknowledged each
 *      other, and the TCP connection is fully established.
 *
 * 3-Way Handshake Diagram:
 *     Client                                             Server
 *       |                                                   |
 *       |  1. SYN (Synchronize)                             |
 *       |  <-- Sequence Number: X                           |-->
 *       |                                                   |
 *       |  2. SYN-ACK (Synchronize-Acknowledge)             |
 *       |  <-- Sequence Number: Y, Ack Number: X+1          |-->
 *       |                                                   |
 *       |  3. ACK (Acknowledge)                             |
 *       |  <-- Ack Number: Y+1                              |-->
 *       |                                                   |
 *       |  Data Transfer Begins                             |
 *       |                                                   |
 * 
 * 2. How TCP Tracks Packets During Data Transfers
 *
 * > After a TCP connection is established, TCP uses several mechanisms
 *   to track packets and ensure reliable and ordered delivery of data.
 *
 *   1. Sequence Numbers
 *      - Every byte of transmitted data is assigned a sequence number.
 *      - The first data byte begins with ISN + 1 (Initial Sequence Number).
 *      - Each TCP segment carries the sequence number of its first byte.
 *      - This allows the receiver to place incoming segments in the
 *        correct order.
 *
 *   2. Acknowledgment Numbers
 *      - The receiver sends an ACK containing the next expected sequence
 *        number.
 *      - This confirms that all bytes up to (ACK number - 1) have been
 *        successfully received.
 *      - Example: ACK = 2461 means bytes up to 2460 were received.
 *
 *   3. Sliding Window
 *      - TCP allows multiple segments to be sent without waiting for
 *        individual acknowledgments.
 *      - The sliding window controls how many bytes can be transmitted
 *        before receiving ACKs.
 *      - This improves network efficiency and throughput.
 *
 *   4. Send Buffer
 *      - The sender temporarily stores copies of transmitted segments.
 *      - These segments remain in the send buffer until acknowledged.
 *      - If an ACK is not received within a certain time, the sender
 *        retransmits the segment from this buffer.
 *
 *   5. Receive Buffer
 *      - The receiver temporarily stores incoming segments.
 *      - If segments arrive out of order, they are held in the buffer
 *        until the missing segments arrive.
 *      - TCP then reassembles the data in the correct sequence.
 *
 *
 * Practical Data Transfer Example
 *
 * > Suppose we want to transfer an image of size 3 MB from a client
 *   machine to a server. Before sending data, TCP first establishes
 *   a connection using the Three-Way Handshake.
 *
 *
 * Step-1: TCP 3-Way Handshake
 *
 * Step   Sender → Receiver   Seq No   Ack No   Flags
 * 1      Client → Server     1000     0        SYN
 * 2      Server → Client     5000     1001     SYN-ACK
 * 3      Client → Server     1001     5001     ACK
 *
 * > Connection is now established. The client can begin sending data.
 *
 *
 * Step-2: Creating TCP Segments
 *
 * - Total file size = 3,145,728 bytes (≈ 3 MB)
 * - MSS (Maximum Segment Size) = 1460 bytes
 * - Total segments required ≈ 2155
 *   (3,145,728 ÷ 1460 ≈ 2155 segments)
 *
 *
 * Step-3: Sending First Segment
 *
 * Step   Sender → Receiver   Seq No   Ack No   Payload
 * 4      Client → Server     1001     5001     1460 B
 * 5      Server → Client     5001     2461     ACK
 *
 * > The server acknowledges the first 1460 bytes.
 * > ACK = 2461 means the next expected byte is 2461.
 *
 *
 * Step-4: Sending Second Segment
 *
 * Step   Sender → Receiver   Seq No   Ack No   Payload
 * 6      Client → Server     2461     5001     1460 B
 * 7      Server → Client     5001     3921     ACK
 *
 * > The server now acknowledges receipt up to byte 3921.
 *
 * > This process continues until all 3 MB of data has been successfully
 *   transmitted and acknowledged.
 *
 *
 * Packet Loss Handling
 *
 * > If any segment is lost during transmission:
 *   - The receiver will not send an ACK for the missing data.
 *   - The sender detects the missing acknowledgment and retransmits
 *     the lost segment.
 *
 *
 * TCP Retransmission Retries and Error Handling
 *
 * > When a packet is lost or its checksum fails during transmission,
 *   the receiver does not acknowledge the packet. TCP then retransmits
 *   the packet after a timeout period known as the Retransmission
 *   Timeout (RTO).
 *
 *
 * RTO Calculation
 *
 * - The initial RTO value is dynamically calculated based on network
 *   latency and round-trip time (RTT).
 *
 * Typical Initial Values:
 *   - Linux: ~200 ms to 3 seconds
 *   - Windows: ~300 ms to 3 seconds
 *   - RFC 6298 recommends 1 second as the default
 *
 *
 * Exponential Backoff Strategy
 *
 * > If retransmission fails, TCP increases the timeout duration
 *   exponentially after each retry.
 *
 * Example timeout sequence:
 *   1 s → 2 s → 4 s → 8 s → 16 s → ...
 *
 *
 * Default Retry Limits
 *
 * - Linux: ~15 retries (can take around 15–30 minutes)
 * - Windows: ~5 retries (~255 seconds)
 * - macOS: similar behavior to Linux (~15 retries)
 *
 *
 * Result
 *
 * TCP guarantees that data transfer is:
 *   • Reliable
 *   • Ordered
 *   • Error-checked
 *   • Automatically retransmitted if packets are lost
 */