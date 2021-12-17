import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-prequiz',
  templateUrl: './prequiz.component.html',
  styleUrls: ['./prequiz.component.css']
})
export class PrequizComponent implements OnInit {

  qid;
  quiz;

  constructor(
    private _route:ActivatedRoute,
    private _quiz:QuizService,
    private _router:Router
    ) { }

  ngOnInit(): void {
    this.qid = this._route.snapshot.params['qid'];
    this._quiz.getQuiz(this.qid).subscribe(
      (data:any)=>{
        this.quiz = data;
        //console.log(this.quiz);
      },
      (error)=>{
        console.log(error);
        alert("Error Loading Quiz")
      }
    )
  }

  startQuiz(){
    Swal.fire({
      icon: 'info',
      title: 'Are you sure you want to start the quiz?',
      confirmButtonText: 'Start',
      confirmButtonColor: "#3f51b5",
      showCancelButton: true,
    }).then((result)=>{
      if(result.isConfirmed){
        this._router.navigateByUrl(`/start/${this.qid}`);
      }
    })
  }

}
