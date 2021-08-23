const Pictures = {

  render: async () => {

    return `
    <div class="grid-container">
      <main class="grid-item main">
        <div class="items">
          <div class="item item1">
            <img src="./images/1.jpg">
          </div>
          <div class="item item2">
          <img src="./images/2.jpg" >
          </div>
          <div class="item item3">
          <img  src="./images/3.jpg" >
          </div>
          <div class="item item4">
          <img  src="./images/4.jpg" >
          </div>
          <div class="item item5">
            <img src="./images/5.jpg" >
          </div>
          <div class="item item6">
          <img src="./images/6.jpg" >
          </div>
          <div class="item item7">
          <img src="./images/7.jpg" >
          </div>
          <div class="item item8">
          <img src="./images/8.jpg" >
          </div>
          <div class="item item9">
          <img src="./images/9.jpg" >
          </div>
          <div class="item item10">
          <img src="./images/10.jpg" >
          </div>
        </div>
      </main>
      <footer class="grid-item footer">

      </footer>
    </div>

    <div id="picture-spot">
      <img id="full-image" src="#" />
    </div>
    `;

  },

  after_render: async () => {
    const newbtn = document.querySelector("#newbtn");
    newbtn.style.display = 'none';
    const slider = document.querySelector('.items');
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', (e) => {
      isDown = true;
      slider.classList.add('active');
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });
    slider.addEventListener('mouseleave', () => {
      isDown = false;
      slider.classList.remove('active');
    });
    slider.addEventListener('mouseup', () => {
      isDown = false;
      slider.classList.remove('active');
    });
    slider.addEventListener('mousemove', (e) => {
      if(!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 3; //scroll-fast
      slider.scrollLeft = scrollLeft - walk;
      console.log(walk);
    });


    const images = document.querySelectorAll('img');

    const chooseImg = function(node){
      document.querySelectorAll('img').forEach((item2, i) => {
        item2.classList.remove("chosen");
      });
      node.className = "chosen";
      var imgNode = document.querySelector("#full-image");
      console.log(node.src)
      imgNode.src = node.src;
    }

    chooseImg(images[0])


    images.forEach((item, i) => {
      item.onclick = function(){
        chooseImg(item)
      };
    });



  }
};
export default Pictures;
