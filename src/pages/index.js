import React from 'react'
import { graphql } from 'gatsby';

import Layout from '../components/layouts'

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
        <a href="" className="mg-left">View all</a>
      </div>

      <div className="card-list">
        <div class="card">
          <div class="card-image">
            <img src="https://picsum.photos/id/1001/200/300" alt="example"/>
          </div>

          <div class="card-content">
            <span class="card-title">IronHack Intership</span>
            <p>To become a developer</p>
          </div>
        </div>
        <div class="card">
          <div class="card-image">
            <img src="https://picsum.photos/id/1001/200/300" alt="example"/>
          </div>
          <div class="card-content">
            <span class="card-title">IronHack Intership</span>
            <p>To become a developer</p>
          </div>
        </div>
      </div>
    </section>
    <section className="homepage-section">
      <div className="homepage-section-head">
        <h2>Professional develpment</h2>
        <a href="" className="mg-left">View all</a>
      </div>

      <p className="homepage-section-description">Training courses</p>

      <div className="card-list">
        <div class="card">
          <div class="card-image">
            <img src="https://picsum.photos/id/1001/200/300" alt="example"/>
          </div>
          <div class="card-content">
            <span class="card-title">IronHack Intership</span>
            <p>To become a developer</p>
          </div>
        </div>
        <div class="card">
          <div class="card-image">
            <img src="https://picsum.photos/id/1001/200/300" alt="example"/>
          </div>
          <div class="card-content">
            <span class="card-title">IronHack Intership</span>
            <p>To become a developer</p>
          </div>
        </div>
      </div>
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

