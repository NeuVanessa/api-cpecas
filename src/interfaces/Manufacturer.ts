//Fabricante - exp: FIAT
export interface Manufacture {
    id: string;
    name: string;

    //Se é carro moto ou caminhão// o tipo de produto do fabricante 
    product: [{
        id: string;
        name: string;
        departament: [
            {
                cod: string;
                image: string;
                title: string;
                price: number;
                pricetotal: number;
                detail: string;
                //quantidade do item no departamento
                amount: number;
                desc: number;
                warranty: string;
                //Tipo se é carro moto ou caminhão


            }

        ];
    }]






}
