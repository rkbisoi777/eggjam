import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {

  qid= 0;
  quiz;
  categories = [];

  constructor(
    private _route:ActivatedRoute, 
    private _quiz: QuizService,
    private _categories:CategoryService,
    private _snack:MatSnackBar,
    private _router:Router
    ) { }

  ngOnInit(): void {
    this.qid = this._route.snapshot.params['qid'];
    //alert(this.qid);
    this._quiz.getQuiz(this.qid).subscribe(
      (data:any)=>{
        console.log(data);
        this.quiz = data;
      },
      (error)=>{
        console.log(error);
      }
    )
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

  updateQuizSubmit(){
    if(this.quiz.title.trim()=="" || this.quiz.title==null){
      this._snack.open("Title Required","OK",{
        duration:2000,
        verticalPosition: 'bottom',
          horizontalPosition: 'center',
          panelClass: ['red-snackbar'],
      })
      return;
    }
    this._quiz.updateQuiz(this.quiz).subscribe(
      (data:any)=>{
        console.log(data);
        /*
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
        */
        Swal.fire("Success", "Category dpdated successfully", "success").then((e)=>{
          this._router.navigate(['/admin/quizzes']);
        })
      },
      (error)=>{
        console.log(error);
        Swal.fire("Error", "Server Error", "error")
      }
    )
  }


}
