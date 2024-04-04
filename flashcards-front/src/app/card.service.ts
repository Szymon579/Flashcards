import { Injectable } from '@angular/core';
import { Card } from './card';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, pipe } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private cardsUrl = "http://localhost:5243/api/cards";
  private cardsByCollectionUrl = "http://localhost:5243/api/cards/collection";
  httpOptions = {
    headers: new HttpHeaders({"Content-type": "application/json"})
  };

  constructor(private http: HttpClient) { }

  getCardsByCollectionId(collectionId: number): Observable<Card[]> {
    return this.http.get<Card[]>(this.cardsByCollectionUrl + `/${collectionId}`);
  }

  addCard(card: Card): Observable<Card> {
    console.log("in service");
    console.log(card);
    return this.http.post<Card>(this.cardsUrl, card, this.httpOptions);
  }
  
}