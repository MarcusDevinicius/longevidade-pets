const form = document.querySelector('[data-pet="form"]');
const resultIdd = document.querySelector('[data-pet="resultado"]');
const btnCalc = document.querySelector('[data-pet="btn-calc"]');

class Pet {
    constructor(especie, idade, peso) {
        this.especie = especie;
        this.idade = idade;
        this.peso = peso;
    }
    calcIdade(especie, idade, peso) {
        console.log(idade);
        if (especie === 'CACHORRO' && peso <= 10 && idade === 1) {
            // console.log(`É um cachorro e tem Menos de 10kg`);
            pegandoDados();
           
        }
    }
}

// const MyPet = new Pet('Cachorro');
// console.log(MyPet)

btnCalc.addEventListener('click', handleClick);

function handleClick() {
    const inputPet = form[0].value.toUpperCase();
    const inputIddPet = +form[1].value;
    const inputPesoPet = +form[2].value;
    const MyPet = new Pet(inputPet, inputIddPet, inputPesoPet);
    MyPet.calcIdade(inputPet, inputIddPet, inputPesoPet);
    console.log(MyPet);
    // result.innerText = `É um ${inputPet} e tem ${inputIddPet} e ${inputPesoPet}`
}
function pegandoDados() {
    fetch('idades-pets.json').then(result => {
        const jsonPets = result.json(); //promise, result: objsct
        jsonPets.then(objPets => { //object
            const idadeH = objPets.dezmais.um;
            console.log(idadeH);
            resultIdd.innerText = `Em idade de humanos seu cachorro tem ${idadeH} anos.`
            // console.log(jsonPets);
        })
    });
}   



