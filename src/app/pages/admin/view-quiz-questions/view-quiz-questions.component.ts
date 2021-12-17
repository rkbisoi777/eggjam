import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionsService } from 'src/app/services/questions.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit {

  qId;
  qTitle;
  questions= [];


  constructor(
    private _route: ActivatedRoute,
    private _questions:QuestionsService,
  ) { }

  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qid'];
    this.qTitle = this._route.snapshot.params['title'];
    this._questions.getQuestionsOfQuiz(this.qId).subscribe(
      (data:any)=>{
        console.log(data);
        this.questions = data;
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  delete(quesId){
    Swal.fire({
      icon:'warning',
      title: "Are you sure?",
      confirmButtonText: 'Delete',
      showCancelButton: true,
    }).then((result)=>{
      if(result.isConfirmed){
        //Delete Quiz
        this._questions.deleteQuestion(quesId).subscribe(
          (data:any)=>{
            console.log(data);
            this.questions = this.questions.filter((question:any)=> question.quesId != quesId);
            Swal.fire("Success","Question Deleted Succesfully","success");
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
