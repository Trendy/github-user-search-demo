import { Component, ComponentInterface, Host, h } from '@stencil/core';

@Component({
  tag: 'loading-spinner',
  styleUrl: 'loading-spinner.css',
  shadow: true,
})
export class LoadingSpinner implements ComponentInterface {

  render() {
    return (
      <Host>
        <div class="lds-dual-ring"></div>
      </Host>
    );
  }

}
