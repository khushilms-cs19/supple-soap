import React from 'react'
import FilterVintageRoundedIcon from '@mui/icons-material/FilterVintageRounded';
const About = React.forwardRef((props, ref) => {
    return (
        <div className='about-page-container' ref={ref}>
            <div className='about-page-card'>
                <div className='about-page-card-title'>
                    <FilterVintageRoundedIcon fontSize='small' color="grey" />
                    <h3>About Supple</h3>
                    <FilterVintageRoundedIcon fontSize='small' color="grey" />
                </div>
                <p className='about-page-card-content'>With years of expertise and experience, Supple takes great pride in producing premium quality hand made soaps</p>
                <p className='about-page-card-content'>We craft each and every bar with the finest quality of ingredients, which means every time your skin is rejuvenated with a blast of richness and goodness</p>
                <p className='about-page-card-content'>The soaps are nature friendly and are free of harsh chemicals like Hydroxides, SLS,SLE and Parabene</p>
                <p className='about-page-card-content'>Every time you buy a Soap, a part of the proceedings is used in the upliftment of households run by single women</p>
            </div>
        </div>
    )
})

export default About;