import {Component, OnInit} from '@angular/core';
import {DataService} from "./data.service";
import {Subject} from "rxjs/Rx";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  AllStatus:any=[];
  dtOptions: DataTables.Settings = {};
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject();
  constructor(private dataService:DataService){

  }


  ngOnInit():void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 7,
      language: {
        "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/French.json"
      },

      // Declare the use of the extension in the dom parameter
      dom: 'Bfrtip',
      // Configure the buttons
      buttons: [
        'columnsToggle',
        'colvis',
        'copy',
        'csv',
        'pdf',
        'print',
        'excel',
        {
          text: 'Some button',
          key: '1',
          action: function (e, dt, node, config) {
            alert('Button activated');
          }
        }
      ]

    };

    this.dataService.LoadData().subscribe(result=>{
      this.AllStatus=result;
      // Calling the DT trigger to manually render the table
      this.dtTrigger.next();

    });

    // Use this attribute to enable the responsive extension
   // responsive: true
  }
}
