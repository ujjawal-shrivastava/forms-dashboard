import React, { Component } from 'react';
export default class PageWrap extends Component{
    render(){
    return(
        <section className="section">
        <div className="columns is-centered">
          <div className="column is-half">
            {this.props.children}
          </div>
        </div>
      </section>
    )
    }
}