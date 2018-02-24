let countdown
const endTime = document.querySelector('.display__end-time')
const timerDisplay = document.querySelector('.display__time-left')
const buttons = document.querySelectorAll('[data-time]')
function timer(seconds) {
	clearInterval(countdown)
	now = Date.now();
	const then = now + seconds * 1000
	displayTimeLeft(seconds)
	endTimeLeft(then)

	countdown = setInterval(() => {
		const secondsLeft = Math.round((then - Date.now()) / 1000);
		if (secondsLeft <= 0 ) {
			clearInterval(countdown)
			return
		}
		displayTimeLeft(secondsLeft)
	},1000)
}

function displayTimeLeft(seconds) {
	const minutes = Math.floor(seconds / 60);
	const remainderSeconds = seconds % 60;
	const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`
	document.title = display
	timerDisplay.textContent = display
}

function endTimeLeft(timestamp) {
	const end = new Date(timestamp);
	const endHours = end.getHours();
	const endMinutes = end.getMinutes();
	const endTimeDisplay = `${endHours > 12 ? endHours - 12 : endHours}:${endMinutes < 10 ? '0' : ''}${endMinutes}`
	endTime.textContent = endTimeDisplay
}

buttons.forEach(button => button.addEventListener('click', startTimer))

function startTimer() {
	const seconds = parseInt(this.dataset.time)
	timer(seconds)
}

document.customForm.addEventListener('submit', function(e) {
	e.preventDefault();
	const mins = this.minutes.value;
	timer(mins * 60)
	this.reset();
})