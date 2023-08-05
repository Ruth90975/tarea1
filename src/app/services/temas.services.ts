import { Injectable } from "@angular/core";

import { temasModel } from "../models/Temas.model";


@Injectable({
    providedIn: 'root'
})

export class TemasServices {

    palabras: temasModel[] = [];
    
    constructor() {}
    private temas: temasModel[] = [
        { nombre: "fondo.png",  id: '0' },
        { nombre: "fondo1.png", id: '1' },
        { nombre: "fondo2.png", id: '2' },
        { nombre: "fondo3.png", id: '3' },
        { nombre: "fondo4.png", id: '4' },
        { nombre: "fondo5.png", id: '5' },
        { nombre: "fondo6.png", id: '6' },
        { nombre: "fondo7.png", id: '7' },
        { nombre: "fondo8.png", id: '8' },

    ];

getTemas(): temasModel[] {
    return this.temas;
}

}