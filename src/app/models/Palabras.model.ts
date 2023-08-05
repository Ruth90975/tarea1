interface PalabraModel {
    tipo: string;
    contenido: {
        id: number;
        name: string;
        }[];
}

interface PalabraContenidoModel {
    id: number;
    name: string;
}

// modelos de estrucutura firebase
interface gameModel {
    id: string;
    tema:string;
    juego: {
        objeto: string;
        estado: string;
        posicion: number;
        }[];
       
}

export { PalabraModel, PalabraContenidoModel,gameModel};