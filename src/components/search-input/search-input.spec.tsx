import { newSpecPage } from '@stencil/core/testing';
import { SearchInput } from './search-input';

describe('search-input', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SearchInput],
      html: `<search-input></search-input>`,
    });
    expect(page.root).toEqualHtml(`
      <search-input>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </search-input>
    `);
  });
});
