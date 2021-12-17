import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

  quiz={
    title:'',
    description:'',
    maxMarks:'',
    numberOfQuestion:'',
    active: true,
    category: {
      cid: '',
      /*
      title: '',
      description:''
      */
    }
  }

  categories = [];

  constructor(private _quiz:QuizService,private _snack:MatSnackBar, private _categories:CategoryService) { }

  ngOnInit(): void {
    this._categories.categories().subscribe(
      (data:any)=>{
        this.categories = data;
        console.log(this.categories)
      },
      (error)=>{
        console.log(error);
        Swal.fire("Error", "Error loading Categories from Server", "error")
      }
    )
  }

  formSubmit(){
    if(this.quiz.title.trim()=="" || this.quiz.title==null){
      this._snack.open("Title Required","OK",{
        duration:2000,
        verticalPosition: 'bottom',
          horizontalPosition: 'center',
          panelClass: ['red-snackbar'],
      })
      return;
    }
    this._quiz.addQuiz(this.quiz).subscribe(
      (data:any)=>{
        console.log(data);
        this.quiz={
          title: '',
          description: '',
          maxMarks: '',
          numberOfQuestion:'',
          active: false,
          category:{
            cid:'',
          }
        }
        Swal.fire("Success", "Category added successfully", "success")
      },
      (error)=>{
        console.log(error);
        Swal.fire("Error", "Server Error", "error")
      }
    )
  }

}
