import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Card } from '../card';
import { CardService } from '../card.service';
import { Collection } from '../collection';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css'
})
export class CardsComponent implements OnInit {
  
  showFront: boolean = true;
  frontText: string | undefined = "Front of the flashcard";
  backText: string | undefined = "Back of the flashcard";
  cards: Card[] = [];
  index: number = 0;

  constructor(
    private cardService: CardService, 
    private location: Location, 
    private route: ActivatedRoute
    ) {}
  
  ngOnInit(): void {
    this.getFlashcards();   
  }

  getFlashcards(): void {
    this.cardService.getCardsByCollectionId(Number(this.route.snapshot.paramMap.get("id")))
    .subscribe(
      (cards: Card[]) => {
        this.cards = cards;
        this.setText();
        console.log(this.cards);
      });
  }

  addCard(frontText: string, backText: string): void {
    if(!frontText || !backText) {return;}
    
    const collId = Number(this.route.snapshot.paramMap.get("id"));
    console.log("collectino id: " + collId);
    
    const newCard: Card = 
    {
      id: 0,
      collectionId: collId,
      frontText: frontText,
      backText: backText
    }

    console.log(newCard);
    
    //this.cards.push(newCard);
    this.cardService.addCard(newCard)
      .subscribe(card => this.cards.push(newCard));
  }

  setText(): void {
    this.frontText = this.cards.at(this.index)?.frontText;
    this.backText = this.cards.at(this.index)?.backText;
  }

  showNext(): void {
    this.showFront = true;
    this.index += 1;
    if (this.index > this.cards.length - 1)
      this.index = 0;
    
    this.setText();
  }

  showPrevious(): void {
    this.showFront = true;
    this.index -= 1;
    if (this.index < 0)
      this.index = this.cards.length - 1;

    this.setText();
  }

  flipCard(): void {
    this.showFront = !this.showFront;
  }

  displayText(): string | undefined {
    return this.showFront ? this.frontText : this.backText; 
  }

  goBack(): void {
    this.location.back();
  }
}