/**
 * What is Internet?
 * > The internet is a global network of interconnected computers and devices
 *   that communicates using standardized protocols like TCP/IP to share
 *   information and resources.
 * > Sometimes we also say that Internet is a network of networks that allows
 *   machines to exchange data over long distances.
 * 
 * Note: In general, Network is a group of interconnected items. 
 *       For example, Multiple people connected on social media also is
 *       a network.
*/

/**
 * The Beginning:
 * 
 * The Cold War with Sputnik:
 * > Sputnik (1957): The Soviet Union launched this tiny satellite, and the
 *   US was like, "Wait, they're beating us in space?" So there was a big
 *   push to invest in science and tech to catch up.
 * > The US forms ARPA (Advanced Research Projects Agency) (1958) to fund
 *   crazy-cool research so they wouldn't fall behind technologically.
 * > Basically, Sputnik put some fire under the US to get going an advanced
 *   ideas. One of these ideas? A communication network that wouldn't 
 *   collapse if part of it got destroyed, like, say, in a nuclear attack.
 *   Not a pleasant thought, but that's the historical context.
 * 
 * 
 * Current technology was not enough:
 * 1. Research collaboration and resource sharing:
 *    - Most instutions had a single large mainframe computer.
 *    - Mainframe computers were large and expensive.
 *    - Users would either queue up to use it directly or submit jobs via
 *      punch cards.
 *    - Communication b/w different computers was often done physically -
 *      people carrying tapes or punch cards from one place to another
 *      (sometimes jokingly called "sneakernet").
 * 2. Decentralized, resilient communications:
 *    - Communication system was centralized.
 *    - They wanted a communications system that could survive or stay
 *      functional even if parts were destroyed in a potential nuclear attack.
 * 
 * 
 * Early Brainstormers: Licklider, Baran and Davies
 * > J.C.R Licklider at ARPA daydreamed about a global network where people
 *   could "log in" to different computers. He called it some sci-fi-ish
 *   name, like an "Intergalactic Computer Network".
 * > Paul Baran (in the US) and Donald Davies (in the UK) were both thinking
 *   about something called packet switching.
 * > Note:
 *   - Packet Switching is the idea of splitting data into little packets
 *     so they can travel through a network along different routes. If one
 *     route's backend, the packets just like a detour - awesome for
 *     resilience!
 *   - Basically, they are saying: "What if we chop data into pieces instead
 *     of sending it as one continuous stream?" This approach turned out to
 *     be a big deal.
 * 
 * 
 * The First Big Experiment: ARPANET
 * > In 1969, ARPA funded a project connecting four universitiesL: UCLA,
 *   Stanford Research Institute (SRI), UC Santa Barbara, and the University
 *   of Utah. They called the network ARPANET.
 * > They tested the idea of packet switching here.
 * > Fun Fact: This first message was sent on October 29, 1960, from UCLA
 *   and SRI. They tried to type "login" but the system crashed after sending
 *   "lo" So the very first message was basically "lo" - like saying "Hello"
 *   to the future.
 * 
 * 
 * Packet Switching was decentralized
 * > The whole reason they wanted a decentralized system was so if one
 *   computer or node got destroyed (think: wartime scenario), the rest of
 *   the network would keep chugging along.
 * > With packet switching, if one path is down, the packets just find another
 *   route. It's like Google Maps rerouting you if there's a traffic jam.
 * 
 * 
 * NCP (Network Control Protocol)
 * > It was the host-to-host protocol on the ARPANET, meaning it handled
 *   communication b/w computers (hosts) connected to the network.
 * > NCP provided a bidirectional, flow-controlled data stream b/w two hosts.
 * 
 * 
 * Limitations of NCP:
 * > NCP worked only on ARPANET. If another packet-switched network existed,
 *   it wasn't straightforward to route traffic b/w them.
 * > NCP was good enough for the early ARPANET but wasn't built to handle
 *   multiple interconnected networks globally.
 * > Remember: NCP was used throughout the early 1970s until January 1, 1983,
 *   when ARPANET officially transitioned to TCP/IP (the famous "Flag Day").
 * 
 * 
 * The Magic Protocols: TCP/IP 
 * > As different networks popped up, people asked: 
 *   "How do we get them all to talk to each other?"
 * > Vint Cerf and Bob Kahn developed TCP (Transmission Control Protocol)
 *   in the early '70s.
 * > Later, TCP was split into TCP + IP (Internet Protocol).
 * > Think of it like this:
 *   1. IP = gives an "address" to every device and decides where packets
 *      should go.
 *   2. TCP = makes sure the data gets there correctly and in the right order.
 * 
 * 
 * Flag Day - Birthday of modern Internet (1983)
 * > On January 1, 1983, ARPANET officially switched from its old protocol
 *   (NCP) to TCP/IP. This date if often considered the real "birthday" of
 *   the modern Internet, because now everything was using the same "language".
 * 
 * 
 * By the early '90s, the government pulled back on running the main Internet
 * "backbone," leaving room for commerical Internet providers (ISPs).
 * Suddenly, more and more people could go online.
 * 
 * 
 * The World Wide Web:
 * > Let's fast-forward to 1989-1990. Tim Berners-Lee at CERN (in Switzerland)
 *   wanted a simpler way for scientists to share documents. He came up with
 *   the World Wide Web.
 * > He invents HTML (HyperText Markup Language) and HTTP (HyperText Transfer
 *   Protocol). The idea: type a web address, and you get a "page" that can
 *   link to other pages with clickable text.
 * > Remember:
 *   - The Internet is the big system (the infrastructure and protocols).
 *   - The Web (www) is one major service running on top of it.
 *     (Email, FTP, chat, etc., are other services.)
 * 
 * 
 * Mosaic, Browsers, and the Dot-Com Boom:
 * > Mosaic (1993) was a graphical web browser that made the Web way more
 *   user-friendly. People could click links and see images - no more typing
 *   complicated commands.
 * > Soon, companies realized they could make money on the Internet - DotCom
 *   Boom in the mid-to-late '90s.
 * > By the end of the '90s, it was like everyone was jumping online, creating
 *   websites, and selling stuff.
 * > In a nutshell: It's cool to see how it went from a defense project to a
 *   tool for universities to an entire world's communication backbone. Not
 *   bad for something that started with "lo". 
*/


/**
 * How Internet Works?
 * > When we talk about the Internet, we're talking about a huge network
 *   connecting millions of computers and devices worldwide. Everytime you
 *   browse a website, send an email, or stream a video, your device is 
 *   communicating with each other computers over this global network.
 * 
 * > Think of the Internet like a giant postal system but for digital data.
 *   Every device (phone, computer, etc.) has a unique address (IP address),
 *   just like a house has a street address. When you send or requesy 
 *   information - say, asking for a web page - the data is broken into
 *   small "packets." Each packet is labeled with the destination's IP
 *   address (where it needs to go) and your device's IP address (where it
 *   came from).
 * 
 * > These packets then travel through various "post offices" on the network,
 *   which we call routers. Routers read the address on each packet and decide
 *   the best path to send it along. This is called packet switching, and
 *   it's resilient: if one route is congested or offline, packets can go 
 *   a different way.
 * 
 * > Meanwhile, a system called the Domain Name System (DNS) acts like a
 *   phone book, translating the easy-to-remember website names 
 *   (like "google.com") into the numerical IP addresses routers understand.
 *   Once the packets reach the right server (the final post office), that
 *   server sends back the information - again in packets - reassembled by
 *   the device into the webpage, video, or message you requested.
 * 
 * > Behind the scenes, it all runs on a set of universal rules (protocols)
 *   called TCP/IP. IP handles the addressing, and TCP ensures the data is
 *   put back together reliably and in the right order. This combination of
 *   standardized addresses, packet switching, and DNS is why the Internet
 *   can connect billions of devices worldwide, across fiber optical cables,
 *   satellites, and wireless networks, without collapsing under its own size.
*/


/**
 * OSI Model:
 * > The OSI (Open Systems Interconnection) Model is a conceptual framework
 *   used to understand and design how different computer systems communicate
 *   over a network. It organized network functions into seven distinct layers,
 *   each with specific responsibilites. By standardizing these layers, the
 *   OSI Model helps ensure interoperability b/w different hardware, software,
 *   and protocols.
 * 
 * Why was the OSI Model developed?
 * > Historical Context:
 *   - Before the OSI Model, different vendors used proprietary networking
 *     architectures (e.g., IBM's, SNA, DECnet, etc.)
 *   - This led to compabability issues because each system spoke its own
 *     "language". 
 * 
 * > Need for Standards:
 *   - The International Organization for Standardization (ISO) developed the
 *     OSI Model in the late 1970s and published it in 1984 as ISO 7498.
 *   - Goal: Create a universal set of rules and guidelines so all devices
 *     could communicate regardless of internal design.
 * 
 * > Remember:
 *   - The OSI Model isn't itself a protocol suite; it's a reference model.
 *   - Real-World Protocols map to one or more layers.
 * 
 * 
 * In practice, the TCP/IP Model is used more in real-world networking, but
 * the OSI Model remains important as a teaching/reference tool to understand
 * conceptual layering.
*/

/**
 * OSI Model Layers:
 * 
 * > Layer-7: Application
 *   - Provides services directly to end-user applications
 *   - HTTP, FTP, SMTP, DNS
 * 
 * > Layer-6: Presentation
 *   - Handles encryption, decryption, compression, translation
 *   - SSL/TLS, MIME
 * 
 * > Layer-5: Session
 *   - Manages sessions (start, maintain, end) b/w applications
 *   - NetBIOS, RPC, Some Implementations of APIs
 * 
 * > Layer-4: Transport
 *   - Provides end-to-end communication, reliability (or not), flow control
 *   - TCP (reliable), UDP (unreliable/faster)
 * 
 * > Layer-3: Network
 *   - Handles routing and logical addressing (IP Addresses)
 *   - IP, ICMP, IPsec, Routing, Protocols (OSPF, BGP)
 * 
 * > Layer-2: Data Link
 *   - Establishes reliable links b/w physically connected nodes
 *   - Ethernet (802.3), Wifi (802.11), PPP, VLANs
 * 
 * > Layer-1: Physical
 *   - Governs physical transmission of raw bits over media (cables, radio,
 *     waves)
 *   - Ethernet cabling (twisted pair, fiber), Wifi radio signals
*/

/**
 * Layer-by-Layer Explanation:
 * 1. Layer-7: Application
 *    > Closest to the end user. This layer interacts with software that
 *      implements a communicating component.
 *    > Provides network services to end-user applications.
 *    > Email (SMTP, IMAP), File Transfer (FTP), Web Browsing (HTTP/HTTPS).
 *    > This layer doesn't handle the data transport itself - it mainly deals
 *      with the content of the message and the user interface part.
 *    > HTTP, FTP, SMTP, Telnet, DNS (sometimes considered at Application,
 *      though sometimes mapped to other layers as well).
 * 
 *      +------+
 *      | Data |
 *      +------+
 * 
 * 2. Layer-6: Presentation
 *    > Responsible for formatting, encryption and compression of data.
 *    > Ensures the data from the application layer of one system is readable
 *      by the application layer of another system.
 *    > Character encoding (e.g., ASCII, EBCDIC, Unicode)
 *    > Encryption/Decryption (e.g., SSL/TLS can be conceptually placed here,
 *      although in practice it might straddle multiple layers).
 * 
 *      +-----------------------------+
 *      | Data (Optionally encrypted) |
 *      +-----------------------------+
 * 
 * 3. Layer-5: Session
 *    > Controls interhost communication sessions.
 *    > Established, manages, and terminates sessions b/w applications. 
 *      A "sessions" is like a longer-running conversation or exchange.
 *    > Session establishes and teardown.
 *    > Ensures both sides agress on when to start/stop sending data in 
 *      complex interactions.
 *    > Many modern protocols integrate session handling with layers above
 *      or below, so the pure "Session Layer" is less visible in real stacks.
 * 
 *      +-------------------------------+
 *      | Data (Might add session data) |
 *      +-------------------------------+
 * 
 * 4. Layer-4: Transport
 *    > Ensures end-to-end data transfer.
 *    > Segments, transfers, and reassembles data into a data stream.
 *    > Provides flow control, error checking, and (optionally) reliability.
 *    > Port addressing to differentiate multiple applications running on
 *      the same host.
 *    > TCP (Transmission Control Protocol) - connection-oriented, reliable
 *    > UDP (User Datagram Protocol) - connectionless, less overhead, faster
 *      but not guaranteed delivery.
 *    > Adds the Source and Destination IP addresses in its header if TCP
 *      selected
 * 
 *      +-------------------------------------------------+
 *      | Source Port: 3000 | Segment | Destination: 8080 |
 *      +-------------------------------------------------+
 * 
 * 5. Layer-3: Network
 *    > Handles routing of data across intermediate networks.
 *    > Addresses data packets with logical (IP) addressing.
 *    > Logical Addressing (IP Addresses).
 *    > Path determination and routing decisions.
 *    > Packet creation, fragmentation, and reassembly (if needed).
 *    > IP (Internet Protocol), ICMP (Internet Control Message Protocol),
 *      IPSec (for secure IP).
 *    > Adds the Source and Destination IP addresses in its header. 
 * 
 *      +----------------------------------------------------------------------+
 *      | Source IP | Source Port | Packet | Destination Port | Destination IP |
 *      |  9:9:9:9  |    3000     |        |       8080       |   10:10:10:10  |
 *      +----------------------------------------------------------------------+
 * 
 * 6. Layer-2: Data Link
 *    > Provides node-to-node data transfer. Ensures data frames are 
 *      transmitted b/w physically connected nodes without errors.
 *    > Responsible for MAC (Media Access Control) addressing and controlling
 *      how devices share a common medium.
 *    > Ethernet, Wifi (802.11), Point-to-Point Protocol (PPP), HDLC.
 *    > Adds the Source and Destination MAC Addresses in its frame header. 
 * 
 *      +--------------------------------------------------------------------------------------------------------------+
 *      | Source MAC        | Source IP | Source Port | Frame  | Destination Port | Destination IP |  Destination MAC  |
 *      | 00:1A:2B:3C:4D:5E | 9:9:9:9   |    3000     |        |       8080       |   10:10:10:10  | 00-2E-4B-2C-5D-2A |
 *      +--------------------------------------------------------------------------------------------------------------+
 * 
 * 7. Layer-1: Physical
 *    > Concerned with the physical transmission of raw bits over a 
 *      communication medium.
 *    > Defines electrical or optical signals, modulation, wiring standards,
 *      pin layouts, etc.
 *    > Physical connectors: RJ-45, coaxial cable ends, fiber connectors.
 *    > Ethernet physical signaling, USB (for data transfer), DSL, Bluetooth
 *      radio waves.
 *   
 *      +----------------------------------+
 *      | 10101010101010101010101010101001 |
 *      +----------------------------------+
*/

/**
 * Summary and key takeways:
 * > The OSI Model is a 7-layer reference that breaks down network communication
 *   from physical signals (Layer 1) to application interfaces (Layer 7).
 * > It was created to standardize and guide how networks should be designed,
 *   ensuring compatability across different systems.
 * > Though real-world networking typically references the TCP/IP Model, 
 *   the OSI Model remains vital for teaching, troubleshooting, and conceptual
 *   clarity.
 * > Each layer builds on the services of the layer below it and provides
 *   services to the layer above it, forming a modular stack.
*/



/**
 * TCP/IP Model:
 * > TCP/IP (Transmission Control Protocol/Internet Protocol) is the de facto
 *   standard suite of protocols that governs how data moves across the 
 *   Internet.
 * > It was developed by DARPA (US Defense Advanced Research Projects Agency)
 *   in the 1970s and officially adopted by the ARPANET on January 1, 1983
 *   (Flag Day).
 * > There are typically four layer.
 * 
 *   +----------------------------------------------------+
 *   | Layer-7: Application                               |
 *   | Layer-6: Presentation  =====> Layer 4 Application  |
 *   | Layer-5: Session                                   |
 *   +----------------------------------------------------+
 * 
 *   +----------------------------------------------------+
 *   | Layer-4: Transport     ======> Layer 3 Transport   |
 *   +----------------------------------------------------+
 * 
 *   +----------------------------------------------------+
 *   | Layer-3: Network       ======> Layer 2 Network     |
 *   +----------------------------------------------------+
 * 
 *   +----------------------------------------------------+
 *   | Layer-2: Data Link      ======> Layer 1 Network    |
 *   | Layer-1: Physical                       Access     |
 *   +----------------------------------------------------+
*/