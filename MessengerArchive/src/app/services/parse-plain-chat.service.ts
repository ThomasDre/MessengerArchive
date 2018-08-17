import { Injectable } from '@angular/core';
import { throws } from 'assert';
import { ChatDTO } from '../models/chat-dto';
import { timeout } from 'q';
import { Subject, Observable } from 'rxjs';
import { TimeService } from './time.service';
import * as $ from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class ParsePlainChatService {

  private fr: FileReader;
  private text;
  private container: Document;
  private returnValue: ChatDTO;   // this object is filled during processing times with required values, upon successful parsing it will be submitted to observable

  // observables
  private parseTmpResult: Subject<ChatDTO>;
  public parseTmpResult$: Observable<ChatDTO>;

  // vars for algorithmic purposes  
  private repeat: boolean;    // signal that parsing had to be repeated to resolve ambiguity
  private currentDate: Date;
  private chatCount: number;

  // REGEX EXPRESSIONS
  private regexLineStart = "[0-3][0-9]\.[0-1][0-9]\.[0-9]{2}\,\ [0-2][0-9]\:[0-6][0-9]\ \-\ ";
  private regexTimeStamp = "[0-3][0-9]\.[0-1][0-9]\.[0-9]{2}\,\ [0-2][0-9]\:[0-6][0-9]";
  private regexName = ".+\:\ "

  constructor(private timeService: TimeService) { 
    this.fr = new FileReader();
    this.parseTmpResult = new Subject<ChatDTO>();
    this.parseTmpResult$ = this.parseTmpResult.asObservable();
  }

  /**
   * The chosen .txt file is parsed and upon success the parsed file is stored as html.
   * In case of an unexpected error an exception is thrown.
   * @param file the name of the plain txt. file
   */
  public parse(event)  {
    var input = event.target;

    this.fr.onload = () => {
      let dummyText: string;
      
      this.text = this.fr.result;
      dummyText = this.text;

      this.repeat = false;
      // repeats parsing until no more ambiguities exist
      do {
        this.processText(dummyText);
      } while(this.repeat)
      // here, parsing was successful -> emit data to be observed
      this.parseTmpResult.next(this.returnValue);
    }
    
    // get text
    this.fr.readAsText(input.files[0]);
  }


  /**
   * This method has to be called after 'parse' of this service was called.
   * To be successful, the mainUser hast to be specified in the dto object. Iff thats holds, the previously created
   * document of the chat is updated and the specified mainUser is marked accordingly. Eventually its .html is saved
   * and the metadata (name of chat, chatmembers, storagelocation of html) of the chat are inserted into the general config file. 
   * @param chatDTO the data transfer object of the chat data
   * @return a Promise is returned in order to notify the caller as soon as the request is finished.
   *         In case of missing or invalid mainUser the promise will be rejected.
   */
  public complete(chatDTO: ChatDTO): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      let mainUserCount: number = 0;
      $(this.container.getElementById('chat')).children().each(function() {
        let current = $(this);
        if (current.hasClass("chatBubble")) {
          if(current.find(".sender").text() == chatDTO.mainUser) {
            current.addClass("mainUser");
            mainUserCount++;
          } else {
            current.addClass("otherUser");
          }
        }
        
        if (mainUserCount == 0) {
          reject("Submitted 'main user' name is invalid - none of the members could be identified by this name");
        }        
      });
  
      // save file
      // TODO MISSING
      resolve();
    })
  }


  /* PRIVATE FUNCTIONS - INTERN FUNCTIONALITY */


  private processText(text: string) {
    // one exchange of a chat (chat is parsed exchange by exchange)
    var exchange: string;

    this.chatCount = 0;
    this.returnValue = new ChatDTO(); 
    // init dom
    this.initTemplate();

    try {
      while(text != null) {
        exchange = this.getChatExchange(text);
        text = this.cutoffText(exchange, text);
        this.buildTemplate(exchange);
      }
   } catch(exception) {
      console.log("Unexpected error occured - operation was not successfully");
      this.returnValue.valid = false;
   }
  }

  /**
   * returns a complete single chatexchange by one user.
   * iff the underlying chat is finished NULL is returned
   */
  private getChatExchange(text: string): string {
    let part: string = ""; 
    let timestamp: string;

    do {
      let tmpPart: string = text.slice(0,text.indexOf("\n") + 1);
      part += tmpPart;
      text = this.cutoffText(tmpPart, text);
    } while (this.isMoreContent(text));
   
    return part;
  }

  /**
   * The part of the text thas has been processed prior is cut off.
   * Iff the text is empty, NULL is returned
   * @param processed part of the text thas is already processed
   * @param text complete text
   */
  private cutoffText(processed: string, text: string): string {
    if (text.length > 0) {
      let linesToCut = processed.match(new RegExp("\n", "g")).length;

      for (let i = 0; i < linesToCut; i++) {
        text = text.slice(text.indexOf("\n") + 1, text.length);
      }

      return text;
    } else {
      return null;
    }
  } 

  /**
   * Given a string representing a single message exchange, this content is added to the DOM representation of the chat
   * @param exchange a single exchange of the chat
   */
  private buildTemplate(exchange: string) {
    let timestamp: string;
    let date: Date;
    let name: string;
    let nameTest: RegExpMatchArray;
    let msg: string;
    let textExcDate: string;

    if (exchange.match(this.regexTimeStamp) != null) {

      timestamp = exchange.match(this.regexTimeStamp)[0];
      textExcDate = exchange.slice(exchange.match(this.regexLineStart)[0].length, exchange.length);
      nameTest = textExcDate.match(this.regexName);
      
      if (nameTest == null) {
        console.log("Chat Prelude -> NOT PROCESSED");
        // not a regular chat line --> preliminary content
        // do smth different, e.g. add users, choose group chat name etc.
      } else {
        name = nameTest[0].slice(0, nameTest[0].indexOf(": "));  // include only part until the first occurence of :
        msg = textExcDate.slice(name.length + 2, textExcDate.length);

        if (this.returnValue.containUser(name) == false) {
          alert(name);
          this.returnValue.addUser(name);
        }
      
        date = this.timeService.parseTimeStamp(timestamp);
        this.insertDateElem(date);
        this.insertMainElem(date, name, msg);
      }

    }
  }


  /**
   * A elem that represents a new date is inserted into the chat iff the current message's date is not
   * equal to the last messages' date.
   * @param date the date of the currently inserted message
   */
  private insertDateElem(date: Date) {
    if (this.currentDate == null || this.timeService.compareYYYYMMDD(date, this.currentDate)) {
      let li: Element = document.createElement('li');;
      let div: Element = document.createElement('div');;
      let pY: Element = document.createElement('p');;
      let pM: Element = document.createElement('p');;
      let pD: Element = document.createElement('p');;
      // set most current date
      this.currentDate = date;
      
      li.className = "dateBubble";
      li.id= "d" + this.timeService.getYYYYMMDD(date);
      div.className = "content";
      pY.className = "year";
      pY.textContent = date.getFullYear().toString();
      pM.className = "month";
      pM.textContent = this.timeService.monthAsString(date.getMonth());
      pD.className = "day";
      pD.textContent = date.getDate().toString();
      div.appendChild(pD);
      div.appendChild(pM);
      div.appendChild(pY);
      li.appendChild(div);
      this.container.getElementById('chat').appendChild(li);
    }
  }

  /**
   * An elem representing a message exchange ('one chatBubble') is inserted into the chat
   * @param date date of this message exchange
   * @param name name of the sender
   * @param msg message
   */
  private insertMainElem(date: Date, name: string, msg: string) {
    let li: Element = document.createElement('li');
    let div: Element = document.createElement('div');
    let pSender: Element = document.createElement('p');
    let pMsg: Element = document.createElement('p');
    let pTime: Element = document.createElement('p');

    li.className = "chatBubble";
    li.id = this.chatCount.toString();
    div.className = "content";
    pSender.className = "sender";
    pSender.textContent = name;
    pMsg.className = "message";
    pMsg.textContent = msg;
    pTime.className = "time";
    pTime.textContent = date.getHours() + ":" + date.getMinutes();
    div.appendChild(pSender);
    div.appendChild(pMsg);
    div.appendChild(pTime);
    li.appendChild(div);
    this.container.getElementById('chat').appendChild(li);

    // increase chat count
    this.chatCount++;
  }

  /**
   * Performs a check iff next line in submitted text still belongs to previous parsed line or not.
   * @param text the given text that doenst include the part that is matter of this check.
   *             (i.e. it is assumed that the first character of the parameter points to the next characters that
   *              have not been parsed yet and which are questionable whether they belong to the previous line or not)
   */
  private isMoreContent(text: string): boolean {
    if (text != null && text.length > 0) {
      let part: string = text.slice(0, text.indexOf("\n" + 1));

      if (part.match(this.regexLineStart) == null) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  private initTemplate() {
    this.container = new Document();
    let div = document.createElement('div');
    // 1st child of chatContainer
    let chatInfo: Element = document.createElement('ul');
    chatInfo.id = "chatInfo";
    // 2nd child of chatContainer
    let chat: Element = document.createElement('ul');
    chat.id = "chat";
    
    div.id = "find";
    div.appendChild(chatInfo);
    div.appendChild(chat);
    this.container.appendChild(div);
  }
}
