/**
 * Client-Server Architecture:
 * > To send data over the internet we require an architecture where data
 *   is owned by one end and data is requested by another end. 
 * 
 * > Client-Server Architecture involves two main parts:
 *   a. the client
 *   b. the server
 * 
 * > The client is responsible for showing data to the user, like how a 
 *   web browser displays a webpage. It sends requests to the server to
 *   get the data it needs.
 * 
 * > The server, on the other hand, holds the manages the data, and sends it
 *   back to the client when asked. 
 * > The server acts as the central authority, making sure the data is stored
 *   and delivered correctly to the client.
 * 
 * > In simple terms, the client asks for data, and the server provides it.
 * 
 *              Request for a webpage
 *   +--------+ ---------------------> +--------+
 *   | Client |                        | Server |
 *   +--------+ <--------------------- +--------+
 *               Response with webpage
 * 
 * > The data b/w client and server is exchanged using the request-response
 *   model. 
 * > Client sends the request to server and after analyzing the request server
 *   sends back the response to client.
 * 
 * > Unlike Client-Server, there is Peer-to-Peer mechanism also in which
 *   there are no clients and there are no servers, there are only peers,
 *   or we can say that every peer can act as both client and server.
*/



/**
 * Peer-Peer Architecture:
 * > Some common examples of Peer-Peer is Blockchain, Torrent, and earlier
 *   Skype used to be Peer-Peer.
 * > To understand Peer-Peer architecture, let's take the example of
 *   Bit Torrent.
 * 
 * How Bit-Torrent Works?
 * > Suppose you have to download the latest movie from Bit-Torrent. 
 *   First you will visit a website which have a torrent file. This torrent
 *   file is not the actual movie but a few KBs file which have information
 *   of Torrent's Tracker Server.
 * 
 * 1. Tracker Servers:
 *    - Tracker Servers are actual servers but they do not contain the movie
 *      but they have list of peers (addresses) which have the movie 
 *      downloaded in their computers.
 *    - Example: Website (Publisher of the torrent file)
 *      a. Look for the torrent file
 *      b. Download a torrent file
 *      c. The client reads the .torrent file, and gets the .torrent file,
 *         and gets the IP address of the Tracker.
 *      d. Gets connected to teh tracker and announce it's desire to
 *         download the shared file. 
 *      e. Return a list of seeds and leeches that share the file
 *         (50 addresses usually)
 *      f. Starts exchanging data with the list obtained from the tracker.
 *      (All leaches and seeds keep the tracker server updated on the parts
 *       they share.)
 * 
 *    - Tracker Servers are actual servers but they do not contain the
 *      movie but they have a list of peers (addresses) which have the 
 *      movie downloaded in their computers.
 *    - After getting the list of peer addresses, out computer will try
 *      to connect to different available peers which are near to our network
 *      to download different parts of the movie from different available
 *      peers.
 *    - A single movie can be divided into multiple parts and these multiple
 *      parts based on the availability and distance can be downloaded from
 *      different peers.
 * 
 *    - A peer who contributes to the Torrent System, that is allow to upload
 *      movie for ohter peer is called Seeder.
 *    - A peer who only downloads from the network and do not contribute to
 *      the network is called Leacher.
 *    - Usually when we connect to Bit-Torrent, we are both Seeder and Leacher.
 *      Which means we download movie from other peers as well as we uploads
 *      for other peers making us both Leacher & Seeder.
 *    - That's why when you use Bit-Torrent you can see there is a download
 *      speed as well as upload speed when you are only downloading something.
*/
