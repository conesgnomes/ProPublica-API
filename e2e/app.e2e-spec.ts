import { EnlightenedCitizenryPage } from './app.po';

describe('enlightened-citizenry App', () => {
  let page: EnlightenedCitizenryPage;

  beforeEach(() => {
    page = new EnlightenedCitizenryPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
