import { newSpecPage } from '@stencil/core/testing';
import { CustomInput } from '../custom-input';

describe('custom-input', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CustomInput],
      html: `<custom-input></custom-input>`,
    });
    expect(page.root).toEqualHtml(`
      <custom-input>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </custom-input>
    `);
  });
});
