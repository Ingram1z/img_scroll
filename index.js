let imgList = [
  "./img/1.jpg",
  "./img/2.jpg",
  "./img/3.jpg",
  "./img/4.jpg",
  "./img/5.jpg",
]

const scrollContainer = document.querySelector(".scroll-container")

let currentIndex = 0
function chooseImg() {
  scrollContainer.innerHTML = ""
  const prevIndex = currentIndex - 1 < 0 ? imgList.length - 1 : currentIndex - 1
  const nextIndex = currentIndex + 1 > imgList.length - 1 ? 0 : currentIndex + 1
  setElement(prevIndex).classList.add("prev")
  setElement(currentIndex).classList.add("cur")
  setElement(nextIndex).classList.add("next")

  // console.log(prevIndex);
  // console.log(currentIndex);
  // console.log(nextIndex);
}

function setElement(index) {
  const imgUrl = imgList[index]
  const item = document.createElement("div")
  item.classList.add("item")
  item.innerHTML = `<img src=${imgUrl}>`
  scrollContainer.appendChild(item)
  return item
}

chooseImg()

let isTransitioning = false
scrollContainer.addEventListener("wheel", e => {
  if(isTransitioning) {
    return
  }
  if(!e.deltaY) {
    return
  }
  isTransitioning = true
  if(e.deltaY > 0) {
    currentIndex = currentIndex + 1 > imgList.length - 1 ? 0 : currentIndex + 1
    scrollContainer.classList.add("scroll-down")
  } else {
    currentIndex = currentIndex - 1 < 0 ? imgList.length - 1 : currentIndex - 1
    scrollContainer.classList.add("scroll-up")
  }
})

scrollContainer.addEventListener("transitionend", () => {
  isTransitioning = false
  scrollContainer.classList.remove("scroll-down", "scroll-up")
  chooseImg()
})
