import { Component, OnInit } from '@angular/core';
import { ChatDTO } from '../../models/chat-dto';
import { environment } from '../../../environments/environment';
import { ParsePlainChatService } from '../../services/parse-plain-chat.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-proccessing',
  templateUrl: './proccessing.component.html',
  styleUrls: ['./proccessing.component.css']
})
export class ProccessingComponent implements OnInit {

  private type: string;
  private picture: string;
  private chatDTO: ChatDTO;
  private responsePending: boolean;
  private commitValid: boolean;

  constructor(private chatParser: ParsePlainChatService, private router: Router,private route: ActivatedRoute) { 
    this.picture = environment.picFolder + "default/spinner-of-dots.svg";
    this.route.params.subscribe(param => {
      this.type = param["op"];
    })
    this.chatParser.parseTmpResult$.subscribe((ret: ChatDTO) => {
      this.chatDTO = ret;
      this.responsePending = false;
    })
  }

  ngOnInit() {
    this.responsePending = true;
    this.commitValid = false;
  }

  private cancel() {
    this.router.navigateByUrl("/overview");
  }

  private commit() {
    this.router.navigateByUrl("/overview");
    this.chatParser.complete(this.chatDTO).then(function(result) {
      console.log("Import request was completed successfully.")
    }, function(error) {
      console.log("Error: Import request failed.")
    });
  }

  private userSelection(user: string) {
    this.commitValid = true;
    this.chatDTO.mainUser = user;
  }

}
