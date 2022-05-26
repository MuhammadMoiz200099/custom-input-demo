import { newE2EPage } from '@stencil/core/testing';

describe('custom-input', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<custom-input></custom-input>');

    const element = await page.find('custom-input');
    expect(element).toHaveClass('hydrated');
  });
});
