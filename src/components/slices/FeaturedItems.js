import React from 'react'
import { Link } from 'gatsby'
import { RichText } from 'prismic-reactjs'
import { linkResolver } from '../../utils/linkResolver'

function renderProducts(slice) {
  return slice.fields.slice(0, 2).map((item, index) =>
    <Link to={linkResolver(item.link_to_product._meta)}>
      <div key={index} className="card">
        <div className="card-image">
          <img src={item.link_to_product.product_image.url} alt={item.link_to_product.product_image.alt}/>
        </div>
        <div className="card-separator"><hr/></div>
        <div className="card-content">
          <span className="card-title">{RichText.asText(item.link_to_product.product_name)}</span>
          <p>{RichText.asText(item.link_to_product.sub_title)}</p>
        </div>
      </div>
    </Link>
  )
}


export default ({ slice }) =>
  <section>
    <div className="card-list">
      {renderProducts(slice)}
    </div>
  </section>
