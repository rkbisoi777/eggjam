import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionsService } from 'src/app/services/questions.service';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {

  catId;
  quizzes;

  constructor(private _route:ActivatedRoute, private _quiz:QuizService, private _question:QuestionsService) { }

  ngOnInit(): void {
    //this.catId = this._route.snapshot.params['catId'];
    this._route.params.subscribe((params)=>{
      this.catId = params['catId'];
      if(this.catId == 0){
        //console.log("Load All Data")
        this._quiz.quizzes().subscribe(
          (data:any)=>{
            this.quizzes = data.filter((quiz:any)=> quiz.active != false);
            this.quizzes.forEach((q)=>{
              q['questions_length'] = '';
              this._question.getQuestionsOfQuizForUser(q.qid).subscribe(
                (data:any)=>{
                  let quest_list = data;
                  //console.log(quest_list.length.toString());
                  q.questions_length = quest_list.length.toString();
                  //console.log(q.questions_length);
                  if(q.questions_length == '0'){
                    this.quizzes = this.quizzes.filter((quiz:any)=> quiz.qid != q.qid);
                  }
                },
                (error)=>{
                  console.log(error);
                }
              );
            })
            //console.log(this.quizzes);
          },
          (error)=>{
            console.log(error);
            alert("Error in Loading all quizzes")
          }
        )
      }else{
        //console.log(this.catId);
        //console.log("Load Filtered Data")
        this._quiz.getQuizzesOfCategory(this.catId).subscribe(
          (data:any)=>{
            this.quizzes = data.filter((quiz:any)=> quiz.active != false);
            /* this.quizzes.forEach((q)=>{
              this._question.getQuestionsOfQuiz(q.qid).subscribe(
                (data:any)=>{
                  console.log(data);
                },
                (error)=>{
                  console.log(error);
                }
              );
            }) */
            //console.log(this.quizzes);
          },
          (error)=>{
            console.log(error);
            alert("Error in Loadin Filtered quizzes")
          }
        )
  
  
        /* console.log("Filtered Quizzes");
        this._quiz.quizzes().subscribe(
          (data:any)=>{
            this.quizzes = data;
            this.quizzes = this.quizzes.filter((quiz:any)=> quiz.category.cid == this.catId);
          },
          (error)=>{
            console.log(error);
            alert("Error in Loading Filtered quizzes")
          }
        ) */
      } 
    })
  }
}
