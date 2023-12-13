import React from 'react'
import styled from 'styled-components';

function HeroSection({ setSearchTerm }) {
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <HeroSection1>
      <div className='heading-image flex gap-24 mt-6'>
        <div>
          <span className='subQuoto text-2xl font-bold'>Free Quote -</span>
          <h1 className='text-5xl font-bold mt-2'>Unlock Your Dream Career:</h1>
          <p className='paragraph text-xl'>
            Get expert advice tailored to your specific skills
            and career goals.Find the perfect job fit that
            leverages your talents and sets you up for long-term success.
          </p>
        </div>
        <div>
          <img src='/images/hero-img.png' alt='hero image' />
        </div>
      </div>
      <div className='flex justify-center'>
        <div>
          <input
            className="searchbar border px-12 py-4  outline-none"
            type="text"
            placeholder="Search Title, Skill or Company..."
            onChange={handleSearch}
          />
        </div>
      </div>
    </HeroSection1>
  )
}

export default HeroSection;
const HeroSection1 = styled.div`
.subQuoto{
  color: var(--primaryColor);
}
.heading-image{
  @media (max-width: 426px) {
      flex-wrap: wrap;
    }
}
.paragraph {
    opacity: 0.5;
    @media (max-width:426px){
      font-size: 18px;
      margin-top: 15px;
    }
  }
 .searchbar{
  border-color: var(--primaryColor);
  border-width: 2px;
  border-radius: 5px;
  @media screen and (max-width:426px) {
    margin-top: 20px;

  }
 }

`