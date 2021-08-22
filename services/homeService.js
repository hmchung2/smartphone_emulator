

    function allowDrop(ev) {
        ev.preventDefault();
    }
    function getKeyByValue(object, value) {
      return Object.keys(object).find(key => object[key] === value);
    }

    function drag(ev) {
        ev.dataTransfer.setData("text", ev.target.id);
    }

    function setHomeData(k, v){
        let data = localStorage.getItem("homeData")
        data = JSON.parse(data)
        data[k] = v
        data = JSON.stringify(data)
        localStorage.setItem("homeData" , data)
    }

    function getHomeData(k){
      let data  = localStorage.getItem("homeData")
      data = JSON.parse(data)
      return data[k]
    }


    function drop(ev) {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");
        if(ev.target.className == 'appbox'){

            setHomeData(data , ev.target.id )
            ev.target.appendChild(document.getElementById(data));
        }else{
            originalApp  = ev.target.id;
            spotId = getHomeData(originalApp);
            document.getElementById(getHomeData(data)).appendChild(document.getElementById(originalApp));
            setHomeData(originalApp ,getHomeData(data) )
            document.getElementById(spotId).appendChild(document.getElementById(data));
            setHomeData(data , spotId )
        }
    }

    function locateURI(id){
      location.href="/#/" + id.toLowerCase()
    }
