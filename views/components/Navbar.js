import AppInfo from '../AppConfig.js';

const Navbar = {

  render: async () => {
    const currentLoc = location.href.split("/").pop();

    const apps = Object.keys(AppInfo)
    const lapps = apps.map(app => app.toLowerCase())
    if(lapps.includes(currentLoc)){
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
    let morningDay = "오전";
    const updateTime = () => {
      const newDate = new Date();
      var hh = newDate.getHours();
      var min = newDate.getMinutes();
      var ss = newDate.getSeconds();
      var mm = newDate.getMonth() + 1;
      var yy = newDate.getFullYear();

      let alarmValues = localStorage.getItem("alarmData");
      if(alarmValues != null){
        let jsonAlarm = JSON.parse(alarmValues);
        let alarmKeys = Object.keys(jsonAlarm);
        alarmValues = Object.values(jsonAlarm);
        let currentTime = hh.toString()+"-"+min.toString()
        if(alarmValues.includes( currentTime ) ){
          alert("알람 시간이 되었습니다.~~~~")
          for(let i in alarmKeys){
            if(jsonAlarm[alarmKeys[i]] == currentTime ){
              delete jsonAlarm[alarmKeys[i]]
            }
            localStorage.setItem("alarmData" , JSON.stringify(jsonAlarm) )
          }
        }
      }

      if(hh > 12){
        hh = hh - 12;
        morningDay = "오후"
      }

      time.innerHTML = `${yy}년 ${mm}월 ${morningDay} ${hh}시 ${min}분 ${ss}초`;
    };

    updateTime();
    setInterval(updateTime, 1000);

  }
};

export default Navbar;
