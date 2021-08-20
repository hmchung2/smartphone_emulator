const Footer = {
  /**
   * Render the component content.
   */
  render: async () => {
    return /*html*/ `
      <p class="text-right mt-4"><em>스마트폰 에물레이션 프로젝트 <br> 정해명</em>
      </p>
      <p class="text-right"> <em id="end"><a href="https://github.com/hmchung2">깃허브 주소</a></em> </p>
    `;
  },
  /**
   * All the code related to DOM interactions and controls go in here.
   * This is a separate call as these can be registered only after the DOM has been painted.
   */
  after_render: async () => {
  }
};

export default Footer;
