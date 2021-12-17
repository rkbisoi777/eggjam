import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionsService } from 'src/app/services/questions.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  qId;
  questions:any;

  marksGot = 0;
  correctAnswers = 0;
  attempted = 0;

  isSubmit=false;

  timer:any;

  constructor(
    private _route:ActivatedRoute,
    private _quiz:QuizService,
    private _question:QuestionsService,
    private _locationSt: LocationStrategy
    ) { }

  ngOnInit(): void {
    //stop back button
    this.preventBackButton();
    this.qId = this._route.snapshot.params['qid'];
    this.loadQuestions();
  }

  loadQuestions() {
    this._question.getQuestionsOfQuizForUser(this.qId).subscribe(
      (data:any)=>{
        //load question
        this.questions = data.filter((question:any)=> question.quiz.active != false);
        //timer
        this.timer = this.questions.length * 2 * 60;
        //console.log(this.questions)
        this.startTimer();
      },
      (error)=>{
        console.log(error);
        Swal.fire("Error","Error in Loading Questions of Quiz","error")
      }
    )
  }

  //Stop Back Button
  preventBackButton(){
    history.pushState(null,location.href);
    this._locationSt.onPopState(()=>{
      history.pushState(null,location.href);
    })
  }

  //submitQuiz
  submitQuiz(){
    Swal.fire({
      title: "Do you want to submit the quiz?",
      showCancelButton: true,
      confirmButtonText: "Submit",
      confirmButtonColor: "#3f51b5",
      icon: 'info'
    }).then((e)=>{
      if(e.isConfirmed){
        //calculation
        this.calculateMarks();
        this.stopTimer();
        /* this.questions.forEach((q)=>{
          if(q.givenAnswer == q.answer){
            this.correctAnswers++
            let marksSingle = this.questions[0].quiz.maxMarks / this.questions.length;
            this.marksGot += marksSingle;
          }
          if(q.givenAnswer.trim() != ''){
            this.attempted++;
          }
        }) */
        //console.log("Correct Answers : "+ this.correctAnswers);
        //console.log("Marks Got : "+this.marksGot);
        //console.log("Attempted : "+this.attempted);

      }
    })
  }

  //autoSubmit
  autoSubmit(){
        //calculation
        this.calculateMarks()
        /* this.questions.forEach((q)=>{
          if(q.givenAnswer == q.answer){
            this.correctAnswers++
            let marksSingle = this.questions[0].quiz.maxMarks / this.questions.length;
            this.marksGot += marksSingle;
          }
          if(q.givenAnswer.trim() != ''){
            this.attempted++;
          }
        }) */
    Swal.fire("Success","Quiz submitted succesfully, Check Result","success")
  }

  //timer function
  startTimer(){
    let t:any = window.setInterval(()=>{
      if(this.timer<=0){
        this.autoSubmit()
        clearInterval(t);
      }else{
        this.timer--;
      }
    },1000)
  }

  stopTimer(){
    this.timer=0;
  }

  //Time Format
  getFormattedTime(){
    let mm = Math.floor(this.timer/60);
    let ss = this.timer-mm*60;
    return `${mm} min : ${ss} sec`
  } 

  //calculate Marks
  calculateMarks(){
    //call to server to check questions
    this._question.calcQuiz(this.questions).subscribe(
      (data:any)=>{
        //console.log(data);
        this.marksGot = parseFloat(Number(data.marksGot).toFixed(2));
        this.correctAnswers = data.correctAnswers;
        this.attempted = data.attempted
      },
      (error)=>{
        console.log(error);
      }
    )
    this.isSubmit = true;
  }

  printPage(){
    window.print();
  }
}
