// Función para obtener preguntas de la API
async function obtenerTrivia(categoria, dificultad, tipo) {
    const url = `https://opentdb.com/api.php?amount=10&category=${categoria}&difficulty=${dificultad}&type=${tipo}`;
    
    try {
      const respuesta = await fetch(url);
      const datos = await respuesta.json();
      return datos.results;
    } catch (error) {
      console.error('Error al obtener las preguntas:', error);
      return [];
    }
  }
  
  // Función para mostrar las preguntas y respuestas en el HTML
  function mostrarTrivia(preguntas) {
    const triviaContainer = document.getElementById('triviaContainer');
    triviaContainer.innerHTML = ''; // Limpiar contenido previo
    
    preguntas.forEach((pregunta, indice) => {
      const preguntaHTML = document.createElement('h3');
      preguntaHTML.textContent = `Pregunta ${indice + 1}: ${pregunta.question}`;
      triviaContainer.appendChild(preguntaHTML);
      
      const respuestasHTML = document.createElement('ul');
      pregunta.incorrect_answers.forEach(respuesta => {
        const opcionHTML = document.createElement('li');
        opcionHTML.innerHTML = `<input type="radio" name="pregunta${indice}" value="${respuesta}"> ${respuesta}`;
        respuestasHTML.appendChild(opcionHTML);
      });
      
      const opcionCorrectaHTML = document.createElement('li');
      opcionCorrectaHTML.innerHTML = `<input type="radio" name="pregunta${indice}" value="${pregunta.correct_answer}"> ${pregunta.correct_answer}`;
      respuestasHTML.appendChild(opcionCorrectaHTML);
      
      triviaContainer.appendChild(respuestasHTML);
    });
  }
  
  // Función para calcular el puntaje final
  function calcularPuntaje() {
    const preguntas = document.querySelectorAll('[name^="pregunta"]');
    let puntaje = 0;
    
    preguntas.forEach(pregunta => {
      const respuestaSeleccionada = pregunta.querySelector(':checked');
      if (respuestaSeleccionada && respuestaSeleccionada.value === pregunta.value) {
        puntaje += 100;
      }
    });
    
    return puntaje;
  }
  
  // Función para generar una nueva trivia
  function nuevaTrivia() {
    document.getElementById('triviaForm').style.display = 'block';
    document.getElementById('triviaContainer').innerHTML = '';
    document.getElementById('score').textContent = '0';
    document.getElementById('newTriviaBtn').style.display = 'none';
  }
  
  // Evento de envío del formulario
  document.getElementById('triviaForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const categoria = document.getElementById('category').value;
    const dificultad = document.getElementById('difficulty').value;
    const tipo = document.getElementById('type').value;
    
    const preguntas = await obtenerTrivia(categoria, dificultad, tipo);
    mostrarTrivia(preguntas);
    
    document.getElementById('triviaForm').style.display = 'none';
    document.getElementById('newTriviaBtn').style.display = 'block';
  });
  
  // Evento del botón de nueva trivia
  document.getElementById('newTriviaBtn').addEventListener('click', nuevaTrivia);
