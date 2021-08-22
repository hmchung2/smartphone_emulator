import AppInfo from '../AppConfig.js';

const Home = {

  /**
   * Render the page content.
   */

  render: async () => {


    const linksJson = AppInfo
    if(localStorage.getItem("homeData") == null){
      const links = Object.keys(linksJson)
      const linkValues = Object.values(linksJson)
      const navLinks = links
        .map(
            (link,i) =>
            `<div id="spot_${i}" class="appbox" ondrop="drop(event)" ondragover="allowDrop(event)">
              <div onclick="locateURI(this.id)" style="display: flex;justify-content: center;align-items: center; color:blue;"  id="${link}" class="app" draggable="true" ondragstart="drag(event)" >
                ${linkValues[i]}
              </div>
            </div>`
        )
        .join('\n');
        var emptySpace = ``;
        for (var i = links.length; i <= 53; i++) {
          emptySpace = emptySpace + `
            <div id="spot_${i}" class="appbox" ondrop="drop(event)" ondragover="allowDrop(event)">
            </div>
          `
        }
        var homeData = {}
        for(let i in links){
            homeData[links[i]]  =  "spot_" + i
        }
        localStorage.setItem("homeData" , JSON.stringify(homeData))

      return /*html*/ `
           ${navLinks}
           ${emptySpace}
          `;
    }else{
      let homedata = JSON.parse(localStorage.getItem("homeData"))
      let spots = Object.values(homedata).map( i => parseInt(i.split("_")[1]) )
      let apps = Object.keys(homedata)
      let spotApp = {}
      for(let i in spots){
        spotApp[spots[i]] = apps[i]
      }
      var emptySpace = ``;
        for (var i = 0; i <= 53; i++) {
          if(spots.includes(i) && Object.keys(linksJson).includes(spotApp[i]) ){

            emptySpace = emptySpace + `
              <div id="spot_${i}" class="appbox" ondrop="drop(event)" ondragover="allowDrop(event)">
              <div  onclick="locateURI(this.id)" style="display: flex;justify-content: center;align-items: center; color:blue;"  id="${spotApp[i]}" class="app" draggable="true" ondragstart="drag(event)" >
                ${linksJson[spotApp[i]]}
                </div>
              </div>
            `
          }else{
            emptySpace = emptySpace + `
              <div id="spot_${i}" class="appbox" ondrop="drop(event)" ondragover="allowDrop(event)">
              </div>
            `
          }
        }

        return /*html*/ `
             ${emptySpace}
            `;
    }

  },
  /**
   * All the code related to DOM interactions and controls go in here.
   * This is a separate call as these can be registered only after the DOM has been painted.
   */
  after_render: async () => {

    }
  };
export default Home;
