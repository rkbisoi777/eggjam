import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { switchAll } from 'rxjs';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {

  quizzes=[];

  constructor(private _quiz:QuizService) { }

  ngOnInit(): void {
    this._quiz.quizzes().subscribe(
      (data:any)=>{
        this.quizzes=data;
        console.log(data)
      },
      (error)=>{
        console.log(error);
        Swal.fire("Error","Error in loadin data from server","error")
      }
    )
  }

  delete(qid){
    Swal.fire({
      icon:'warning',
      title: "Are you sure?",
      confirmButtonText: 'Delete',
      showCancelButton: true,
    }).then((result)=>{
      if(result.isConfirmed){
        //Delete Quiz
        this._quiz.deleteQuiz(qid).subscribe(
          (data:any)=>{
            console.log(data);
            this.quizzes = this.quizzes.filter((quiz:any)=> quiz.qid != qid);
            Swal.fire("Success","Quiz Deleted Succesfully","success");
            //this.ngOnInit();
          },
          (error)=>{
            console.log(error);
            Swal.fire("Error","Unsuccesfull","error");
          }
        );
      }
    })
  }
}
