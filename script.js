// klasa Stopwatch

class Stopwatch {
    constructor(display) {
        this.running = false;
        this.display = display;
        this.reset();
        this.print();
    }
// metoda reset    
    reset() {
        this.times = {
            minutes: 0,
            seconds: 0,
            miliseconds: 0
        };
    }
// metoda print
    print() {
        this.display.innerText = this.format(this.times);
	}
// metoda format - przygotowywuje tekst do wyświetlenia 
	format(times) {
        return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
	}

// implementacja funkcji start
	start() {
	    if (!this.running) {
	        this.running = true;
	        this.watch = setInterval(() => {
	        	this.step();
	        }, 10);
	        this.displayTime = setInterval(() => this.print(), 10);
	        stopButton.innerHTML = 'Stop';
	    }
	}
// metoda step - sprawdza czy timer jest uruchomiony
	step() {
	    if (!this.running) return;
	    this.calculate();
	}
// metoda calculate - przelicza min, sek i milisek
	calculate() {
	    this.times.miliseconds += 1;
	    if (this.times.miliseconds >= 100) {
	        this.times.seconds += 1;
	        this.times.miliseconds = 0;
	    }
	    if (this.times.seconds >= 60) {
	        this.times.minutes += 1;
	        this.times.seconds = 0;
	    }
	}
// metoda stop - zatrzymanie timera
	stop() {
		if(this.running) {
			this.running = false;
	    	clearInterval(this.watch);
	    	stopButton.innerHTML = 'Reset';
// zatrzymanie stopera i kliknięcie resetuje stoper	    	
	    } else {
	    	this.reset();
	    	this.print();
	    }	
	}
// dodanie czasu okrążenia	
	encirclement() {
		if(this.running) {
            addEncirclementTimeToList(this.format(this.times), resultList);
            clearInterval(this.displayTime);
            
// wyświetlenie czasu okrążenia 
            setTimeout(() => {  
                this.displayTime = setInterval(() => {
                    this.print();
                }, 10);
            }, ENCIRCLEMENT_TIME_DISPLAY_INTERVAL);
        }
        else return;
	}
}

const ENCIRCLEMENT_TIME_DISPLAY_INTERVAL = 300;

const stopwatch = new Stopwatch(document.querySelector('.stopwatch'));

const resultList = document.querySelector('.results');

// metody przycisków

let startButton = document.getElementById('start');
startButton.addEventListener('click', () => stopwatch.start());

let stopButton = document.getElementById('stop');
stopButton.addEventListener('click', () => stopwatch.stop());

let encirclementButton = document.getElementById('encirclement');
encirclementButton.addEventListener('click', () => stopwatch.encirclement());

let clearResultsListButton = document.getElementById('clear');
clearResultsListButton.addEventListener('click', () => clearResultsList(resultList));

// implementacja funkcji pad0 - dodającej zero do liczbjednocyfrowych
function pad0(value) {
    let result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}

function addEncirclementTimeToList(value, resultList) {
    let element = document.createElement('li');
    element.innerText = value;
    resultList.appendChild(element);
}

function clearResultsList(resultList) {
    resultList.innerHTML = '';
}