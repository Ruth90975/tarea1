import { Injectable } from "@angular/core";
import { PalabraModel} from "../models/Palabras.model";


@Injectable({
    providedIn: 'root'
})

export class DatosPalabrasServices {

    palabras: PalabraModel[] = [];
    
    constructor() {
      // Ejemplo de inicialización de datos
        const frutas: PalabraModel = {
            tipo: 'frutas',
            contenido: [
                { id: 1, name: 'manzana'   },
                { id: 2, name: 'plátano'   },
                { id: 3, name: 'naranja'   },
                { id: 4, name: 'pera'      },
                { id: 5, name: 'uva'       },
                { id: 6, name: 'sandía'    },
                { id: 7, name: 'mango'     },
                { id: 8, name: 'piña'      },
                { id: 9, name: 'melón'     },
                { id: 10,name: 'kiwi'      },
                { id: 11,name: 'maracuya'  },
                { id: 11,name: 'pitajaya'  },
                { id: 11,name: 'nisperos'  },
                { id: 11,name: 'mandarina' },
                
            ]
        };
    
        const profesiones: PalabraModel = {
            tipo: 'profesiones',
            contenido: [
                { id: 1, name: 'profesor'    },
                { id: 2, name: 'doctor'      },
                { id: 3, name: 'ingeniero'   },
                { id: 4, name: 'arquitecto'  },
                { id: 5, name: 'abogado'     },
                { id: 6, name: 'chef'        },
                { id: 7, name: 'diseñador'   },
                { id: 8, name: 'piloto'      },
                { id: 9, name: 'enfermero'   },
                { id: 10, name: 'electricista'},
                { id: 11, name: 'mecánico'    },
                { id: 12, name: 'biólogo'     },
                { id: 13, name: 'farmacéutico'},
                { id: 14, name: 'economista'  },
                { id: 15, name: 'psicólogo'   },
                { id: 16, name: 'arqueólogo'  },
                { id: 17, name: 'periodista'  },
                { id: 18, name: 'contador'    },
                { id: 19, name: 'historiador' },
                { id: 20, name: 'geólogo'     },
                // Agrega más profesiones aquí
            ]
        };
    
        const dias: PalabraModel = {
            tipo: 'dias',
            contenido: [
                { id: 1, name: 'Miercoles'    },
                { id: 2, name: 'viernes'      },
                { id: 3, name: 'lunes'        },
                { id: 4, name: 'Domingo'      },
                { id: 5, name: 'sabado'       },
                { id: 6, name: 'jueves'       },
                { id: 7, name: 'martes'       },
            ]    
        };

        const colores: PalabraModel = {
            tipo: 'colores',
            contenido: [

                { id: 1, name: 'rojo'     },
                { id: 2, name: 'amarillo' },
                { id: 3, name: 'azul'     },
                { id: 4, name: 'verde'    },
                { id: 5, name: 'naranja'  },
                { id: 6, name: 'rosado'   },
                { id: 7, name: 'morado'   },
                { id: 8, name: 'gris'     },
                { id: 9, name: 'blanco'   },
                { id: 10, name: 'negro'   },
                { id: 11, name: 'marrón'  },
                { id: 12, name: 'celeste' },
                { id: 13, name: 'turquesa'},
                { id: 14, name: 'violeta' },
                { id: 15, name: 'dorado'  },
                { id: 16, name: 'plateado'},
                { id: 17, name: 'beige'   },
                { id: 18, name: 'café'    },              
            ]    
        };

        const meses: PalabraModel = {
            tipo: 'meses',
            contenido: [
                { id: 1, name: 'noviembre' },
                { id: 2, name: 'junio'     },
                { id: 3, name: 'febrero'   },
                { id: 4, name: 'abril'     },
                { id: 5, name: 'agosto'    },
                { id: 6, name: 'octubre'   },
                { id: 7, name: 'mayo'      },
                { id: 8, name: 'diciembre' },
                { id: 9, name: 'julio'     },
                { id: 10, name: 'marzo'    },
                { id: 11, name: 'enero'    },
                { id: 12, name: 'septiembre'},
            ]    
        };

        const paises: PalabraModel = {
            tipo: 'paises',
            contenido: [
                { id: 1, name: 'India'     },
                { id: 2, name: 'Argentina' },
                { id: 3, name: 'Canadá'    },
                { id: 4, name: 'Australia' },
                { id: 5, name: 'España'    },
                { id: 6, name: 'Brasil'    },
                { id: 7, name: 'Italia'    },
                { id: 8, name: 'México'    },
                { id: 9, name: 'Alemania'  },
                { id: 10, name: 'Francia'  },
                { id: 11, name: 'China'    },
                { id: 12, name: 'Japón'    },
                { id: 13, name: 'Rusia'    },
                { id: 14, name: 'Peru'     },
                { id: 15, name: 'India'    },
                { id: 16, name: 'Colombia' },
                { id: 17, name: 'ReinoUnido' },
                { id: 18, name: 'Sudáfrica' },
                { id: 19, name: 'CoreadelSur' },
                { id: 20, name: 'Turquía' },
            ]    
        };


        this.palabras.push(frutas, profesiones,dias,meses,paises,colores);
    }

    getPalabras(): PalabraModel[] {
    return this.palabras;
    }


}