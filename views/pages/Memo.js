const About = {
  /**
   * Render the page content.
   */
  render: async () => {
      let data = localStorage.getItem("memoData")
      const memoModal = `<button hidden="true" id="myBtn">Open Modal</button>
                      		<div id="myModal" class="modal">
                      			<!-- Modal content -->
                      			<div class="modal-content">
                      				<span class="close">&times;</span> <input id="new_memo_box"
                      					type="text" placeholder="메시지 작성" />
                      			</div>
                      		</div>`;
      var memoList= null;
      if(data == null){
        memoList = `<table id= "memo-list">
                        <tbody>
                        <tr>
                        </tr>
                        <tbody>
                      </table>
                      `;                      

      }else{
        data = JSON.parse(data);
        const memoId = Object.keys(data)
        const memoValues = Object.values(data)
        memoList =`<table id="memo-list">
            <tbody>
            <tr hidden>
              <td class="limit-line">샘플 메시지 샘플 </td>
            </tr>
        ` +
        memoValues
          .map(
            (memo , i) =>
              `
              <tr>
                <td id="memo_${i}" class="limit-line">
                  ${memo}
                </td>
              </tr>
              `
          ).join('\n') + `</tbody></table>`;
      }
    return `<section>
      ${memoModal}
      ${memoList}
    </section>`;
  },
  /**
   * All the code related to DOM interactions and controls go in here.
   * This is a separate call as these can be registered only after the DOM has been painted.
   */
  after_render: async () => {
    let currentMemo = null;
    var modal = document.getElementById("myModal");
    var btn = document.getElementById("myBtn");
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];
    const memo_box = document.querySelector("#new_memo_box");

    let liTags = document.querySelectorAll(".limit-line")
    console.log(liTags)
    btn.onclick = function() {
      modal.style.display = "block";
    }
    span.onclick = function() {
      memo_box.value ="";
      modal.style.display = "none";
    }
    const save = function(e) {
      var key = 'which' in e ? e.which : e.keyCode;
      if (key == 13) {
        span.click();
      }
    }
    const setMemoData= function(v){
      let data = localStorage.getItem("memoData")
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
      localStorage.setItem("memoData"  , data)
      return new_index;
    }

    const newbtn = document.querySelector("#newbtn")
    newbtn.onclick = function() {
      btn.click();
    }

    const disableLimit = function(id){
      if(id != currentMemo){
        let currentElement =  document.querySelector("#" + id );
        currentElement.className = "unlimit-line"
        if(currentMemo != null){
          document.querySelector("#" + currentMemo).className = "limit-line";
        }
        currentMemo = id;
      }
    }
    liTags.forEach((item, i) => {
      item.onclick = function(){
          disableLimit(item.id)
      }
    });
    const insertAt = (str, sub, pos) => `${str.slice(0, pos)}${sub}${str.slice(pos)}`;

    const checkSpace = function(text){
      var textlen = text.length
      var cnt = 1;
      while(cnt * 64 < text.length ){
        text = insertAt(text ,  "\n" , (cnt * 64) + (cnt * 2) )
        cnt++
      }
      return text
    }

    memo_box.onkeyup = function(e){
      var key = 'which' in e ? e.which : e.keyCode;
      if (key == 13) {
        let new_index = setMemoData(checkSpace(memo_box.value));
        var newtr = document.createElement("tr");
        var newtd = document.createElement("td");
        newtd.className = 'limit-line';
        newtd.id = "memo_" + new_index;
        newtd.onclick = function(){
            disableLimit(newtd.id)
        };
        newtd.innerHTML = checkSpace(memo_box.value);
        newtr.appendChild(newtd)
        memo_box.value = ""
        span.click();
        document.querySelector("#memo-list").appendChild(newtr)
      }
    }
  }
};
export default About;
