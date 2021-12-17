import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionsService } from 'src/app/services/questions.service';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  public Editor=ClassicEditor;

  qId;
  qTitle;
  question = {
    quiz:{},
    content:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    answer:''
  }

  constructor(
    private _route:ActivatedRoute,
    private _question:QuestionsService,
    private _snack: MatSnackBar,
    ) { }

  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qid'];
    this.qTitle = this._route.snapshot.params['title'];
    this.question.quiz['qid']=this.qId;
  }

  formSubmit(){
    if(this.question.content.trim()=="" || this.question.content == null){
      this._snack.open("Question Content Required","OK",{
        duration:2000,
        verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass: ['red-snackbar'],
      })
      return;
    }
    if(this.question.option1.trim()=="" || this.question.option1 == null){
      this._snack.open("Atleast 2 Options Required","OK",{
        duration:2000,
        verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass: ['red-snackbar'],
      })
      return;
    }
    if(this.question.option2.trim()=="" || this.question.option2 == null){
      this._snack.open("Atleast 2 Options Required","OK",{
        duration:2000,
        verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass: ['red-snackbar'],
      })
      return;
    }
    if(this.question.answer.trim()=="" || this.question.answer == null){
      this._snack.open("Answer is Required","OK",{
        duration:2000,
        verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass: ['red-snackbar'],
      })
      return;
    }
    //form submit
    this._question.addQuestion(this.question).subscribe(
      (data:any)=>{
        console.log(data);
        Swal.fire("Success", "Question added successfully, Add another one", "success");
        this.question.content='';
        this.question.option1='';
        this.question.option2='';
        this.question.option3='';
        this.question.option4='';
        this.question.answer='';
      },
      (error)=>{
        console.log(error);
        Swal.fire("Error", "Error in adding question", "error")
      }
    )
  }


}
