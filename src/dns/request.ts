export type Binary = 0 | 1;
export type FourBit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15;
export type ThreeBit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface Flag {
  /**
   * 0 query 1 response
   */
  qr: {
    raw: 0;
    text: 'query';
  } | {
    raw: 1;
    text: 'response';
  };
  /**
   * 0 a standard query (QUERY)
   * 1 an inverse query (IQUERY)
   * 2 a server status request (STATUS)
   */
  opcode: FourBit;
  /**
   * Authoritative Answer - this bit is valid in responses,
   */
  aa: Binary;
  /**
   * specifies that this message was truncated due to length greater than that permitted on the transmission channel.
   */
  tc: Binary;
  /**
   * Recursion Desired - this bit may be set in a query and
   * is copied into the response.  If RD is set, it directs
   * the name server to pursue the query recursively.
   * Recursive query support is optional.
   */
  rd: Binary;
  /**
   * Recursion Available - this be is set or cleared in a
   * response, and denotes whether recursive query support is
   * available in the name server.
   */
  ra: Binary;
  /**
   * Reserved for future use.  Must be zero in all queries
   * and responses.
   */
  z: ThreeBit;
  /**
   * Response code
   * 0 No error condition
   * 1 Format error - The name server was unable to interpret the query.
   * 2 Server failure - The name server was unable to process this query due to a problem with the name server.
   * 3 Name Error - Meaningful only for responses from an authoritative nameserver, this code signifies that the
   *   domain name referenced in the query does not exist.
   * 4 Not Implemented - The name server does not support the requested kind of query.
   * 5 Refused - The name server refuses to
   *   perform the specified operation for
   *   policy reasons.  For example, a name
   *   server may not wish to provide the
   *   information to the particular requester,
   *   or a name server may not wish to perform
   *   a particular operation (e.g., zone
   */
  rcode: FourBit;
}
export interface Header {
  /**
   * 2 byte
   */
  id: Uint8Array;
  /**
   * 2 byte
   */
  flags: Uint8Array;
  /**
   * 2 byte
   *  an unsigned 16 bit integer specifying the number of
   *  entries in the question section.
   */
  qdCount: Uint8Array
  /**
   * 2 byte
   * an unsigned 16 bit integer specifying the number of
   * resource records in the answer section.
   */
  anCount: Uint8Array;
  /**
   * 2 byte
   *   an unsigned 16 bit integer specifying the number of name
   *   server resource records in the authority records
   *   section.
   */
  nsCount: Uint8Array;
  /**
   * 2 byte
   *   an unsigned 16 bit integer specifying the number of
   *   resource records in the additional records section.
   */
  arCount: Uint8Array;
}

export enum Qtype {
  A = 1,
  NS,
  MD,
  MF,
  CNAME,
  SOA,
  MB,
  MG,
  MR,
  NULL,
  WKS,
  PTR,
  HINFO,
  MINFO,
  MX,
  TXT
}

export enum QClass {
  IN = 1,
}

export interface Question {
  /**
   * Variable length byte
   */
  qName: Uint8Array;
  /**
   * 2 byte
   */
  qType: Uint8Array;
  /**
   * 2 byte
   */
  qClass: Uint8Array;
}

export interface Request {
  header: Header;
  question: Question;
}
