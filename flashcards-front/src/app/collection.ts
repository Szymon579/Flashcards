import { Card } from "./card";

export interface Collection {
    id: number;
    title: string;
    cards: Card[];
}

export interface ShareCollection {
    id: number;
    email: string;
}

export interface RenameCollection {
    id: number;
    title: string;
}