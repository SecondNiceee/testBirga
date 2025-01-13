const animation = lottie.loadAnimation({
    container: document.getElementById('lottie-animation'), // контейнер для анимации
    renderer: 'svg', // тип рендерера (может быть 'svg', 'canvas' или 'html')
    loop: true, // зацикливание анимации
    autoplay: true, // автоматический запуск анимации
    path: './animation/sorry.json' // путь к вашему JSON-файлу с анимацией
  });

animation.play() 