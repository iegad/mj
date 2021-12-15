
export class TableInfo {
  private constructor() { }

  private static instance_: TableInfo = null

  static instance(): TableInfo {
    if (this.instance_ === null)
      this.instance_ = new TableInfo()
    return this.instance_
  }

  TableNo: number = 8088
  BaseScore: number = 10
  MaxFan: number = 8
  MaxRound: number = 8
}