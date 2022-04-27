import { flagToObj, queryNameToString } from './utils';

export type Binary = 0 | 1;

export type FourBit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15;
export type ThreeBit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

/**
 * 0 - 255
 */
export type Byte = number;
/**
 * 2 byte
 * 0 - 2 ** 16 - 1
 */
export type Word = number;

export interface Flag {
  /**
   * 0 请求 1响应
   */
  QR: Binary;
  /**
   * 0 标准查询
   * 1 反向查询
   * 2 服务器状态请求
   */
  Opcode: FourBit;
  /**
   * 授权应答，响应报文有效
   * 1 表示名称服务器是权威服务器
   * 0 不是权威服务器
   */
  AA: Binary;
  /**
   * 截断标志
   * 1 响应超过512字节并已被截断，只返回前512字节
   */
  TC: Binary;
  /**
   * 期望递归
   */
  RD: Binary;
  /**
   * 可用递归，出现在响应报文中
   * 1 服务器支持递归查询
   */
  RA: Binary;
  /**
   * 保留字段，在请求和响应报文中必须为0
   */
  Z: ThreeBit;
  /**
   * 返回码字段，，表示响应的差错状态
   * 0 没有错误
   * 1 报文格式错误 Format error
   * 2 域名服务器失败 Server failure
   * 3 名字错误 Name error
   * 4 查询类型不支持 Not implemented
   * 5 拒绝 Refused
   */
  rcode: FourBit;
}

export class BaseStruct {
  /**
   * 事务id
   */
  id: Word;
  /**
   * 标志
   */
  _rawFlag: Word;
  flag: Flag;
  /**
   * 问题计数
   */
  Questions: Word;
  /**
   * 回答资源记录数
   */
  AnswerRRs: Word;
  /**
   * 权威名称服务器计数
   */
  AuthorityRRs: Word;
  /**
   * 附加资源记录数
   */
  AdditionalRRs: Word;

  /**
   * 请求名
   */
  _rawQueryName: Buffer;
  queryName: string;
  /**
   * 类型
   */
  queryType: Word;
  /**
   * 1 A
   * 2 NS
   * 3 MD
   * 4 MF
   * 5 CNAME
   * 6 SOA
   * 7 MB
   * 8 MG
   * 9 MR
   * 10 NULL
   * 11 WKS
   * 12 PTR
   * 13 HINFO
   * 14 MINFO
   * 15 MX
   * 16 TXT
   */
  queryClass: Word;

  _raw: Buffer;

  constructor(raw: Buffer) {
    this._raw = raw;
    // header部分
    this.id = raw.readUInt16BE(0);
    this._rawFlag = raw.readUInt16BE(2);
    this.flag = flagToObj(this._rawFlag);
    this.Questions = raw.readUInt16BE(4);
    this.AnswerRRs = raw.readUInt16BE(6);
    this.AuthorityRRs = raw.readUInt16BE(8);
    this.AdditionalRRs = raw.readUInt16BE(10);

    // body部分
    this._rawQueryName = raw.slice(12, raw.length - 4);
    this.queryName = queryNameToString(this._rawQueryName);
    this.queryType = raw.readUInt16BE(raw.length - 4);
    this.queryClass = raw.readUInt16BE(raw.length - 2);
  }
}
