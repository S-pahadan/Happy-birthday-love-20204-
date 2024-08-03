document.addEventListener('DOMContentLoaded', function() {
    let content = document.getElementById('content');

    function createButton(text, id, callback) {
        let button = document.createElement('button');
        button.innerText = text;
        button.id = id;
        button.addEventListener('click', callback);
        content.appendChild(button);
    }

    function showSpecialMessage() {
        let specialMessage = document.createElement('div');
        specialMessage.id = 'specialMessage';
    
        let header = document.createElement('h1');
        header.innerHTML = "<br><br><br><br><br><br><br><br><br><br><br><br><br>Happy Birthday<br>My Love"; 
    
        let paragraph = document.createElement('p');
        paragraph.innerText = "My love Suha, This is Your day. Everynight, your voice echoes in my sleep. Where I yearn for your touch and I am sure of not missing this next year"
        specialMessage.appendChild(header);
        specialMessage.appendChild(paragraph);
    
        document.getElementById('content').appendChild(specialMessage);
    
        fadeIn(specialMessage);
    }
    
    
    function fadeIn(element) {
        element.style.opacity = 0;
        element.style.display = 'block';
        let opacity = 0;
        let timer = setInterval(() => {
            if (opacity >= 1) {
                clearInterval(timer);
            }
            element.style.opacity = opacity;
            opacity += 0.1;
        }, 200);
    }
    

    createButton('Start', 'startButton', function() {
        document.body.style.backgroundColor = 'peachpuff';
        this.style.display = 'none';

        let bulb = document.createElement('img');
        bulb.src = 'bulb.png'; 
        bulb.id = 'bulb';
        document.body.appendChild(bulb);

        createButton('Decorate', 'hangerButton', function() {
            this.style.display = 'none';

            let birthdayHanger = document.createElement('img');
            birthdayHanger.src = 'banner.png'; 
            birthdayHanger.id = 'birthdayHanger';
            birthdayHanger.style.display = 'block';
            document.body.appendChild(birthdayHanger);

            animateHanger();

            createButton('Cake', 'cakeButton', function() {
                this.style.display = 'none';

                let cake = document.createElement('img');
                cake.src = 'cake.png'; 
                cake.id = 'cake';
                cake.style.display = 'none';
                cake.style.position = 'absolute';
                cake.style.top = '50%';
                cake.style.left = '50%';
                cake.style.transform = 'translate(-50%, -50%)';
                document.body.appendChild(cake);

                fadeIn(cake);

                createButton('Message', 'specialMessageButton', function() {
                    this.style.display = 'none';
                    showSpecialMessage();
                });

                createCircles();
            });
        });
    });

    function animateHanger() {
        let hanger = document.getElementById('birthdayHanger');
        hanger.style.top = '-200px';

        let animation = hanger.animate([
            { top: '-200px' },
            { top: '20px' }
        ], {
            duration: 2000,
            fill: 'forwards',
            easing: 'ease-in-out'
        });

        animation.onfinish = function() {
            hanger.style.top = '20px';
        };
    }

    function createCircles() {
        const colors = ['blue', 'green', 'pink', 'purple', 'orange', 'red', 'teal'];
        const circleCount = 20;

        for (let i = 0; i < circleCount; i++) {
            let circle = document.createElement('div');
            let randomColor = colors[Math.floor(Math.random() * colors.length)];
            circle.classList.add('circle', randomColor);

            let leftPosition = Math.random() * window.innerWidth + 'px';
            let topPosition = Math.random() * window.innerHeight + 'px';
            circle.style.left = leftPosition;
            circle.style.top = topPosition;

            document.body.appendChild(circle);

            animateCircle(circle);
        }
    }

    function animateCircle(circle) {
        let cake = document.getElementById('cake');
        let birthdayHanger = document.getElementById('birthdayHanger');

        let directionX = Math.random() < 0.5 ? 1 : -1;
        let directionY = Math.random() < 0.5 ? 1 : -1;
        let distanceX = Math.random() * 10 + 5;
        let distanceY = Math.random() * 10 + 5;
        let duration = Math.random() * 10 + 5;

        circle.animate([
            { transform: `translate(${directionX * distanceX}px, ${directionY * distanceY}px)` },
            { transform: `translate(${directionX * -distanceX}px, ${directionY * -distanceY}px)` }
        ], {
            duration: duration * 1000,
            iterations: Infinity,
            direction: 'alternate',
            easing: 'ease-in-out'
        });

        setInterval(function() {
            let circleRect = circle.getBoundingClientRect();
            let cakeRect = cake.getBoundingClientRect();
            let hangerRect = birthdayHanger.getBoundingClientRect();

            if (isColliding(circleRect, cakeRect) || isColliding(circleRect, hangerRect)) {
                circle.style.zIndex = -1;
            } else {
                circle.style.zIndex = 1;
            }
        }, 100);
    }

    function isColliding(rect1, rect2) {
        return !(rect1.right < rect2.left ||
                 rect1.left > rect2.right ||
                 rect1.bottom < rect2.top ||
                 rect1.top > rect2.bottom);
    }
});
