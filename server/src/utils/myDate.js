
class myDate{
  constructor(){
  }

  /**
   * 현재 Datetime 반환
   * @returns {String} Datetime
   */
  getDatetime(){
    this.today = new Date();

    this.year = this.today.getFullYear();
    this.month = ("0" + (this.today.getMonth() + 1)).slice(-2);
    this.day = ("0" + this.today.getDate()).slice(-2);
    this.dateString = this.year + "-" + this.month + "-" + this.day;

    this.hours = ("0" + this.today.getHours()).slice(-2);
    this.minutes = ("0" + this.today.getMinutes()).slice(-2);
    this.seconds = ("0" + this.today.getSeconds()).slice(-2);
    this.timeString = this.hours + ":" + this.minutes + ":" + this.seconds;
    return this.dateString + " " + this.timeString;
  }


}


module.exports = myDate;