import React from 'react'
import { Link, graphql } from 'gatsby';
import { linkResolver } from '../utils/linkResolver'
import Layout from '../components/layouts'
import { FeaturedItems } from '../components/slices'

export const query = graphql`
{
  prismic{
    allHomepages(uid:null){
      edges{
        node{
          _meta{
            uid
            id
            type
          }
          title
          banner_image
          banner_text
          body {
            __typename
            ... on PRISMIC_HomepageBodyFeatured_items {
              type
              primary {
                section_title
                button_label
                button_link{
                  __typename
                  ... on PRISMIC_Products {
                    title
                    _meta {
                      uid
                      id
                      lang
                      type
                      tags
                    }
                  }
                }
              }
              fields {
                link_to_product {
                  __typename
                  _linkType
                  ... on PRISMIC_Product {
                    product_name
                    product_image
                    sub_title
                    _meta{
                      uid
                      id
                      lang
                      type
                      tags
                    }
                  }
                }
              }
            }
            ... on PRISMIC_HomepageBodyCta_banner {
              type
              primary {
                image_banner
                banner_title
                banner_text
                cta_label
                cta_link {
                  __typename
                  ... on PRISMIC__ExternalLink {
                    url
                  }
                }
              }
            }
            ... on PRISMIC_HomepageBodyBig_bullet_item {
              type
              primary {
                title_section
              }
              fields {
                description_paragraph
              }
            }
            ... on PRISMIC_HomepageBodySeparator {
              type
            }
            ... on PRISMIC_HomepageBodyText_block {
              type
              primary {
                title1
                paragraph
              }
            }
          }
        }
      }
    }
  }
}
`
const RenderSlices = ({ slices }) => {
  return slices.map((slice, index) => {
    const res = (() => {
      switch(slice.type) {
        case 'featured_items': return (
          <FeaturedItems slice={slice} />
        )
        default: return
      }
    })();
    return res;
  })
}

const RenderBody = ({ home }) => (
  <React.Fragment>
    <section className="homepage-section">
      <div className="homepage-section-head">
        <h1>Benefits</h1>
      </div>

      <div className="card-list">
        <div className="card card-special" style={{backgroundColor: '#49c793', color: 'white'}}>
          <span className="card-icon icon-health"></span>
          <div className="card-title">
            Health <br/> insurance
          </div>
        </div>
      </div>
    </section>
    <section className="homepage-section">
      <div className="homepage-section-head">
        <h2>Discount & coupons</h2>
        <Link key='productsView' className="mg-left" to={linkResolver({id: "XiDnpRAAACQAcwA5",type: "products"})}>View All</Link>
      </div>

      <RenderSlices slices={home.body} />
    </section>
    <section className="homepage-section">
      <div className="homepage-section-head">
        <h2>Professional develpment</h2>
        <Link key='productsView' className="mg-left" to={linkResolver({id: "XiDnpRAAACQAcwA5",type: "products"})}>View All</Link>
      </div>

      <p className="homepage-section-description">Training courses</p>
      <RenderSlices slices={home.body} />
    </section>
  </React.Fragment>
);

export default ({ data }) => {
  const doc = data.prismic.allHomepages.edges.slice(0,1).pop();
  if(!doc) return null;
  
  return(
    <Layout>
      <RenderBody home={doc.node} />
    </Layout>
  )
}

