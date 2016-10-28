var tasks=[
	{
		'taskQuestion':'Для приготовления обеда повару понадобилось 24 кг картошки, свеклы в 3 раза меньше, а лука в 2 раза меньше чем свеклы. Сколько килограмм лука потратил повар?',
		'answer':'4'
	}
];

var task_number=document.getElementById("task_number");
task_number.innerHTML="Задание № 1.";

var task_question=document.getElementById("task_question");
task_question.innerHTML=tasks[0].taskQuestion;