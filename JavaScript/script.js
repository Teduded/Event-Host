const homeImage = document.getElementById("home-image")
const prevButton = document.getElementById("previous-picture")
const nextButton = document.getElementById("next-picture")
const getStartedButton = document.getElementById("getstarted")

const images = [
    "../images/home-picture1.jpg",
    "../images/home-picture2.jpg",
    "../images/home-picture3.jpg",
]

let currentIndex = 0

nextButton.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length
    homeImage.src = images[currentIndex]
})

prevButton.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length
    homeImage.src = images[currentIndex]
})

getStartedButton.onclick = function () {
    window.location.href = "getstarted.html"
}