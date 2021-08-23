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
          minutes = minutes + `<option value="${i*10}" selected">${i*10}분</selected>`
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
    let seqAlarm = localStorage.getItem("alarmData_seq");
    if(seqAlarm == null){
      localStorage.setItem("alarmData_seq", "0");
    }


    let data = localStorage.getItem("alarmData");
    var alarmList = null;
    if(data == null){
      alarmList =  `<table id= "alarm-list">
                      <tbody>
                      <tr>
                      </tr>
                      <tbody>
                    </table>
                    `;
    }else{
        data = JSON.parse(data);
        const alarmId = Object.keys(data)
        //const alarmValues = Object.values(data)

        alarmList = `<table>
            <tbody id="alarm-list">
        `;
        for(let id in alarmId){
          var alarmValue = data[alarmId[id]];
          var alarmHour = parseInt(alarmValue.split("-")[0]);
          var alarmMD = "오전";
          var alarmMin = parseInt(alarmValue.split("-")[1]);
          if(alarmHour > 12 ){
            alarmMD = "오후"
            alarmHour  = alarmHour - 12;
          }
          alarmList = alarmList +   `
            <tr>
              <td class="alarmtime">
              ${alarmMD} ${alarmHour}시 ${alarmMin}분
                <button id="id_${alarmId[id]}" class="deleteBtn">삭제</button>
              </td>
            </tr>
            `
        }
        alarmList = alarmList + `</tbody></table>`

    }
    return /*html*/ `
      <section>
        ${saving}
        <hr style="border-top: 2px solid #8c8b8b;">
        ${alarmList}
      </section>
    `;

  },


  after_render: async () => {

    const getSeqNextVal = function(){
      let seqVal = parseInt(localStorage.getItem("alarmData_seq")) + 1;
      localStorage.setItem("alarmData_seq",  seqVal.toString() )
      return seqVal.toString();
    }

    const saveBtn = document.querySelector("#saveAlarm");
    var morningDay = document.querySelector("#morningday");
    var hour = document.querySelector("#hours");
    var min = document.querySelector("#minutes");

    const setAlarmData= function(v){
      let data = localStorage.getItem("alarmData")
      let new_index = getSeqNextVal();
      if(data == null){
        data = {new_index : v }
      }else{
        data = JSON.parse(data);
        data[new_index] = v;
      }
      data = JSON.stringify(data)
      localStorage.setItem("alarmData"  , data)
      return new_index;
    }

    const deleteAlarm = function(id){
      let deleteElement = document.querySelector("#"+id)
      let data = localStorage.getItem("alarmData")
      if(data != null){
        data = JSON.parse(data)
        if(Object.keys(data).includes(id.split("_")[1])){
            delete data[id.split("_")[1]]
        }
        data = JSON.stringify(data)
        localStorage.setItem("alarmData" ,data)
      }
      //document.querySelector("#alarmList"),
      console.log(deleteElement.parentNode.parentNode)
      var row = deleteElement.parentNode.parentNode;
      document.querySelector("#alarm-list").removeChild(row);
    }

    let deleteTags = document.querySelectorAll(".deleteBtn");
    deleteTags.forEach((item, i) => {
      item.onclick = function(){

        console.log("delete : "+  item.id)
        deleteAlarm(item.id)
      }
    });
    saveBtn.onclick = function(){
      let miliHour = parseInt(hour.value);
      let savingMin = parseInt(min.value);
      let morningDayOutput = "오후";
      if(morningDay.value == "day"){
        miliHour = miliHour + 12;
        morningDayOutput = "오전";
      }
      let new_index = setAlarmData(miliHour+"-"+ savingMin)
      var newtr = document.createElement("tr")
      var newtd = document.createElement("td")
      var newBtn = document.createElement("button")
      newtd.className = "alarmtime";
      newtd.innerHTML = morningDayOutput + " " + hour.value + "시 " + min.value + "분"
      newBtn.className = "deleteBtn";
      newBtn.id = "id_" + new_index;
      newBtn.innerHTML = "삭제";
      newBtn.onclick = function(){
        deleteAlarm(this.id);
      }
      newtd.appendChild(newBtn)
      newtr.appendChild(newtd)
      document.querySelector("#alarm-list").appendChild(newtr);
    }
  }
};
export default About;
