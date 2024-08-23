import './Hero.css'
import heroImage from '../../../assets/3d-model-house-building.png';
const Hero = () => {
  return (
    <section className='hero-section'>
      <div className='hero-text' >
        <span>Welcome to SUCASA</span>
        <h1>Manage your Property</h1>
        <p>
          You will have everything nearby supermarket,buses,stations,cinemas,
          theatres,the carmen neighbourhood, etc
        </p>
      </div>
      <div className='hero-image'>
       <img src={heroImage} height={500} width={500} alt="" />
      </div>
    </section>
  );
}

export default Hero