class AjaxWeather {
    constructor() {
        this.apiKey = `86729c6bfba086b8bf603f7a0c00f822`;
    }

    async getWeather(city) {
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}&units=metric`;
        const weatherData = await fetch(url);
        return await weatherData.json();
    }
}

class Display {
    constructor() {
        this.cityName = document.getElementById('cityName');
        this.cityCountry = document.getElementById('cityCountry');
        this.cityIcon = document.getElementById('cityIcon');
        this.cityTemp = document.getElementById('cityTemp');
        this.cityHumidity = document.getElementById('cityHumidity');
    }

    showWeather(data) {
        const {
            name,
            sys: { country },
            main: { humidity, temp },
        } = data;

        const { icon } = data.weather[0];

        this.cityName.textContent = name;
        this.cityCountry.textContent = country;
        this.cityIcon.src = `http://openweathermap.org/img/w/${icon}.png`;
        this.cityTemp.textContent = temp;
        this.cityHumidity.textContent = humidity;
    }
}

(function () {
    const form = document.getElementById('wheatherForm');
    const cityInput = document.getElementById('cityInput');
    const feedback = document.querySelector('.feedback');
    const results = document.querySelector('.results');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const ajax = new AjaxWeather();
        const display = new Display();

        const city = cityInput.value;

        if (city.length === 0) {
            showFeedback('City Required!');
        } else {
            results.style.display = 'block';
            ajax.getWeather(city).then((data) => {
                if (data.message === 'city not found') {
                    showFeedback('City Not Found');
                    results.style.display = `none`;
                } else {
                    results.style.display = `block`;
                    display.showWeather(data);
                }
            });
        }
    });

    function showFeedback(message) {
        feedback.classList.add('showItem');
        feedback.textContent = `${message}`;
        setTimeout(() => {
            feedback.classList.remove('showItem');
        }, 3000);
    }
})();
