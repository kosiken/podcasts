import React from 'react';

import Typography from '@material-ui/core/Typography';
import classnames from 'classnames';
import styles from './Category.module.css';


type CategoryProps = {
   selected: boolean;
   category: string;
   key?: string | number;
     onClick?: () => void;
}




const Category: React.FunctionComponent<CategoryProps> = ({
   selected, category, ...props
}) => {

   const classes = classnames(styles.category, {
      [styles.active]: selected

   });

   return (
      <Typography className={classes} component="span" {...props}>
         {category}
      </Typography>
   )

};


export default Category;

