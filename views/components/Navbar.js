import AppInfo from '../AppConfig.js';

const Navbar = {

  render: async () => {
    const currentLoc = location.href.split("/").pop();

    const apps = Object.keys(AppInfo)
    const lapps = apps.map(app => app.toLowerCase())
    if(lapps.includes(currentLoc)){
      console.log("ok")
      return /*html*/ `
        <p class="text-center">
        <button style="float:left;" onclick="location.href='/'">back</button>
        <em id="time"></em>
        <button style="float:right;" id="newbtn">new</button>
        </p>
      `;
    }else{
      return /*html*/ `
        <p class="text-center"><em id="time"></em></p>
      `;
    }
  },

  after_render: async () => {
    const time = document.querySelector('#time');
    const updateTime = () => {
      const newDate = new Date();
      var hh = newDate.getHours();
      var min = newDate.getMinutes();
      var ss = newDate.getSeconds();
      var mm = newDate.getMonth() + 1;
      var yy = newDate.getFullYear();
      time.innerHTML = `${yy}년 ${mm}월 ${hh}시 ${min}분 ${ss}초`;
    };

    updateTime();
    setInterval(updateTime, 1000);

  }
};

export default Navbar;
