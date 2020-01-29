import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { Helmet } from 'react-helmet'

import '../../stylesheets/main.scss'

class Layout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      menuOpen: false
    }
    this.handleMenuOpen = this.handleMenuOpen.bind(this)
    this.handleClickMenuItem = this.handleClickMenuItem.bind(this)
  }

  handleMenuOpen() {
    this.setState({ menuOpen: !this.state.menuOpen })
  }

  handleClickMenuItem() {
    this.setState({ menuOpen: false })
  }

  render() {
    const { data } = this.props;
    const layoutData = data.prismic.allLayouts.edges[0].node;

    // Call to render the classic edit button
    if (process.browser) window.prismic.setupEditButton();

    return(
      <React.Fragment>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{layoutData.site_name}</title>
          <link href="https://use.fontawesome.com/releases/v5.1.0/css/all.css" rel="stylesheet" integrity="sha384-lKuwvrZot6UHsBSfcMvOkWwlCMgc0TaWr+30HWe3a4ltaBwTZhyTEggF5tJv8tbt" crossorigin="anonymous" />
        </Helmet>
        <main>
          {this.props.children}
        </main>
      </React.Fragment>
    );
  }
}

export default props => (
  <StaticQuery
    query={graphql`
      query{
        prismic{
          allLayouts(uid:null){
            edges{
              node{
                site_name
                header_nav_items{
                  text
                  link{
                    ... on PRISMIC_Products{
                      _meta{
                        uid
                        id
                        type
                      }
                    }
                    ... on PRISMIC_Blog_home{
                      _meta{
                        uid
                        id
                        type
                      }
                    }
                  }
                }
                footer_nav_items{
                  text
                  link{
                    ... on PRISMIC_Products{
                      _meta{
                        uid
                        id
                        type
                      }
                    }
                    ... on PRISMIC_Blog_home{
                      _meta{
                        uid
                        id
                        type
                      }
                    }
                  }
                }
                footer_social_items{
                  icon
                  link{
                    ... on PRISMIC__ExternalLink{
                      url
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={data => <Layout data={data} {...props}/>}
  />
)