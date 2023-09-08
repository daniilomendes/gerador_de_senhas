// Seleção de elementos
const generatePassworldButton = document.querySelector("#generate-passworld");
const generatePassworldElement = document.querySelector("#generated-passworld");

/* Novas funcionalidades */
const openCloseGeneratorButton = document.querySelector("#open-generate-passworld");
const generatePassworldContainer = document.querySelector("#generate-options");
const lenghtInput = document.querySelector("#length");
const lettersInput = document.querySelector("#letters");
const numbersInput = document.querySelector("#numbers");
const symbolsInput = document.querySelector("#symbols");
const copyPassworldButton = document.querySelector("#copy-passworld");


// Funções
const getLetterLowerCase = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
};

const getLetterUpperCase = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
};

const getNumber = () => {
    return Math.floor(Math.random() * 10).toString();
};

const getSymbol = () => {
    const symbols = "(){}[]=<>/,.!@#$%^&*+-";
    return symbols[Math.floor(Math.random() * symbols.length)];
};

const generatePassworld = (getLetterLowerCase, getLetterUpperCase, getNumber, getSymbol) => {
    let passworld = "";

    // Segunda versão
    const passworldLength = lenghtInput.value;

    const generators = [];

    if(lettersInput.checked){
        generators.push(getLetterLowerCase, getLetterUpperCase)
    }

    if(numbersInput.checked){
        generators.push(getNumber)
    }

    if(symbolsInput.checked){
        generators.push(getSymbol)
    }

    if(generators.length === 0){
        return;
    }

    for(i = 0; i < passworldLength; i = i + generators.length){
        generators.forEach(() => {
            const randomValue = generators[Math.floor(Math.random() * generators.length)]();
            passworld += randomValue;
        });
    }

    passworld = passworld.slice(0, passworldLength);

    generatePassworldElement.style.display = "block";
    generatePassworldElement.querySelector("h4").innerText = passworld;
};


// Eventos
generatePassworldButton.addEventListener("click", () => {
    generatePassworld(
        getLetterLowerCase,
        getLetterUpperCase,
        getNumber,
        getSymbol
    );
});

openCloseGeneratorButton.addEventListener("click", () => {
    generatePassworldContainer.classList.toggle("hide");
});

copyPassworldButton.addEventListener("click", (e) => {
    e.preventDefault();

    const passworld = generatePassworldElement.querySelector("h4").innerText;

    navigator.clipboard.writeText(passworld).then(() => {
        copyPassworldButton.innerText = "Senha copiada com sucesso!"

        setTimeout(() => {
            copyPassworldButton.innerText = "Copiar"
        }, 1000);
    });
});