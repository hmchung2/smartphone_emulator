const About = {
  /**
   * Render the page content.
   */
  render: async () => {
    let hours = `<select id="hours">`;
    for(let i = 1 ;  i <= 24; i++  ){
      if(i == 12){
        hours  = hours + `<option value="${i}" selected>${i}시 </selected> `
      }else{
        hours  = hours + `<option value="${i}">${i}시 </selected> `
      }
    }
    hours = hours + `</select>`
    let minutes = `<select id='minutes'>`;
    for(let i = 0 ; i < 6 ; i++){
      if(i == 0){
          minutes = minutes + `<option value="${i*10} selected">${i*10}분</selected>`
      }else{
          minutes = minutes + `<option value="${i*10}">${i*10}분</selected>`
      }
    }
    minutes = minutes + `</select>`
    const saving = `
        <div>
          <select id="morningday">
            <option value="morning" selected>오전</option>
            <option value="day">오후</option>
          </select>
          ${hours}
          ${minutes}
          <button id="saveAlarm" style="float:right;">저장</buttom>
        </div>
    `;
    return /*html*/ `
      <section>
        ${saving}
      </section>
    `;



  },
  /**
   * All the code related to DOM interactions and controls go in here.
   * This is a separate call as these can be registered only after the DOM has been painted.
   */
  after_render: async () => {
    const saveBtn = document.querySelector("#saveAlarm");
    var morningDay = document.querySelector("#morningday");
    var hour = document.querySelector("#hours");
    var min = document.querySelector("#minutes");

    const setAlarmData= function(v){
      let data = localStorage.getItem("alarmData")
      let new_index = 0;
      if(data == null){
        data = {0 : v }
      }else{
        data = JSON.parse(data);
        let last_index = parseInt(Object.keys(data).pop() ) ;
        new_index = last_index + 1;
        data[new_index] = v;
      }
      data = JSON.stringify(data)
      localStorage.setItem("alarmData"  , data)
      return new_index;
    }

    saveBtn.onclick = function(){
      let miliHour = parseInt(hour.value);
      let savingMin = parseInt(min.value);
      if(morningDay.value == "day"){
        miliHour = miliHour + 12;
      }
      let index = setAlarmData(miliHour+"-"+ savingMin )
      console.log(index)
    }
  }
};
export default About;
