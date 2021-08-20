const Home = {
  /**
   * Render the page content.
   */
  render: async () => {
    const linksJson = {'Alarm' : '알람',
                      'Memo'  : '메모',
                      'Pictures' : '사진'}
    const links = Object.keys(linksJson)
    const linkValues = Object.values(linksJson)
    console.log(linkValues)
    console.log(links)


    const navLinks = links
      .map(
          (link,i) =>
          `<div class="appbox" ondrop="drop(event)" ondragover="allowDrop(event)">
            <div class="app" draggable="true" ondragstart="drag(event)">
              <a class="nav-link" href="/#/${link}">${linkValues[i]}</a>
            </div>
          </div>`
      )
      .join('\n');
      var emptySpace = ``;
      for (var i = links.length; i <= 20; i++) {
        emptySpace = emptySpace + `
          <div class="appbox" ondrop="drop(event)" ondragover="allowDrop(event)">
          </div>
        `
      }
    return /*html*/ `
         ${navLinks}
         ${emptySpace}
        `;

  },
  /**
   * All the code related to DOM interactions and controls go in here.
   * This is a separate call as these can be registered only after the DOM has been painted.
   */
  after_render: async () => {
    }
  };
export default Home;
