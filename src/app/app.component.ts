import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'todoapp';
  readonly APIurl = "http://localhost:4200/api/todoapp"; // Corrected variable name
  notes: any = [];
  
  constructor(private http: HttpClient) { }

  refreshNotes() {
    this.http.get(this.APIurl + '/GetNotes').subscribe(data => { // Corrected variable name and added '/' before 'GetNotes'
      this.notes = data;
    });
  }

  addNotes() {
    var newNotes = (<HTMLInputElement>document.getElementById("newNotes")).value;
    var formData = new FormData();
    formData.append("newNotes", newNotes);
    this.http.post(this.APIurl + '/AddNotes', formData).subscribe(data => {
      alert(data);
      this.refreshNotes();
    });
  }

  deleteNotes(id: any) {
    this.http.post(this.APIurl + '/DeleteNotes?id=' + id, {}).subscribe((data: any) => {
      alert(data);
      this.refreshNotes();
    });
  }

  ngOnInit() {
    this.refreshNotes();
  }
}
