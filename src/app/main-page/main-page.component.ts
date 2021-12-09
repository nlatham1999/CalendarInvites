import { Component, OnInit } from '@angular/core';
import { FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})

export class MainPageComponent implements OnInit {

  name="";
  clearName() {
    this.name="";
  }

  anniversaryOptions = ["Wedding", "Engagement", "First Date"];
  anniversaryIntervals = ["Weekly", "Monthly", "Yearly"];
  typeSelection = "Wedding";
  intervalSelection = "Weekly";
  eventsNumber = 0;
  anniversaryDate = "9999-12-31";
  dateSelection = "9999-12-31";
  inError = false;
  submitted = false;
  useTodaysDate = false;

  constructor(public fb: FormBuilder) { }

  ngOnInit(): void {
  }

  setDateToToday(): void {
    this.useTodaysDate = !this.useTodaysDate;

    if(!this.useTodaysDate){
      return;
    }
    let currentDate = new Date();
    this.dateSelection = currentDate.getFullYear() + "-" + currentDate.getMonth() + "-" + currentDate.getDate();
  }

  setDate(e : any){
    this.dateSelection = e.target.value;
  }

  addMonthToDate(date : string): string {
    var x = date.split("-");
    var month: number = +x[1] + 1;
    if(month === 13){
      month = 1;
    }
    var newDate: string = x[0] + "-" + month + "-" + x[2];
    return newDate;
  }

  addYearToDate(date: string): string {
    var x = date.split("-");
    var year: number = +x[2] + 1;
    var newDate: string = year + "-" + x[1] + "-" + x[2];
    return newDate;
  }

  createFile(): void {
    var content = "";
    content += "BEGIN:VCALENDAR\n";
    content += "VERSION:2.0\n";
    content += "PRODID:-//ZContent.net//Zap Calendar 1.0//EN\n";
    content += "CALSCALE:GREGORIAN\n";
    content += "METHOD:PUBLISH\n";

    content += this.createEvents();

    content += "END:VCALENDAR\n";

    this.download("event.ics", content);
  }

  createEvents(): string {
    var content: string = "";
    var count: number = 0;
    var anniversaryCount: number = 1;
    var date: string = this.anniversaryDate;
    var interval: string = "";

    if(this.intervalSelection === "Weekly"){
      interval = "Week";
    }else if(this.intervalSelection === "Monthly"){
      interval = "Month";
    }else if(this.intervalSelection === "Yearly"){
      interval = "Year";
    }else{
      return "";
    }

    console.log(interval);

    while(count < this.eventsNumber){
      //increment the date
      if(this.intervalSelection === "Weekly"){
        date = this.addYearToDate(date);
      }else if(this.intervalSelection === "Monthly"){
        date = this.addMonthToDate(date);
      }else if(this.intervalSelection === "Yearly"){
        date = this.addYearToDate(date);
      }

      console.log(date);

      //if the date is older than the start date, then add
      if(date >= this.dateSelection){
        console.log(date + " " + this.dateSelection);
        var summary: string = anniversaryCount + " " + interval + " Anniversary!";
        var dateSplit = date.split("-");
        var dtstart: string = dateSplit[0] + dateSplit[1] + dateSplit[2];
        var dtend: string = dtstart;
        
        content += this.createEvent(summary, dtstart, dtend);

        count++;
      }
      anniversaryCount++;
    }

    return content;
  }

  createEvent(summary: string, startDate: string, endDate: string): string {
    var content = "";
    content += "BEGIN:VEVENT\n";
    content += "SUMMARY:"+summary+"\n";
    content += "DTSTART:"+startDate+"\n";
    content += "DTEND:"+endDate+"\n";
    content += "CONTENT:"+summary+"\n";
    content += "DESCRIPTION:"+summary+"\n";
    content += "END:VEVENT\n";
    return content;
  }

  download(filename : string, text : string): void {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/calendar;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
  }

}

