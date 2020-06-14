import { Component, ComponentInterface, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'search-result',
  styleUrl: 'search-result.css',
  shadow: true,
})
export class SearchResult implements ComponentInterface {
  @Prop() userInfo;

  render() {
    return (
      <Host>
        <a href={this.userInfo.html_url}>
          <div class="search-result-container">
            <img src={this.userInfo.avatar_url}></img>
            <div class="user-info-container">
              <span class="user-name">{this.userInfo.name ? this.userInfo.name : this.userInfo.login}</span>
              <span class="user-login">{this.userInfo.login}</span>
              <div class="user-login">{this.userInfo.location}</div>
              <div class="user-bio">{this.userInfo.bio}</div>
            </div>
            <span class="user-stats">
                <div class="user-followers"><strong>Followers:</strong> {this.userInfo.followers}</div>
                <div class="user-repos"><strong>Repositories: </strong> {this.userInfo.public_repos}</div>
            </span>
          </div>
        </a>
      </Host>
    );
  }

}
