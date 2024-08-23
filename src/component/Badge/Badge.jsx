import './Badge.css';


const Badge = ({children , as: Component = 'span', }) => {
  return (
    <Component className='badge-style'>{children}</Component>
  )
}

export default Badge