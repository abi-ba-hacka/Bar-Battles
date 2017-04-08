import { WebRTCPage } from './app.po';

describe('web-rtc App', () => {
  let page: WebRTCPage;

  beforeEach(() => {
    page = new WebRTCPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
