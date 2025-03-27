const form = document.querySelector('[data-pet="form"]');
const resultIdd = document.querySelector('[data-pet="resultado"]');
const btnCalc = document.querySelector('[data-pet="btn-calc"]');
const resultFinal = document.querySelector('[data-pet="resultado"]');
const kiloInput = document.querySelectorAll('.kilo');



class Pet {
    constructor(especie, idade, peso) {
        this.especie = especie;
        this.idade = idade;
        this.peso = peso;
        this.cannisArray = ['CACHORRO', 'CÃO', 'CAO', 'CADELA', 'CACHORRA'];
        this.felinosArray = ['GATO', 'GATA'];
    }
    buscarIdade(especie, idade, peso) {
        // const canissArray = ['CACHORRO', 'CÃO', 'CAO', 'CADELA', 'CACHORRA']
        if (this.cannisArray.includes(especie)) {
            pegandoDadosDog(idade, peso);

        } else if (this.felinosArray.includes(especie)) {
            pegandoDadosCat(idade);
        }
    }

    initVerificarOpPets(especie) {
        form.addEventListener('change', () => {
            verificarOpPets(especie);
        });
    }

    verificarOpPets(especie) {
         const optionsPet = this.cannisArray.push(this.felinosArray);
         const alerta = document.querySelector('.alerta');
        if (!optionsPet.includes(especie)) {
            alerta.classList.add('ativo');
            alerta.innerText = 'Espécie ainda não disponível para busca'
            resultIdd.innerText = '';
            // console.log('Espécie ainda não disponível para busca');
        } else if(alerta){
            alerta.classList.remove('ativo')

        }
    }

    // verificaGeralForm(especie, idade, peso) {
        
    // }
}
//Fim da CLASS


//Onde eu faço o instanciamento da class
btnCalc.addEventListener('click',  handleClick);

function handleClick() {
    const inputPet = form[0].value.toUpperCase().trim();
    let inputIddPet = +form[1].value;
    const inputPesoPet = +form[2].value;
    inputIddPet = numeroParaExtenso(inputIddPet);
    const MyPet = new Pet(inputPet, inputIddPet, inputPesoPet);
    MyPet.buscarIdade(inputPet, inputIddPet, inputPesoPet);
    MyPet.verificarOpPets(inputPet);
    // MyPet.verificaGeralForm(inputPet, inputIddPet, inputPesoPet);
    // console.log(MyPet);
    // resultFinal.innerText = `É um ${inputPet} e tem ${inputIddPet} e ${inputPesoPet}`
}


//Se for canino vai chamar essa função, onde acessa o arquivo json e imprime o resultado na tela
function pegandoDadosDog(idade, peso) {
    fetch('idades-pets.json').then(result => {
        const jsonPets = result.json(); //promise, result: object
        jsonPets.then(objPets => { //object
            const jsonFile = objPets;
            if(peso < 10) {
                pesoPetHPeq = jsonFile.dezmenos[idade]
                resultIdd.innerText = `Em idade de humanos seu Cachorro tem aproximadamente ${pesoPetHPeq} anos.`
            } else if(peso >= 10 && peso <= 22) {
                pesoPetHMed = jsonFile.dezevintedois[idade];
                resultIdd.innerText = `Em idade de humanos seu Cachorro tem aproximadamente ${pesoPetHMed} anos.`
            } else if (peso > 22) {
                pesoPetHG = jsonFile.vintedoismais[idade];
                resultIdd.innerText = `Em idade de humanos seu Cachorro tem aproximadamente ${pesoPetHG} anos.`
            }
        })
    });
}

//Se for felino vai chamar essa função, onde acessa o arquivo json e imprime o resultado na tela
function pegandoDadosCat(idade) {
    fetch('idades-pets.json').then(resultResponse => {
        const jsonPets = resultResponse.json();
        jsonPets.then(resultJson => {
            // console.log(resultJson.gatos[idade]);
            const idadeCatH = resultJson.gatos[idade];
            resultFinal.innerText = `O seu gato tem em idade humana aproximadamente ${idadeCatH} anos`;
        }) 
    })
}

//Função que passa a idade para extenso, pois essa é uma propriedade no arquivo json para retornar o idade humana dependendo do kg.
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



form.addEventListener('change', verificaGato);

//Modificando  o forms caso seja gato
function verificaGato() {
    const inputCat = form[0].value.toUpperCase();
    if(inputCat === 'GATO' || inputCat === 'GATA') {
        kiloInput.forEach(kilo => {
            kilo.classList.add('inativo');
        });
        const iddInput = document.querySelector('.idd');
        iddInput.setAttribute('max', 14);
    } else {
        kiloInput.forEach(kilo => {
            kilo.classList.remove('inativo')
        })
    }
}


numeroParaExtenso();


//Fazer tratamento de dados no formulário.
