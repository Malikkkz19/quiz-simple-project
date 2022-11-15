
const questions = [
	{
		question: "Какой язык работает в браузере?",
		answers: ["Java", "C", "Python", "JavaScript"],
		correct: 4,
	},
	{
		question: "Что означает CSS?",
		answers: [
			"Central Style Sheets",
			"Cascading Style Sheets",
			"Cascading Simple Sheets",
			"Cars SUVs Sailboats",
		],
		correct: 2,
	},
	{
		question: "Что означает HTML?",
		answers: [
			"Hypertext Markup Language",
			"Hypertext Markdown Language",
			"Hyperloop Machine Language",
			"Helicopters Terminals Motorboats Lamborginis",
		],
		correct: 1,
	},
	{
		question: "В каком году был создан JavaScript?",
		answers: ["1996", "1995", "1994", "все ответы неверные"],
		correct: 2,
	},
];


const headerContainer = document.querySelector('#header');
const listContainer = document.querySelector('#list');
const submitButton = document.querySelector('#submit');


// Переменные игры
let score = 0; //кол-во правильных ответов
let questionIndex = 0; //текущий вопрос

clearPage(); 
showQuestion();
submitButton.onclick = checkAnswer;

function clearPage() {
	headerContainer.innerHTML = '';
	listContainer.innerHTML = '';
	
}

function showQuestion() {
	console.log('showQuestion');
	// Вопрос 
	const headerTemplate = `<h2 class="title">%title%</h2>`;   
	const title = headerTemplate.replace('%title%', questions[questionIndex]['question']);
	
	headerContainer.innerHTML = title;
	// Варианты ответов
	let answerNumber = 1;
	for (const answerText of questions[questionIndex]['answers']) {
		console.log(answerNumber, answerText);
		const questionTemplate = 
			`<li>
				<label>
					<input type="radio" value="%number%" class="answer" name="answer" />
					<span>%answer%</span>
				</label> 
			</li>`;

	const answerHTML = questionTemplate
							.replace("%answer%", answerText)
							.replace("%number%", answerNumber);
	listContainer.innerHTML += answerHTML;
	answerNumber++;
} 

}
function checkAnswer() {
	const checkedRadio = listContainer.querySelector('input[type="radio"]:checked');
	console.log(checkedRadio);
	
	if (!checkedRadio){
		submitButton.blur();
		return;
	}

	console.log(checkedRadio.value);

	const userAnswer = parseInt(checkedRadio.value);
	
	const trueAnswer = questions[questionIndex]['correct'];
	
	if (userAnswer === trueAnswer){
		score += 1;
		
	}

	if (questionIndex !== questions.length - 1)  {
		 questionIndex++;
		 clearPage();
		 showQuestion();
		 return;
	} else {
		clearPage();
		showResults();
	}

}

function showResults() {
	const resultsTemplate = `
		<h2 class="title">%title%</h2>
		<h3 class="summary">%message%</h3> 
		<p class="result">%result%</p>
		`;

		let title, message;
		if (score === questions.length) {
			title = "Поздравляем!";
			message = "ВЫ ответили верно на все вопросы!";

		} else if ((score * 100) / questions.length >= 50){
			title = "Неплохо!";
			message = "Вы дали более половины правильных ответов!";
		} else {
			title = "Стоит постараться!";
			message = "Пока у вас меньше половины правильных ответов!";
		}

		// результаты
		let result = `${score} из ${questions.length}`;

		const finalMessage = resultsTemplate
					.replace('%title%', title)  
					.replace('%message%', message)
					.replace('%result', result);
		
	headerContainer.innerHTML = finalMessage;

	submitButton.blur();
	submitButton.innerText = 'Начать заново!';
	submitButton.onclick = () => history.go();
}


