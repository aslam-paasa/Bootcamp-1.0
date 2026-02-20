/**
 * UDP Protocol (User datagram Protocol):
 * > UDP is one of the other protocols that is used in the Transport Layer.
 * > It also breaks the data that is received from application to segments
 *   so that they be sends from different routes to destination.
 * 
 * > Like TCP, it also breaks the data in to chunks which are known as
 *   segments. To rearrange these segments or destination, side a checksum
 *   is maintained similar to TCP.
 * 
 * > Source Port and Destination Port is assigned to each segment here.
 *   Unlike TCP, UDP does not ensures guarantee of complete data transfer
 *   which means it does not have acknowledgement number.
 * > SInce there is no retrying mechanism for lost packets so UDP is fast
 *   as compared to TCP.
 * > It is used in Video Calling (WebRTC), Online Games, DNS, etc.
*/