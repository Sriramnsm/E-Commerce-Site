import { Fragment } from 'react';
import './category-item.styles.scss';

const CategoryItem = ({category}) => {
  
  const {imageUrl,title} = category;
  
  return (
    <Fragment>
      <div className='category-container'>
          <div 
            className='background-image' 
            style={{
            backgroundImage : `url(${imageUrl})`
            }}
          />
          <div className="category-body-container">
            <h2>{title}</h2>
            <p>Shop now</p>
          </div>
      </div>
    </Fragment>
    );
}

export default CategoryItem;