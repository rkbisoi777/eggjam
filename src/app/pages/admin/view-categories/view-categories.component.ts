import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {

  categories=[
    {
      cid: 23,
      title: "Programming",
      description: "This is a Test Category"
    },
    {
      cid: 24,
      title: "GK",
      description: "This is a Test Category"
    },
    {
      cid: 25,
      title: "Aptitude",
      description: "This is a Test Category"
    }
  ]

  constructor(private _category:CategoryService) { }

  ngOnInit(): void {
    this._category.categories().subscribe(
      (data:any)=>{
        this.categories = data;
        console.log(this.categories)
      },
      (error)=>{
        console.log(error);
        Swal.fire("Error", "Errors in Loading Data", "error")
      }
    )
  }

}
