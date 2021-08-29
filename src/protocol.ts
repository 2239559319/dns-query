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
   */
  qdCount: Uint8Array
  /**
   * 2 byte
   */
  anCount: Uint8Array;
  /**
   * 2 byte
   */
  nsCount: Uint8Array;
  /**
   * 2 byte
   */
  arCount: Uint8Array;
}
