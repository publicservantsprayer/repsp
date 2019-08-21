import React from 'react'

const twitterURL = () => `https://twitter.com/@Praying4_IN`

const ColumnLeft = () => (
  <>
    <ul className="nav nav-list">

      <li className="active"><a href="/states/in"><i className="icon-home icon-white"></i> State Home</a></li>

      <li className=""><a href="/states/in/leaders"><i className="icon-user"></i> State Leaders</a></li>

      <li className="nav-header">Prayer List</li>

      <li className=""><a href="/states/in/subscriptions/daily"><i className="icon-th"></i> Subscribe Daily</a></li>

      <li className=""><a href="/states/in/subscriptions/weekly"><i className="icon-align-justify"></i> Subscribe Weekly</a></li>
    </ul>

    <div style={{ margin: "3em 0" }}>
      <img src="/images/capitols/in-400.png" alt="State Capital" />
    </div>

    <div style={{ margin: "10px" }}>
      <a href={twitterURL()} className="twitter-follow-button" data-show-count="false">Follow @mattrbarnes</a>
      <script>{'!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js = d.createElement(s); js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");'}</script>

    </div>


    <div className="fb-like-box" data-href="<%= @state.facebook_url %>" data-width="225" data-show-faces="false" data-stream="false" data-header="false"></div>

    <br />
  </>
)

export default ColumnLeft
