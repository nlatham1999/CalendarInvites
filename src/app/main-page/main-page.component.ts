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
  anniversaryDate = "12-31-9999";
  dateSelection = "12-31-9999";
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
    this.dateSelection = currentDate.getMonth() + "-" + currentDate.getDate() + "-" + currentDate.getFullYear();
  }

  setDate(e : any){
    this.dateSelection = e.target.value;
  }

  createFile(): void {
    var content = "";
    content += "BEGIN:VCALENDAR\n";
    content += "VERSION:2.0\n";
    content += "PRODID:-//ZContent.net//Zap Calendar 1.0//EN\n";
    content += "CALSCALE:GREGORIAN\n";
    content += "METHOD:PUBLISH\n";

    content += this.createEvent("event 1");
    content += this.createEvent("event 2");

    content += "END:VCALENDAR\n";

    this.download("event.ics", content);
  }

  createEvent(summary: string): string {
    var content = "";
    content += "BEGIN:VEVENT\n";
    content += "SUMMARY:"+summary+"\n";
    content += "DTSTART:20220212\n";
    content += "DTEND:20220213\n";
    content += "CONTENT:hello world\n";
    content += "DESCRIPTION:Testing Testing\n";
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

