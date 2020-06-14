import { Component, ComponentInterface, Host, h, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'search-input',
  styleUrl: 'search-input.css',
  shadow: true,
})
export class SearchInput implements ComponentInterface {
  @Event() searchClicked: EventEmitter<string>;
  @Event() searchInputChanged: EventEmitter<string>;
  searchValue: string;

  searchValueChange(target: HTMLInputElement) {
    this.searchValue = target.value;
  }

  render() {
    return (
      <Host>
        <form onSubmit={(e) => { e.preventDefault(); this.searchClicked.emit(this.searchValue)}}>
          <input type="text" placeholder="Search for User" onInput={(ev)=>{ this.searchValueChange((ev.target as HTMLInputElement)); }}></input>
          <button type="submit">Search</button>   
        </form>
      </Host>
    );
  }

}
