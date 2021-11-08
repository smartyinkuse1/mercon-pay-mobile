import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup-choice',
  templateUrl: './signup-choice.component.html',
  styleUrls: ['./signup-choice.component.scss'],
})
export class SignupChoiceComponent implements OnInit {
  @Input() title;
  constructor() { }

  ngOnInit() {}

}
