import React from 'react'
import { Link } from 'gatsby'
import { RichText } from 'prismic-reactjs'
import { linkResolver } from '../../utils/linkResolver'

export default ({item}) =>
  <Link to={linkResolver(item.node._meta)}>
    <div key={item.node._meta.uid} className="card">
      <div className="card-image">
        <img src={item.node.product_image.url} alt={item.node.product_image.alt}/>
      </div>
      <div className="card-separator"><hr/></div>
      <div className="card-content">
        <span className="card-title">{RichText.asText(item.node.product_name)}</span>
        <p>{RichText.asText(item.node.sub_title)}</p>
      </div>
    </div>
  </Link>
