import { newSpecPage } from '@stencil/core/testing';
import { SearchPage } from './search-page';

describe('search-page', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SearchPage],
      html: `<search-page></search-page>`,
    });
    expect(page.root).toEqualHtml(`
      <search-page>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </search-page>
    `);
  });
});
