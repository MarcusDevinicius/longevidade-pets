const form = document.querySelector('[data-pet="form"]');
const resultIdd = document.querySelector('[data-pet="resultado"]');
const btnCalc = document.querySelector('[data-pet="btn-calc"]');
const resultFinal = document.querySelector('[data-pet="resultado"]');



class Pet {
    constructor(especie, idade, peso) {
        this.especie = especie;
        this.idade = idade;
        this.peso = peso;
    }
    buscarIdade(especie, idade, peso) {
        if (especie === 'CACHORRO') {
            pegandoDadosDog(idade, peso);

        } else if (especie === 'GATO') {

        }
    }
}

btnCalc.addEventListener('click',  handleClick);

function handleClick() {
    const inputPet = form[0].value.toUpperCase();
    let inputIddPet = +form[1].value;
    const inputPesoPet = +form[2].value;
    inputIddPet = numeroParaExtenso(inputIddPet);
    const MyPet = new Pet(inputPet, inputIddPet, inputPesoPet);
    MyPet.buscarIdade(inputPet, inputIddPet, inputPesoPet);
    // console.log(MyPet);
    // resultFinal.innerText = `É um ${inputPet} e tem ${inputIddPet} e ${inputPesoPet}`
}


function pegandoDadosDog(idade, peso) {
    fetch('idades-pets.json').then(result => {
        const jsonPets = result.json(); //promise, result: object
        jsonPets.then(objPets => { //object
            const jsonFile = objPets;
            if(peso < 10) {
                pesoPetHPeq = jsonFile.dezmenos[idade]
                resultIdd.innerText = `Em idade de humanos seu Cachorro tem ${pesoPetHPeq} anos.`
            } else if(peso >= 10 && peso <= 22) {
                pesoPetHMed = jsonFile.dezevintedois[idade];
                resultIdd.innerText = `Em idade de humanos seu Cachorro tem ${pesoPetHMed} anos.`
            } else if (peso > 22) {
                pesoPetHG = jsonFile.vintedoismais[idade];
                resultIdd.innerText = `Em idade de humanos seu Cachorro tem ${pesoPetHG} anos.`
            }
            // console.log(idadeH);
            // resultIdd.innerText = `Em idade de humanos seu Cachorro tem ${idadeH} anos.`
        })
    });
}

function numeroParaExtenso(numero) {
    const unidades = ["", "um", "dois", "três", "quatro", "cinco", "seis", "sete", "oito", "nove"];
    const menorQVinte = ["dez", "onze", "doze", "treze", "quatorze", "quinze", "dezesseis", "dezessete", "dezoito", "dezenove"];
    if (numero < 10) {
        return unidades[numero]
    }
    else if (numero < 20){
        return menorQVinte[numero - 10]
    }
    console.log(numero)
}


numeroParaExtenso();


//Fazer tratamento de dados no formulário.
