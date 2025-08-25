document.addEventListener('DOMContentLoaded', function() {
    // Dark mode toggle
    const darkModeToggle = document.getElementById('darkmode-toggle');
    darkModeToggle.addEventListener('change', () => {
        document.documentElement.classList.toggle('dark-mode');
    });

    // Sync toggle with initial dark mode state
    if (document.documentElement.classList.contains('dark-mode')) {
        darkModeToggle.checked = true;
    }

    // Background music setup
    const bgMusic = document.getElementById('bg-music');
    let isPlaying = false;

    // Floating hearts container
    const floatingHeartsContainer = document.createElement('div');
    floatingHeartsContainer.classList.add('floating-hearts');
    document.body.appendChild(floatingHeartsContainer);

    // Cherry blossoms setup
    const cherryBlossoms = document.getElementById('cherry-blossoms');

    // Cards
    const mainCard = document.getElementById('main-card');
    const successCard = document.getElementById('success-card');
    const locationCard = document.getElementById('location-card');
    const datetimeCard = document.getElementById('datetime-card');
    const foodCard = document.getElementById('food-card');
    const drinksCard = document.getElementById('drinks-card');
    const noteCard = document.getElementById('note-card');
    const completionCard = document.getElementById('completion-card');

    // Buttons
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const chooseLocationBtn = document.getElementById('choose-location-btn');
    const confirmLocationBtn = document.getElementById('confirm-location-btn');
    const confirmDatetimeBtn = document.getElementById('confirm-datetime');
    const foodNextBtn = document.getElementById('food-next-btn');
    const confirmFoodBtn = document.getElementById('confirm-food-btn');
    const drinksNextBtn = document.getElementById('drinks-next-btn');
    const confirmDrinkBtn = document.getElementById('confirm-drink-btn');
    const completionNextBtn = document.getElementById('completion-next-btn');
    const saveNoteBtn = document.getElementById('save-note-btn');

    // User selections storage
    let userSelections = {
        location: '',
        datetime: [],
        food: [],
        drinks: [],
        note: ''
    };

    // Selections are not saved, user starts fresh each time.

    // Create cherry blossoms
    function createCherryBlossoms() {
        for (let i = 0; i < 20; i++) {
            const blossom = document.createElement('div');
            blossom.classList.add('blossom');
            blossom.style.left = Math.random() * 100 + 'vw';
            blossom.style.animationDuration = Math.random() * 3 + 2 + 's';
            blossom.style.opacity = Math.random();
            blossom.style.setProperty('--random-x', Math.random() * 2 - 1);
            blossom.style.setProperty('--random-r', Math.random() * 2 - 1);
            cherryBlossoms.appendChild(blossom);

            blossom.addEventListener('animationend', () => {
                blossom.remove();
                createCherryBlossom();
            });
        }
    }

    function createCherryBlossom() {
        const blossom = document.createElement('div');
        blossom.classList.add('blossom');
        blossom.style.left = Math.random() * 100 + 'vw';
        blossom.style.animationDuration = Math.random() * 3 + 2 + 's';
        blossom.style.opacity = Math.random();
        blossom.style.setProperty('--random-x', Math.random() * 2 - 1);
        blossom.style.setProperty('--random-r', Math.random() * 2 - 1);
        cherryBlossoms.appendChild(blossom);

        blossom.addEventListener('animationend', () => {
            blossom.remove();
            createCherryBlossom();
        });
    }

    // Initialize cherry blossoms
    createCherryBlossoms();

    // Create floating hearts
    function createFloatingHeart(x, y) {
        const heart = document.createElement('div');
        heart.classList.add('cursor-heart');
        heart.style.left = x + 'px';
        heart.style.top = y + 'px';
        heart.style.setProperty('--random-x', Math.random() * 2 - 1);
        floatingHeartsContainer.appendChild(heart);

        heart.addEventListener('animationend', () => {
            heart.remove();
        });
    }

    // Track mouse movement for floating hearts
    document.addEventListener('mousemove', (e) => {
        if (Math.random() < 0.1) {
            createFloatingHeart(e.clientX, e.clientY);
        }
    });

    // No button movement
    let moveDistance = 100;
    noBtn.addEventListener('mouseover', () => {
        const btnRect = noBtn.getBoundingClientRect();
        const maxX = window.innerWidth - btnRect.width;
        const maxY = window.innerHeight - btnRect.height;

        const randomX = Math.min(Math.max(0, btnRect.x + (Math.random() * 2 - 1) * moveDistance), maxX);
        const randomY = Math.min(Math.max(0, btnRect.y + (Math.random() * 2 - 1) * moveDistance), maxY);

        noBtn.style.position = 'fixed';
        noBtn.style.left = randomX + 'px';
        noBtn.style.top = randomY + 'px';
        moveDistance += 20;
    });

    // Yes button click handler
    yesBtn.addEventListener('click', () => {
        bgMusic.play();
        isPlaying = true;
        mainCard.classList.add('hidden');
        setTimeout(() => {
            successCard.classList.remove('hidden');
            createHeartCelebration(document.getElementById('celebration'));
        }, 500);
    });

    // Choose location button click handler
    chooseLocationBtn.addEventListener('click', () => {
        successCard.classList.add('hidden');
        setTimeout(() => {
            locationCard.classList.remove('hidden');
            createHeartCelebration(document.getElementById('location-celebration'));
        }, 500);
    });

    // Location tiles click handler
    const locationTiles = document.querySelectorAll('.tile-btn[data-location]');
    locationTiles.forEach(tile => {
        tile.addEventListener('click', () => {
            locationTiles.forEach(t => t.classList.remove('selected'));
            tile.classList.add('selected');
            userSelections.location = tile.dataset.location;
            document.getElementById('selected-location-message').classList.remove('hidden');
            confirmLocationBtn.style.display = 'inline-block';
        });
    });

    // Custom location button click handler
    const customLocationBtn = document.querySelector('[data-location="somewhere-else"]');
    customLocationBtn.addEventListener('click', () => {
        const customInput = prompt('Where would you like to go?');
        if (customInput) {
            locationTiles.forEach(t => t.classList.remove('selected'));
            customLocationBtn.classList.add('selected');
            userSelections.location = customInput;
            document.getElementById('selected-location-message').classList.remove('hidden');
            confirmLocationBtn.style.display = 'inline-block';
        }
    });

    // Confirm location button click handler
    confirmLocationBtn.addEventListener('click', () => {
        locationCard.classList.add('hidden');
        setTimeout(() => {
            datetimeCard.classList.remove('hidden');
            createHeartCelebration(document.getElementById('datetime-celebration'));
            initializeDateTimePickers();
        }, 500);
    });

    // Initialize Flatpickr date/time pickers
    function initializeDateTimePickers() {
        const dateTimeRow = document.querySelector('.datetime-row');
        const datePicker = dateTimeRow.querySelector('.date-picker');
        const timePicker = dateTimeRow.querySelector('.time-picker');

        flatpickr(datePicker, {
            minDate: "today",
            dateFormat: "Y-m-d",
        });

        flatpickr(timePicker, {
            enableTime: true,
            noCalendar: true,
            dateFormat: "H:i",
            minuteIncrement: 30
        });
    }

    // Add datetime button click handler
    const addDatetimeBtn = document.getElementById('add-datetime');
    addDatetimeBtn.addEventListener('click', () => {
        const templateRow = document.getElementById('datetime-row-template');
        const newRow = templateRow.cloneNode(true);
        newRow.removeAttribute('id');
        templateRow.parentNode.insertBefore(newRow, addDatetimeBtn);

        const datePicker = newRow.querySelector('.date-picker');
        const timePicker = newRow.querySelector('.time-picker');

        flatpickr(datePicker, {
            minDate: "today",
            dateFormat: "Y-m-d",
        });

        flatpickr(timePicker, {
            enableTime: true,
            noCalendar: true,
            dateFormat: "H:i",
            minuteIncrement: 30
        });

        const removeBtn = newRow.querySelector('.remove-datetime');
        removeBtn.addEventListener('click', () => {
            newRow.remove();
        });
    });

    // Confirm datetime button click handler
    confirmDatetimeBtn.addEventListener('click', () => {
        const dateTimeRows = document.querySelectorAll('.datetime-row');
        userSelections.datetime = [];

        dateTimeRows.forEach(row => {
            const date = row.querySelector('.date-picker').value;
            const time = row.querySelector('.time-picker').value;
            if (date && time) {
                userSelections.datetime.push({ date, time });
            }
        });

        if (userSelections.datetime.length > 0) {
            document.getElementById('selected-datetime-message').classList.remove('hidden');
            confirmDatetimeBtn.style.display = 'none';
        }
    });

    // Food next button click handler
    foodNextBtn.addEventListener('click', () => {
        datetimeCard.classList.add('hidden');
        setTimeout(() => {
            foodCard.classList.remove('hidden');
            createHeartCelebration(document.getElementById('food-celebration'));
        }, 500);
    });

    // Food tiles click handler
    const foodTiles = document.querySelectorAll('.tile-btn[data-food]');
    let selectedFoodCount = 0;

    foodTiles.forEach(tile => {
        tile.addEventListener('click', () => {
            const isSelected = tile.classList.contains('selected');
            const foodItem = tile.dataset.food;

            if (isSelected) {
                tile.classList.remove('selected');
                userSelections.food = userSelections.food.filter(item => item !== foodItem);
                selectedFoodCount--;
            } else {
                tile.classList.add('selected');
                userSelections.food.push(foodItem);
                selectedFoodCount++;
            }

            updateFoodSelectionStatus();
            document.getElementById('selected-food-message').classList.remove('hidden');
            confirmFoodBtn.style.display = 'inline-block';
        });
    });

    // Custom food button click handler
    const customFoodBtn = document.querySelector('[data-food="custom"]');
    customFoodBtn.addEventListener('click', () => {
        const customInput = prompt('What would you like to eat?');
        if (customInput) {
            customFoodBtn.classList.add('selected');
            userSelections.food.push(customInput);
            selectedFoodCount++;
            updateFoodSelectionStatus();
            document.getElementById('selected-food-message').classList.remove('hidden');
            confirmFoodBtn.style.display = 'inline-block';
        }
    });

    // Update food selection status
    function updateFoodSelectionStatus() {
        const statusElement = document.getElementById('food-selection-status');
        statusElement.textContent = selectedFoodCount === 0 ? 
            'Select your food preferences' : 
            `Selected ${selectedFoodCount} item${selectedFoodCount !== 1 ? 's' : ''}`;
        statusElement.classList.toggle('active', selectedFoodCount > 0);
    }

    // Confirm food button click handler
    confirmFoodBtn.addEventListener('click', () => {
        const selectedFoodMessage = document.getElementById('selected-food-message');
        const finalMessage = document.getElementById('final-message');
        const drinkNextBtn = document.getElementById('drinks-next-btn');

        selectedFoodMessage.classList.remove('hidden');
        finalMessage.classList.remove('hidden');
        finalMessage.classList.add('show');
        confirmFoodBtn.style.display = 'none';
        drinkNextBtn.style.display = 'inline-block';
    });

    // Drinks next button click handler
    drinksNextBtn.addEventListener('click', () => {
        foodCard.classList.add('hidden');
        setTimeout(() => {
            drinksCard.classList.remove('hidden');
            createHeartCelebration(document.getElementById('drinks-celebration'));
        }, 500);
    });

    // Drinks tiles click handler
    const drinkTiles = document.querySelectorAll('.tile-btn[data-drink]');
    let selectedDrinkCount = 0;

    drinkTiles.forEach(tile => {
        tile.addEventListener('click', () => {
            const isSelected = tile.classList.contains('selected');
            const drinkItem = tile.dataset.drink;

            if (isSelected) {
                tile.classList.remove('selected');
                userSelections.drinks = userSelections.drinks.filter(item => item !== drinkItem);
                selectedDrinkCount--;
            } else {
                tile.classList.add('selected');
                userSelections.drinks.push(drinkItem);
                selectedDrinkCount++;
            }

            updateDrinkSelectionStatus();
            document.getElementById('selected-drink-message').classList.remove('hidden');
            confirmDrinkBtn.style.display = 'inline-block';
        });
    });

    // Custom drink button click handler
    const customDrinkBtn = document.querySelector('[data-drink="custom"]');
    customDrinkBtn.addEventListener('click', () => {
        const customInput = prompt('What would you like to drink?');
        if (customInput) {
            customDrinkBtn.classList.add('selected');
            userSelections.drinks.push(customInput);
            selectedDrinkCount++;
            updateDrinkSelectionStatus();
            document.getElementById('selected-drink-message').classList.remove('hidden');
            confirmDrinkBtn.style.display = 'inline-block';
        }
    });

    // Update drink selection status
    function updateDrinkSelectionStatus() {
        const statusElement = document.getElementById('drink-selection-status');
        statusElement.textContent = selectedDrinkCount === 0 ? 
            'Select your drink preferences' : 
            `Selected ${selectedDrinkCount} item${selectedDrinkCount !== 1 ? 's' : ''}`;
        statusElement.classList.toggle('active', selectedDrinkCount > 0);
    }

    // Confirm drink button click handler
    confirmDrinkBtn.addEventListener('click', () => {
        const finalDrinkMessage = document.getElementById('final-drink-message');
        finalDrinkMessage.classList.remove('hidden');
        finalDrinkMessage.classList.add('show');
        confirmDrinkBtn.style.display = 'none';
    });

    // Completion next button click handler
    completionNextBtn.addEventListener('click', () => {
        drinksCard.classList.add('hidden');
        setTimeout(() => {
            noteCard.classList.remove('hidden');
            createHeartCelebration(document.getElementById('note-celebration'));
        }, 500);
    });

    // Note textarea character counter
    const noteTextarea = document.getElementById('note-textarea');
    const wordCounter = document.querySelector('.word-counter');

    if (noteTextarea && wordCounter) {
        noteTextarea.addEventListener('input', () => {
            const words = noteTextarea.value.trim().split(/\s+/).filter(word => word.length > 0);
            const wordCount = Math.min(words.length, 150);
            wordCounter.textContent = `${wordCount}/150 words`;
        });
    }

    const noteError = document.getElementById('note-error');

    // Save note button click handler
    saveNoteBtn.addEventListener('click', () => {
        userSelections.note = noteTextarea.value.trim();
        
        // Show loading state
        saveNoteBtn.disabled = true;
        saveNoteBtn.innerHTML = 'Sending...';
        noteError.style.display = 'none';

        // Gửi email qua API
        fetch('http://localhost:3000/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userSelections)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network error. Please check if the server is running.');
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                // On success, show completion card
                setTimeout(() => {
                    noteCard.classList.add('hidden');
                    completionCard.classList.remove('hidden');
                    completionCard.classList.add('show');
                    createHeartCelebration(document.getElementById('completion-hearts'));
                    document.getElementById('email-success').style.display = 'block';
                }, 500); // Delay for smooth transition
            } else {
                throw new Error(data.message || 'An unknown error occurred.');
            }
        })
        .catch(error => {
            console.error('Error sending email:', error);
            // Show error message
            noteError.textContent = `⚠️ ${error.message || "Could not send invitation. Please try again."}`;
            noteError.style.display = 'block';
            
            // Restore button state
            saveNoteBtn.disabled = false;
            saveNoteBtn.innerHTML = 'Continue ♥';
        });
    });

    // Email success element
    const emailSuccess = document.getElementById('email-success');

    // Create heart celebration effect
    function createHeartCelebration(container) {
        for (let i = 0; i < 15; i++) {
            const heart = document.createElement('div');
            heart.classList.add('heart');
            heart.style.left = Math.random() * 100 + '%';
            heart.style.animationDelay = Math.random() * 3 + 's';
            heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
            container.appendChild(heart);

            heart.addEventListener('animationend', () => {
                heart.remove();
            });
        }
    }

    // Toggle dark mode based on system preference
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    darkModeMediaQuery.addListener((e) => {
        document.documentElement.classList.toggle('dark-mode', e.matches);
        darkModeToggle.checked = e.matches;
    });
});
