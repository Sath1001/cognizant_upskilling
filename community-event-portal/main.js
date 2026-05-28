console.log("Welcome to the Community Portal");

window.onload = () => {

    alert("Page Loaded Successfully");

    displayEvents();

    loadPreference();
};

/* Event Class */

class Event {

    constructor(id, name, category, seats, image) {

        this.id = id;
        this.name = name;
        this.category = category;
        this.seats = seats;
        this.image = image;
    }

    checkAvailability() {

        return this.seats > 0;
    }
}

/* Event Array */

const events = [

    new Event(
        1,
        "Music Festival",
        "Music",
        50,
        "images/event1.jpg"
    ),

    new Event(
        2,
        "Food Carnival",
        "Food",
        30,
        "images/event2.jpg"
    ),

    new Event(
        3,
        "Tech Workshop",
        "Technology",
        0,
        "images/event3.jpg"
    )
];

/* Display Events */

function displayEvents(eventList = events) {

    const container =
        document.querySelector("#eventContainer");

    container.innerHTML = "";

    eventList.forEach(event => {

        const card =
            document.createElement("div");

        card.classList.add(
            "col-md-4",
            "mb-4"
        );

        card.innerHTML = `

            <div class="card shadow h-100">

                <img src="${event.image}"
                     class="card-img-top">

                <div class="card-body">

                    <h5>${event.name}</h5>

                    <p>
                        Category:
                        ${event.category}
                    </p>

                    <p>
                        Seats:
                        ${event.seats}
                    </p>

                    <button class="btn btn-primary"
                            onclick="registerUser(${event.id})">

                        Register

                    </button>

                </div>

            </div>
        `;

        container.appendChild(card);
    });
}

/* Register */

function registerUser(id) {

    try {

        const event =
            events.find(
                e => e.id === id
            );

        if (!event.checkAvailability()) {

            throw new Error(
                "No Seats Available"
            );
        }

        event.seats--;

        displayEvents();

        alert(
            `Registered for ${event.name}`
        );
    }

    catch(error) {

        alert(error.message);
    }
}

/* Filter */

document
.querySelector("#categoryFilter")

.onchange = function() {

    const selected = this.value;

    if (selected === "all") {

        displayEvents(events);

        return;
    }

    const filtered =
        events.filter(

            event =>
            event.category === selected
        );

    displayEvents(filtered);
};

/* Search */

document
.querySelector("#searchInput")

.addEventListener(
    "keyup",

    function() {

        const value =
            this.value.toLowerCase();

        const filtered =
            events.filter(event =>

                event.name
                .toLowerCase()
                .includes(value)
            );

        displayEvents(filtered);
    }
);

/* Character Counter */

document
.querySelector("#message")

.addEventListener(
    "keyup",

    function() {

        document
        .querySelector("#charCount")
        .innerText =
            this.value.length;
    }
);

/* Form */

document
.querySelector("#registrationForm")

.addEventListener(
    "submit",

    function(event) {

        event.preventDefault();

        const phone =
            document
            .querySelector("#phone")
            .value;

        if (phone.length !== 10) {

            alert(
                "Phone Number must be 10 digits"
            );

            return;
        }

        document
        .querySelector("#formOutput")
        .innerHTML =
            "Registration Successful";

        savePreference();

        const modal =
            new bootstrap.Modal(
                document.getElementById("eventModal")
            );

        modal.show();
    }
);

/* Save Preference */

function savePreference() {

    const selected =
        document
        .querySelector("#eventSelect")
        .value;

    localStorage.setItem(
        "preferredEvent",
        selected
    );
}

/* Load Preference */

function loadPreference() {

    const saved =
        localStorage.getItem(
            "preferredEvent"
        );

    if (saved) {

        document
        .querySelector("#eventSelect")
        .value = saved;
    }
}

/* Video */

function videoReady() {

    document
    .querySelector("#videoMessage")
    .innerHTML =
        "Video Ready to Play";
}

/* Warning */

function warningMessage() {

    return "Form not completed";
}

/* Image Enlarge */

function enlargeImage(img) {

    img.style.width = "120%";
}

/* Geolocation */

function findLocation() {

    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(

            function(position) {

                document
                .querySelector("#locationResult")
                .innerHTML =

                    `
                    Latitude:
                    ${position.coords.latitude}

                    <br>

                    Longitude:
                    ${position.coords.longitude}
                    `;
            },

            function(error) {

                alert(
                    "Location access denied"
                );
            },

            {
                enableHighAccuracy: true,
                timeout: 5000
            }
        );
    }
}

/* jQuery */

$(document).ready(function(){

    $(".card").hide().fadeIn(2000);

});