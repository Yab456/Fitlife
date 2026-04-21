// CADASTRO
function register(){
  let user = document.getElementById("user").value;
  let pass = document.getElementById("pass").value;

  if(!user || !pass){
    mostrarMensagem("Preencha os campos!");
    return;
  }

  localStorage.setItem("user", user);
  localStorage.setItem("pass", pass);

  mostrarMensagem("Usuário cadastrado!");
}

// LOGIN
function login(){
  let user = document.getElementById("user").value;
  let pass = document.getElementById("pass").value;

  let savedUser = localStorage.getItem("user");
  let savedPass = localStorage.getItem("pass");

  if(user === savedUser && pass === savedPass){
    localStorage.setItem("logado", "true");
    window.location.href = "app.html";
  } else {
    mostrarMensagem("Usuário ou senha incorretos!");
  }
}

// PROTEÇÃO DO APP
if(window.location.pathname.includes("app.html")){
  if(localStorage.getItem("logado") !== "true"){
    window.location.href = "index.html";
  }
}

// LOGOUT
function logout(){
  localStorage.removeItem("logado");
  window.location.href = "index.html";
}

// TREINOS
function salvarTreino(){
  let treino = document.getElementById("treino").value;

  let lista = JSON.parse(localStorage.getItem("treinos")) || [];
  lista.push(treino);

  localStorage.setItem("treinos", JSON.stringify(lista));

  mostrarTreinos();
}

function mostrarTreinos(){
  let lista = JSON.parse(localStorage.getItem("treinos")) || [];
  let ul = document.getElementById("lista");

  if(!ul) return;

  ul.innerHTML = "";

  lista.forEach(t => {
    let li = document.createElement("li");
    li.innerText = t;
    ul.appendChild(li);
  });
}

// IMC
function calcularIMC(){
  let peso = parseFloat(document.getElementById("peso").value);
  let altura = parseFloat(document.getElementById("altura").value);

  if(!peso || !altura){
    document.getElementById("resultadoIMC").innerText = "Preencha os campos corretamente!";
    return;
  }

  let imc = peso / (altura * altura);
  let classificacao = "";
  let recomendacao = "";

  // CLASSIFICAÇÃO + RECOMENDAÇÕES
  if(imc < 18.5){
    classificacao = "Abaixo do peso";
    recomendacao = "• Aumentar ingestão calórica com alimentos saudáveis (arroz, proteínas, frutas)\n" +
                   "• Treino de força (musculação leve a moderada 3x/semana)\n" +
                   "• Evitar excesso de cardio\n" +
                   "• Dormir bem para recuperação muscular";

  } else if(imc < 25){
    classificacao = "Peso ideal";
    recomendacao = "• Manter rotina de exercícios (3 a 5x por semana)\n" +
                   "• Combinar cardio (corrida/caminhada) + musculação\n" +
                   "• Alimentação equilibrada\n" +
                   "• Manter hidratação";

  } else if(imc < 30){
    classificacao = "Sobrepeso";
    recomendacao = "• Fazer cardio regularmente (30 min, 4 a 5x por semana)\n" +
                   "• Incluir treinos de força (3x por semana)\n" +
                   "• Reduzir açúcar e alimentos ultraprocessados\n" +
                   "• Criar rotina de sono adequada";

  } else if(imc < 35){
    classificacao = "Obesidade grau 1";
    recomendacao = "• Caminhada leve diária (20–30 min)\n" +
                   "• Exercícios de baixo impacto (bicicleta, elíptico)\n" +
                   "• Acompanhamento nutricional recomendado\n" +
                   "• Evitar treinos intensos no início";

  } else if(imc < 40){
    classificacao = "Obesidade grau 2";
    recomendacao = "• Atividades leves (caminhada, hidroginástica)\n" +
                   "• Treinos supervisionados\n" +
                   "• Mudança alimentar gradual\n" +
                   "• Procurar orientação profissional";

  } else {
    classificacao = "Obesidade grau 3";
    recomendacao = "• Procurar acompanhamento médico\n" +
                   "• Atividades leves e controladas\n" +
                   "• Foco em reeducação alimentar\n" +
                   "• Evitar exercícios intensos sem supervisão";
  }

  // MOSTRAR RESULTADO
  document.getElementById("resultadoIMC").innerText =
    "IMC: " + imc.toFixed(2) + " - " + classificacao;

  document.getElementById("recomendacao").innerText = recomendacao;
}
// INICIAR
mostrarTreinos();