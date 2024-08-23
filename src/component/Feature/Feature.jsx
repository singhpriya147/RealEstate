

import './Feature.css';

const Badge = ({ children, as: Component = 'span' }) => {
  return (
    <Component className='feature-style'>
     
      {children}
    </Component>
  );
};

export default Badge;

