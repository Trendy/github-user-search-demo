import { Component, ComponentInterface, Host, h, Listen, State } from '@stencil/core';
import { GithubService } from '../../services/github.service';

@Component({
  tag: 'search-page',
  styleUrl: 'search-page.css',
  shadow: true,
})
export class SearchPage implements ComponentInterface {
  @State() loading: boolean = false;
  @State() userResults = [];
  @State() totalResults = 0;
  @State() noResults;

  page: number = 1;
  pageSize: number = 25;
  totalPages: number = 0;
  searchTerm: string = '';

  @Listen('searchClicked')
  onSearchClicked(event : CustomEvent){
    const searchTerm = event.detail;
    if(!searchTerm) {
      this.searchTerm = '';
      this.noResults = true;
      throw Error('Search Term Required'); // TODO: Error state?
    }
    this.noResults = false;
    this.loading = true;
    this.searchTerm = searchTerm;
    this.searchForUsers(searchTerm);
  }
  
  async searchForUsers(searchTerm: string) {
    try{
      const res = await GithubService.searchForUser(searchTerm, this.page, this.pageSize);
      this.userResults = res.items;
      this.totalResults = res.total_count;
      this.totalPages = Math.ceil(this.totalResults/this.pageSize);
    } catch(e) {
      this.noResults = true;
    } finally {
      this.loading = false;
      window.scrollTo(0,0);
    }

  }

  async getNextPage(){
    this.page += 1;
    this.loading = true;
    await this.searchForUsers(this.searchTerm);
  }

  async getPreviousPage(){
    this.page -= 1;
    this.loading = true;
    await this.searchForUsers(this.searchTerm);
  }

  render() {
    return (
      <Host>
        <search-input></search-input>
        {this.loading ? <loading-spinner></loading-spinner> : ''}
        
        {this.totalResults && !this.loading && !this.noResults ? 
          <div>
            <div>Displaying {this.page * this.pageSize} of {this.totalResults}</div> 
            <div>
              {this.userResults.map((user)=>{
                return <search-result userInfo={user}></search-result>
              })}
            </div>
            <div class="navigation">
              <span><button disabled={this.page === 1} onClick={()=>{this.getPreviousPage()}}>Previous</button></span> 
              
              <span><button disabled={this.page === this.totalPages}onClick={()=>{this.getNextPage()}}>Next</button></span>
            </div>
          </div>
        : ''}

        {this.noResults !== 'undefined' && this.noResults ? 'No Results' : ''}
      </Host>
    );
  }

}